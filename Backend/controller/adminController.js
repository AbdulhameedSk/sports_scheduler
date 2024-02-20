const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//create sport
const createSportController = async (req, res) => {
  try {
    const { sdesc, sname, maxplayers, created_by } = req.body;
    if (!sname || !created_by) {
      return res.status(400).send({
        msg: "Please provide sname and created_by",
      });
    }
    const exist = await prisma.users.findUnique({
      where: { user_id: created_by },
    });
    if (!exist) {
      res.status(404).send({
        success: false,
        msg: "Invalid user",
      });
    }
    const newGame = await prisma.sports.create({
      data: {
        sname,
        sdesc,
        maxplayers,
        created_by,
      },
    });
    res.status(200).send({
      success: true,
      msg: "Sport Created",
    });
  } catch (error) {
    res.status(500).send({ error, msg: "Error in creating Sport Controller" });
  }
};

// Update sport controller
const updateSportController = async (req, res) => {
  try {
    const { id } = req.params;

    const { sname, sdesc, maxplayers, created_by } = req.body;

    if (sname || sdesc || maxplayers || created_by) {
      const updatedSport = await prisma.sports.update({
        where: { sportid: Number(id) },
        data: { sname, sdesc, maxplayers, created_by },
      });

      if (!updatedSport) {
        return res.status(404).send({
          success: false,
          msg: "Sport not found",
        });
      }

      return res.status(200).send({
        success: true,
        msg: "Sport updated successfully",
        updatedSport,
      });
    } else {
      return res.status(400).send({
        success: false,
        msg: "Please provide at All field to update",
      });
    }
  } catch (error) {
    return res.status(400).send({
      success: false,
      msg: "Error in updation of sport",
    });
  }
};

//Deletion of sport
const deleteSportController = async (req, res) => {
  try {
    const id = req.params.id;
    const exist = await prisma.sports.findUnique({
      where: { sportid: Number(id) },
    });
    if (!exist) {
      return res.status(404).send({
        msg: "Cannot find the sport",
        error,
      });
    }
    const sport = await prisma.sports.delete({
      where: { sportid: Number(id) },
    });
    return res.status(200).send({
      success: true,
      msg: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).send({
      error,
      msg: "Error in deletion on sport",
    });
  }
};
// create game controller
const createGameController = async (req, res) => {
  try {
    const { sportId, createdBy, date, startTime, venue, maxGPlayers } =
      req.body;
    if (
      !sportId ||
      !createdBy ||
      !date ||
      !startTime ||
      !venue ||
      !maxGPlayers
    ) {
      return res.status(400).send({
        msg: "Please fill sportId, createdBy, date, startTime, venue, and maxGPlayers",
      });
    }
    const exist = await prisma.users.findUnique({
      where: { user_id: createdBy },
    });
    if (!exist) {
      return res.status(400).send({
        msg: "Unable to find user",
      });
    }

    const newGame = await prisma.games.create({
      data: {
        sportId,
        createdBy,
        date: new Date(date),
        startTime: new Date(startTime),
        venue,
        maxGPlayers,
      },
    });

    return res.status(200).send({
      success: true,
      newGame,
    });
  } catch(error) {
    res.status(500).send({
      success: false,
        error,
      msg: "error in creating game",
    });
  }
};

//Update game controller
const updateGameController = async (req, res) => {
  try {
    const { id } = req.params;

    const {  date, startTime, venue,isCompleted } = req.body;
    if (!isCompleted && !date && !startTime && !venue) {
      return res.status(400).send({
        success: false,
        msg: "Please provide at least one field to update",
      });
    }

    const updatedGame = await prisma.games.update({
      where: { gameId: parseInt(id) },
      data: { 
        isCompleted,
        date: new Date(date),
        startTime: new Date(startTime),
        venue,
      }
    });

    if (!updatedGame) {
      return res.status(404).send({
        success: false,
        msg: "Game not found",
      });
    }

    return res.status(200).send({
      success: true,
      msg: "Game updated successfully",
      updatedGame,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      msg: "Error in updating game",
      error
    });
  }
}



// Get all sports
const getAllSportsController = async (req, res) => {
  try {
    const sports = await prisma.sports.findMany({
      include: { users: true },
    });
    if (!sports || sports.length === 0) {
      return res.status(200).send({
        success: true,
        msg: "No sports Till Now",
      });
    }
    return res.status(200).send({
      success: true,
      msg: "GOT",
      sportCount: sports.length,
      sports,
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      msg: "ERROR WHILE GETTING sports",
      error: error.message,
    });
  }
};

module.exports = {
  getAllSportsController,
  updateGameController,
  createGameController,
  deleteSportController,
  updateSportController,
  createSportController,
};
