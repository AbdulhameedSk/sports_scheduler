// Import Prisma Client
const { PrismaClient } = require('@prisma/client');

// Create an instance of Prisma Client
const prisma = new PrismaClient();

// Define admin user ID
const adminUserId = 1;

// Function to add players to a game
async function addPlayerToGame(gameId, playerId) {
    try {
        const game = await prisma.sport.findUnique({ where: { id: gameId } });
        if (!game) {
            throw new Error('Game not found');
        }

        // Add player to the game
        await prisma.sport.update({
            where: { id: gameId },
            data: { players: { connect: { id: playerId } } },
        });

        console.log('Player added to the game successfully');
    } catch (error) {
        console.error('Error adding player to the game:', error);
    }
}

// Function to create a game
async function createGame(title, date, time, location, userId) {
    try {
        // Check if the user is an admin
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user || user.role !== 'admin') {
            throw new Error('Only admins can create games');
        }

        // Create the game
        const game = await prisma.sport.create({
            data: {
                title,
                date,
                time,
                location,
                userId,
            },
        });

        console.log('Game created successfully:', game);
    } catch (error) {
        console.error('Error creating game:', error);
    }
}

// Function to update players in a game
async function addPlayerToGameAsAdmin(gameId, playerId) {
    try {
        const game = await prisma.sport.findUnique({ where: { id: gameId } });
        if (!game) {
            throw new Error('Game not found');
        }

        // Check if the user is an admin
        if (game.userId !== adminUserId) {
            throw new Error('Only admins can add players to games');
        }

        // Get current players and add new player
        const currentPlayers = game.players ? game.players.split(',') : [];
        currentPlayers.push(playerId);
        const players = currentPlayers.join(',');

        // Update players in the game
        await prisma.sport.update({
            where: { id: gameId },
            data: { players: players },
        });

        console.log('Player added to the game successfully');
    } catch (error) {
        console.error('Error adding player to the game:', error);
    }
}

// Function to delete a game
async function deleteGame(gameId) {
    try {
        const game = await prisma.sport.findUnique({ where: { id: gameId } });
        if (!game) {
            throw new Error('Game not found');
        }

        // Check if the user is an admin
        if (game.userId !== adminUserId) {
            throw new Error('Only admins can delete games');
        }

        // Delete the game
        await prisma.sport.delete({ where: { id: gameId } });

        console.log('Game deleted successfully');
    } catch (error) {
        console.error('Error deleting game:', error);
    }
}

// Function to add players to a game (for normal players)
async function joinGame(gameId, playerId) {
    try {
        const game = await prisma.sport.findUnique({ where: { id: gameId } });
        if (!game) {
            throw new Error('Game not found');
        }

        // Add the player to the game
        await prisma.sport.update({
            where: { id: gameId },
            data: { players: { connect: { id: playerId } } },
        });

        console.log('Player joined the game successfully');
    } catch (error) {
        console.error('Error joining the game:', error);
    }
}


// Usage examples
const normalPlayerId = 2;

addPlayerToGame(1, normalPlayerId); // Only admins can add players to games
createGame('Football', new Date(), '10:00', 'Stadium', adminUserId); // Game created successfully
addPlayerToGameAsAdmin(1, normalPlayerId); // Only admins can update players in games
deleteGame(1); // Only admins can delete games
joinGame(1, normalPlayerId); // Player joined the game successfully



module.exports = {
    addPlayerToGame,
    createGame,
    addPlayerToGameAsAdmin,
    deleteGame,
    joinGame
};