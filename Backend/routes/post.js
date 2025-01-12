const express=require("express");

const router=express.Router();
const {getUserPost}=require('../controller/post')

router.get('/v1/user_posts', (req, res)=>{
    const data={...req.query, ...req.params, ...req.body};
    data.req=req.data;
    data.params=req.params;
    data.body=req.body;
    getUserPost(data,(err,response)=>{
        if(err){
            return res.status(err.status).send(err)
        }        
        return res.status(response.status).send(response);
    });

})

export default router;


