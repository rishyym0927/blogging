import React from 'react'
import { motion } from 'framer-motion'

const BlogSection = ({ props }) => {
  const { blog } = props

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='min-h-[100vh] h-auto px-72 py-16 w-full bg-black text-gray-300 font-playfair'
    >
      <div className='w-full h-full'>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className='text-5xl capitalize mb-6 text-white font-bold'
        >
          {blog.title}
        </motion.h1>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className='flex items-center mb-8'
        >
          <img src={blog.createdBy.profileImage} alt="" className='w-12 h-12 rounded-full mr-4'/>
          <div>
            <p className='text-gray-400'>From <span className='text-white capitalize font-semibold'>{blog.createdBy.fullname}</span></p>
            <p className='text-sm text-gray-500'>{new Date(blog.createdAt).toLocaleDateString()}</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <img src={blog.coverImageURL} alt="" className='object-cover object-center w-full max-h-96 rounded-lg'/>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className='text-lg leading-relaxed'
          dangerouslySetInnerHTML={{ __html: blog.body.replace(/\n/g, '<br />') }}
        />
      </div>
    </motion.div>
  )
}

export default BlogSection