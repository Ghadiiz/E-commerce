
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import Stripe from 'stripe';

// global variables
const currency = 'usd'
const deliveryCharge = 10

//GETWAY INITIALIZE
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Recomputes order items and amount from the database so client-supplied
// prices/amounts can never be trusted.
const buildOrderItems = async (items) => {

    if (!Array.isArray(items) || items.length === 0) {
        throw new Error("Order must contain at least one item")
    }

    const orderItems = []
    let amount = 0

    for (const item of items) {

        const { _id, size, quantity } = item || {}

        if (!Number.isInteger(quantity) || quantity < 1) {
            throw new Error("Invalid item quantity")
        }

        const product = await productModel.findById(_id)

        if (!product) {
            throw new Error("Product not found")
        }

        if (!product.sizes.includes(size)) {
            throw new Error("Invalid product size")
        }

        orderItems.push({
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            size,
            quantity,
        })

        amount += product.price * quantity
    }

    amount += deliveryCharge

    return { orderItems, amount }
}

// Placing Orders using Cash on delivery Method
const placeOrder = async (req, res) => {

    try {

        const { userId, items, address } = req.body;

        const { orderItems, amount } = await buildOrderItems(items)

        const orderData = {
            userId,
            items: orderItems,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: 'Order Placed Successfully' })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}



// Placing Orders using Stripe Method
const placeOrderStripe = async (req, res) => {
    try {
        
        const { userId, items, address } = req.body
        const { origin } = req.headers

        const { orderItems, amount } = await buildOrderItems(items)

        const orderData = {
            userId,
            items: orderItems,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now(),
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = orderItems.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })

        await orderModel.findByIdAndUpdate(newOrder._id, { sessionId: session.id })

        res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Verify Stripe Payment
const verifyStripe = async (req, res) => {

    const { orderId, success, userId } = req.body

    try {
        const order = await orderModel.findById(orderId)

        if (!order) {
            return res.json({ success: false, message: "Order not found" })
        }

        if (String(order.userId) !== String(userId)) {
            return res.json({ success: false, message: "Not authorized" })
        }

        if (success === "true") {
            if (!order.sessionId) {
                return res.json({ success: false, message: "No payment session" })
            }

            const session = await stripe.checkout.sessions.retrieve(order.sessionId)

            if (session.payment_status !== 'paid') {
                return res.json({ success: false, message: "Payment not completed" })
            }

            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            res.json({ success: true});

        } else {
            if (order.payment === false) {
                await orderModel.findByIdAndDelete(orderId);
            }
            res.json({ success: false});
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

// All orders data for admin panel
const allOrders = async (req, res) => {

    try {
        
        const orders = await orderModel.find({})
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}


// User Order Data for frontend
const userOrders = async (req, res) => {
    try {
        
        const { userId } = req.body

        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Update Order Status from Admin panel
const updateStatus = async (req, res) => {
    try {
        
        const { orderId, status } = req.body
        
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: 'Order Status Updated' })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export {verifyStripe, placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus }