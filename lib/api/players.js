import { connectToDatabase } from '../../config/connection';

const getPlayerSeasonsList = async (playerId) => {
    const { db } = await connectToDatabase();

    return db.collection('players').aggregate([
        {
            $match: {
                playerId: parseInt(playerId),
            },
        },
        {
            $unwind: {
                path: '$seasonStats',
            },
        },
        {
            $group: {
                _id: '$seasonStats.seasonId',
                seasonId: { $first: '$seasonStats.seasonId' },
                seasonName: { $first: '$seasonStats.seasonName' },
                year: { $first: '$seasonStats.year' },
            },
        },
        {
            $sort: {
                seasonId: 1,
            },
        },
    ]).toArray()
        .then(result => result)
        .catch(error => console.error(error.message));
};

const getSeasonStats = async (playerId, seasonId) => {
    const { db } = await connectToDatabase();

    return db.collection('players').aggregate([
        {
            $match: {
                playerId: parseInt(playerId),
            },
        },
        {
            $unwind: {
                path: '$seasonStats',
            },
        },
        {
            $match: {
                'seasonStats.seasonId': parseInt(seasonId),
            },
        },
        {
            $limit: 1,
        },
        {
            $project: {
                _id: 0,
                playerId: 1,
                playerName: 1,
                seasonStats: 1,
            },
        },
    ]).toArray()
        .then(result => result)
        .catch(error => console.error(error.message));
};

const getCareerStats = async (playerId) => {
    const { db } = await connectToDatabase();

    return db.collection('players').findOne({ playerId: parseInt(playerId) }, { projection: { _id: 0, careerStats: 1 } })
        .then(result => result)
        .catch(error => console.error(error.message));
};

module.exports = {
    getPlayerSeasonsList,
    getSeasonStats,
    getCareerStats,
};
