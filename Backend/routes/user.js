const { Router } = require('express');
const { Register, Login } = require('../controller/user');
const authenticate = require('../middleware/authenticate');
const router = Router();

router.post('/v1/register', Register);
router.post('/v1/login', Login);

router.get('/v1/profile', authenticate, (req, res) => {
    res.json({ message: `Welcome ${req.user.name}` }); 
});

module.exports = router;
