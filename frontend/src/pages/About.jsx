import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      
      <div className='text-3xl text-center pt-8 border-t'> 
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Welcome to Noiré, where passion meets purpose. We’re more than just a business—we’re a team driven by innovation, integrity, and the goal of making your life easier through exceptional products and services.</p>
          <p>We take pride in offering a service that’s built on quality, transparency, and trust. Every interaction matters to us, and we’re dedicated to ensuring you feel supported, valued, and completely satisfied every step of the way.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>At Noiré, Our mission is to make everyday experiences better through reliable service, thoughtful innovation, and genuine care. We strive to create lasting value for our customers by staying true to our core values: quality, honesty, and dedication to excellence.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row  text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Trust is at our core. We’re committed to transparency, quality, and reliability. Whether it’s product integrity or data security, we go the extra mile to ensure you feel confident every time you interact with us.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>We make things easy. From seamless navigation to fast, secure checkouts, every detail of our platform is designed with your convenience in mind. No hassle, no confusion—just a smooth and simple experience from start to finish.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Real help, when you need it. Our friendly support team is always here to assist—whether you have a quick question or need detailed guidance. We listen, we care, and we’re dedicated to making sure your experience exceeds expectations.</p>
        </div>
      </div>

      <NewsletterBox />

    </div>
  )
}

export default About
