const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllSportsController = async (req, res) => {
    try {
        const sports = await prisma.sport.findMany({
            include: { user: true },
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

exports.createSportController = async (req, res) => {
    try {
        const { title, date, time, players, location, additional, userId } = req.body;
        if (!title || !date || !time || !location || !userId) {
            return res.status(400).send({
                msg: "Please fill title, date, time, location, and userId",
            });
        }
        const exist = await prisma.user.findUnique({ where: { id: userId } });
        if (!exist) {
            return res.status(400).send({
                msg: "Unable to find user",
            });
        }

        const newSport = await prisma.sport.create({
            data: {
                title,
                date: new Date(date),
                time: new Date(time),
                players,
                location,
                additional,
                userId,
            },
        });

        return res.status(200).send({
            success:true,
            newSport,
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            msg: "UNABLE TO CREATE SPORT",
            error: error.message,
        });
    }
};

exports.updateSportController = async (req, res) => {
    try {
        const { id } = req.params;

        const { title, date, time, players, location, additional } = req.body;
        if (!title && !date && !time && !location && !additional) {
            return res.status(400).send({
                success: false,
                msg: "Please provide at least one field to update",
            });
        }

        const updatedSport = await prisma.sport.update({
            where: { id: Number(id) },
            data: { title, date, time, players, location, additional },
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
    } catch (error) {
        return res.status(400).send({
            success: false,
            msg: "Error in updating sport",
            error: error.message,
        });
    }
};

exports.getSportById = async (req, res) => {
    try {
        const id = req.params.id;
        const sport = await prisma.sport.findUnique({ where: { id: Number(id) } });
        if (!sport) {
            return res.status(200).send({
                msg: "no such sport",
            });
        }
        return res.status(200).send({
            success:true,
            sport,
        });
    } catch (error) {
        return res.status(400).send({
            msg: "ERROR",
            error: error.message,
        });
    }
};

exports.deleteSportController = async (req, res) => {
    try {
        const id = req.params.id;
        const sport = await prisma.sport.delete({ where: { id: Number(id) } });
        return res.status(200).send({
            success:true,
            msg: "Deleted Successfully",
            data: sport,
        });
    } catch (error) {
        return res.status(400).send({
            msg: "ERROR IN DELETING",
            error: error.message,
        });
    }
};

exports.userSportController = async (req, res) => {
    try {
        const userSport = await prisma.user.findUnique({
            where: { id: Number(req.params.id) },
            include: { sports: true },
        });
        if (!userSport) {
            return res.status(404).send({
                success: false,
                msg: "sports NOT FOUND WITH THIS ID",
            });
        }
        return res.status(200).send({
            success: true,
            message: "user sports",
            userSport,
        });
    } catch (error) {
        console.error("Error in userSportController:", error);
        return res.status(400).send({
            success: false,
            message: "Error in userSportController",
            error,
        });
    }
};