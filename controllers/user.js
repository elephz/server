const prisma = require("../prisma/prisma");
const hashPassword = require('../service/hashPassword'); 

exports.create = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (user) {
      return res.status(400).json({ message: "Email Already Exists" });
    }

    const hashedPassword = await hashPassword(password);
    
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword, // Use the hashed password
        role: 'user', // Default role
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json("Error creating user");
  }
}

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role } = req.body;

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name,
        role,
      },
    });

    res.status(200).json(user);
    
  } catch (error) {
    res.status(500).json('Error updating user');
  }
}

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(+id)) {
      res.status(400).json('invalid user id');
    }

    await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.json('User deleted');
  } catch (error) {
    res.status(500).json('Error deleting user');
  }
} 

exports.list = async (req, res) => {
  try {
    const { page } = req.query
     if (isNaN(+page)) {
      res.status(400).json('invalid user page');
    }
    const [users, meta] = await prisma.user.paginate({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc", // 👈 Sort newest first
      }
    })
    .withPages({
      limit: 10,
      page : +page
    });
    return res.status(200).json({
      data: users,
      meta
    });
  } catch (error) {
    console.log({error})
    res.status(500).send('Error retrieving user list');
  }
}

exports.read = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(+id)) {
      res.status(400).json('invalid user id');
    }

    const user = await prisma.user.findFirst({ 
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      where: { id : +id },
    });

    res.json(user);
  } catch (error) {
    console.log(error)
    res.status(500).json('Fetch user error');
  }

}