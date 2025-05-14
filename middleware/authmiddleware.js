const jwt = require('jsonwebtoken');

const verify = (req,res,next) => 
{
    const token = req.headers['authorization'];

    if(!token)
        return res.status(401).json({message: 'Access Denied: No token provided'});
    try
    {
        const decode= jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = decode;
        next();
    }catch(err)
    {
        res.status(403).json({message: 'Invalid or expired token'});
    }
};

module.exports= verify;