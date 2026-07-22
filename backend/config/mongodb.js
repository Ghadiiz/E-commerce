import mongoose from 'mongoose';

let cached = global.mongooseConn;

if (!cached) {
    cached = global.mongooseConn = { conn: null, promise: null };
}

const connectDB = async () => {

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        if (mongoose.connection.listenerCount('connected') === 0) {
            mongoose.connection.on('connected', () => {
                console.log("DB Connected");
            })
        }

        cached.promise = mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`, {
            bufferCommands: false,
        })
    }

    try {
        cached.conn = await cached.promise;
    } catch (err) {
        cached.promise = null;
        throw err;
    }

    return cached.conn;

}

export default connectDB;
