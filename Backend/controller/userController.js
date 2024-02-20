const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        msg: "Fill All Details",
      });
    }

    const present = await prisma.user.findUnique({ where: { email } });
    if (present) {
      return res.status(400).json({
        success: false,
        msg: "User Already Exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error in registerController:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to register user" });
  }
};

const getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).send({
    success: true,
    userCount: users.length,
    users,
  });
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        msg: "Fill all Credientials",
      });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).send({
        msg: "Invalid Email",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        msg: "Invalid Password",
      });
    }
    return res.status(200).json({
      success:true,
      user
    });
  } catch (error) {
    res.status(500).send({
      msg: "error in login",
    });
  }
};

module.exports = {
  getAllUsers,
  registerController,
  loginController,
};