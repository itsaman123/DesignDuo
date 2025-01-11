const Post=require("../model/postSchema");
const responseStruct=require("../helper/responseStructure");
export const getUserPost= async (data, err)=>{
    try{

    }
    catch(err){
        return cb(
            responseStruct
                .merge({
                    action:"get_user_posts",
                    status:400,
                    success:false,
                    message:err.message
                })
                .toJS(),
        )
    }

}