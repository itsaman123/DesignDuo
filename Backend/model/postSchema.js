const mongoose=require("mongoose");

const postSchema=new mongoose.Schema({
    user_id:{
        type:String,
        required:true,
    },
    post_id:{
        type:String,
        required:true,
    },
    is_deleted:{
        type:Boolean,
        default:false,
    },
    content:{
        type:String,
        required:true,
    },
    postImages:{
        type:Array[String]
    },
    category:{
        type:Array[String],
        required:true
    }

},{
    timestamps:true
});


const Post=mongoose.model("Post", postSchema);

module.exports=Post;