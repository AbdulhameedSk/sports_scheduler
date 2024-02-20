const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { request } = require("express");
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

const registertogameController = async (req, res) => {
  try {
    const { userId, gameId } = req.body;
    if (!userId || !gameId) {
      return res.status(400).json({
        success: false,
        msg: "Please provide both userId and gameId",
      });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "User not found",
      });
    }

    const game = await prisma.game.findUnique({ where: { id: gameId } });
    if (!game) {
      return res.status(400).json({
        success: false,
        msg: "Game not found",
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { gameId },
    });

    return res.status(200).json({
      success: true,
      msg: "User registered to game successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in registertogameController:", error);
    return res.status(500).json({
      success: false,
      msg: "Failed to register user to game",
      error: error.message,
    });
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
      success: true,
      user,
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
  registertogameController,
};
