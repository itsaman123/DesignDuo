const { Router } = require('express');
const { Register, Login, Logout } = require('../controller/user');
const authenticate = require('../middleware/authenticate');
const router = Router();

router.post('/v1/register', (req,res)=>{
    const data={...req.query, ...req.params, ...req.body};
    data.req=req.data;
    data.params=req.params;
    data.body=req.body;
    Register(data,(err,response)=>{
        if(err){
            return res.status(err.status).send(err);
        }
        return res.status(response.status).send(response)
    })
});


router.post('/v1/login', (req,res)=>{
    const data={...req.query, ...req.params, ...req.body};
    data.req=req.data;
    data.params=req.params;
    data.body=req.body;
    Login(data,(err, response)=>{
        if(err){
            return res.status(err.status).send(err)
        }
        return res.status(response.status).send(response);
    })
});

router.post('/v1/logout', (req,res)=>{
    const data={...req.query, ...req.params, ...req.body};
    data.req=req.data;
    data.params=req.params;
    data.body=req.body;
    Logout(data,(err, response)=>{
        if(err){
            return res.status(err.status).send(err)
        }
        return res.status(response.status).send(response);
    })
});

router.get('/v1/profile', authenticate, (req, res) => {
    res.json({ message: `Welcome ${req.user.name}` }); 
});

module.exports = router;
