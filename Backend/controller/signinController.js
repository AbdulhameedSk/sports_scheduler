const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const registerController = async (req, res) => {
  const { username, password, email, role } = req.body;

  if (!username || !password || !email || !role) {
    return res.status(400).json({
      success: false,
      msg: "Please provide username, password, email, and role",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.users.create({
      data: {
        username,
        password: hashedPassword,
        email,
        role,
      },
    });

    return res.status(201).json({
      success: true,
      msg: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error in registerController:", error);
    return res.status(500).json({
      success: false,
      msg: "Failed to register user",
      error: error.message,
    });
  }
};

const loginController = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      msg: "Please provide username and password",
    });
  }

  try {
    const user = await prisma.users.findUnique({ where: { username } });
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        msg: "Invalid password",
      });
    }

    const token = jwt.sign(
      { userId: user.user_id, role: user.role },
      "Vammo",
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      success: true,
      msg: "User logged in successfully",
      token,
    });
  } catch (error) {
    console.error("Error in loginController:", error);
    return res.status(500).json({
      success: false,
      msg: "Failed to log in",
      error: error.message,
    });
  }
};

module.exports = {
  registerController,
  loginController,
};
