const Post=require("../model/postSchema");
const responseStruct=require("../helper/responseStructure");
export const getUserPost= async (data, cb)=>{
    try{
        if(!data.type){
            throw new Error("Params Missing");
        }
        const query={
            user_id:data.req.auth.user_id,
        }
        const res=await Post.find(query);
        return cb(
            null,
            responseStruct
            .merge({
                action:'get_user_posts',
                status:200,
                success:true,
                message:"success",
                data:res
            })
        )

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