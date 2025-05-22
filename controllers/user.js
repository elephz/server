const prisma = require("../prisma/prisma");
const hashPassword = require('../service/hashPassword'); 

exports.create = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await hashPassword(password);
    
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword, // Use the hashed password
        role: 'user', // Default role
      },
    });

    res.status(201).json(user);
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
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send('Error retrieving user list');
  }
}