const prisma = require("../prisma/prisma");
const comparePassword = require("../service/comparePassword");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
   
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return res.status(400).send("User not found!!!");
    }
    
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(400).send("Password Invalid!!!");
    }
    // 2. Payload
    var payload = {
      id: user.id,
      name: user.name,
      role: user.role,
    };

    // 3. Generate
    const buffer = "defaultsecret!!@#";
    jwt.sign(payload, buffer, { expiresIn: "1d" }, (err, token) => {
      if (err) throw err;
      res.json({ token, payload });
    });
   
  } catch (err) {
    //code
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.me = async (req, res) => {
  try {
    const { id } = req.user;
    
    const user = await prisma.user.findFirst({ 
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      where: { id },
    });

    if (!user) {
      return res.status(400).send("User not found!!!");
    }

    res.json(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
}

