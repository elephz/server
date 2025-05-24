const jwt = require('jsonwebtoken');
const prisma = require("../prisma/prisma");

exports.auth = async (req, res, next) => {
  try {
    //code
    const token = req.headers["authorization"]?.split(" ")[1] || null;

    if (!token) {
      return res.status(401).send('No token')
    }
    
    const buffer = "defaultsecret!!@#";

    jwt.verify(token, buffer, (err, decoded) => {
      if (err) {
        return res.status(401).send('Token Invalid')
      }
      req.user = decoded;

        next();
    });
  } catch (err) {
    // err
    console.log(err)
    res.status(500).send('Token Invalid')
  }
}

exports.isAdmin = async(req,res,next)=>{
    try{
      const { id } = req.user
      const user = await prisma.user.findFirst({
        where: {
          id: id,
          role: 'admin',
        },
      });
      console.log({user, id})
      if (!user) {
        return res.status(403).send('Admin access Denied!!!');
      }
       
      next();
    }catch(err){
      console.log(err)
      res.status(403).send('Admin access Denied!!!')
    }
}