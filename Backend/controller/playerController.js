const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const registerToGameController = async (req, res) => {
  try {
    const { userId, gameId, teamName } = req.body;
    if (!userId || !gameId) {
      return res.status(400).json({
        success: false,
        msg: "Please provide both userId and gameId",
      });
    }

    const user = await prisma.users.findUnique({ where: { user_id: userId } });
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "User not found",
      });
    }

    const game = await prisma.games.findUnique({ where: { gameId: gameId } });
    if (!game) {
      return res.status(400).json({
        success: false,
        msg: "Game not found",
      });
    }

    // Check if the user is already registered for the game
    const existingPlayer = await prisma.gamePlayers.findFirst({
      where: { GameId: gameId, player_id: userId },
    });

    if (existingPlayer) {
      return res.status(400).json({
        success: false,
        msg: "User is already registered for this game",
      });
    }

    // Assuming you need to create a team if teamName is provided
    let teamId;
    if (teamName) {
      // Check if the team already exists
      let team = await prisma.teams.findFirst({ where: { name: teamName } });
      if (!team) {
        // If team doesn't exist, create it
        team = await prisma.teams.create({ data: { name: teamName } });
      }
      teamId = team.id;
    }

    const gamePlayer = await prisma.gamePlayers.create({
      data: {
        GameId: gameId,
        player_id: userId,
        teamId: teamId,
      },
    });

    return res.status(200).json({
      success: true,
      msg: "User registered to game successfully",
      gamePlayer: gamePlayer,
    });
  } catch (error) {
    console.error("Error in registerToGameController:", error);
    return res.status(500).json({
      success: false,
      msg: "Failed to register user to game",
      error: error.message,
    });
  }
};

const leaveGameController = async (req, res) => {
  try {
    const { userId, gameId } = req.body;
    if (!userId || !gameId) {
      return res.status(400).json({
        success: false,
        msg: "Please provide both userId and gameId",
      });
    }

    const gamePlayer = await prisma.gamePlayers.findFirst({
      where: { GameId: gameId, player_id: userId },
    });
    if (!gamePlayer) {
      return res.status(400).json({
        success: false,
        msg: "User is not registered for this game",
      });
    }

    await prisma.gamePlayers.delete({
      where: { GameId: gameId, player_id: userId },
    });

    return res.status(200).json({
      success: true,
      msg: "User left the game successfully",
    });
  } catch (error) {
    console.error("Error in leaveGameController:", error);
    return res.status(500).json({
      success: false,
      msg: "Failed to remove user from game",
      error: error.message,
    });
  }
};

module.exports = {
  registerToGameController,
  leaveGameController,
};
