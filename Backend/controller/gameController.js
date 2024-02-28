const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const getgames = async (req, res) => {
  try {
    const games = await prisma.games.findMany({});
    if (!games || games.length === 0) {
      return res.status(200).send({
        success: true,
        msg: "No games Till Now",
      });
    }
    return res.status(200).send({
      success: true,
      msg: "GOT",
      sportCount: games.length,
      games,
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      msg: "ERROR WHILE GETTING games",
      error: error.message,
    });
  }
};
module.exports = {
  getgames,
};
