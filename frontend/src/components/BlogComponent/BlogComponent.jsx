import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import BlogSection from './BlogSection'

const BlogComponent = () => {
    const { id } = useParams()
    const [blogData, setBlogData] = useState(null)

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/blog/${id}`, {
                    withCredentials: true
                })
                console.log('Response data:', response.data)
                setBlogData(response.data)
            } catch (error) {
                console.error('Error fetching blog data:', error)
            }
        }
        fetchBlogData()
    }, [id])

    useEffect(() => {
        console.log('Updated blogData:', blogData)
    }, [blogData])

    if (!blogData) return (
        <div className="flex justify-center items-center h-screen bg-gray-900 text-white text-2xl">
            Loading...
        </div>
    )

    return (
      <>
      <BlogSection props = {blogData} />
      </>
    )
}

export default BlogComponent