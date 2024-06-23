const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    coverImageURL:{
        type:String,
        default: "/images/images.png",
        required:false
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
}, {timestamps:true})

const Blog = mongoose.model("Blog", blogSchema)

module.exports = Blog;
