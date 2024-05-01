const mongoose = require('mongoose');
//postSchema fiha les attributs
const postSchema = new mongoose.Schema({
    body :{type: String,unique:true},
    postDate : Date
})
const Post = mongoose.model('Post',postSchema);
module.exports=Post;