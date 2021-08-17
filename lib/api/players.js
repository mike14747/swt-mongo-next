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
    ]).toArray();
};

const getCumulativeStatsForCurrentSeason = async (playerId) => {
    const { db } = await connectToDatabase();

    return db.collection('players').aggregate([
        {
            $match: {
                playerId: parseInt(playerId),
            },
        },
        {
            $lookup: {
                from: 'settings',
                localField: 'seasonStats.seasonId',
                foreignField: 'currentSeasonId',
                as: 'currentSeason',
            },
        },
        {
            $unwind: {
                path: '$currentSeason',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $project: {
                playerId: 1,
                playerName: 1,
                stores: 1,
                seasonStats: {
                    $filter: {
                        input: '$seasonStats',
                        as: 'seasonStats',
                        cond: { $eq: ['$$seasonStats.seasonId', '$currentSeason.currentSeasonId'] },
                    },
                },
                careerStats: 1,
            },
        },
        {
            $unwind: {
                path: '$seasonStats',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $limit: 1,
        },
    ]).toArray();
};

const getCumulativeStatsForQuerySeason = async (playerId, seasonId) => {
    const { db } = await connectToDatabase();

    return db.collection('players').aggregate([
        {
            $match: {
                playerId: parseInt(playerId),
            },
        },
        {
            $project: {
                playerId: 1,
                playerName: 1,
                stores: 1,
                seasonStats: {
                    $filter: {
                        input: '$seasonStats',
                        as: 'seasonStats',
                        cond: { $eq: ['$$seasonStats.seasonId', parseInt(seasonId)] },
                    },
                },
                careerStats: 1,
            },
        },
        {
            $unwind: {
                path: '$seasonStats',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $limit: 1,
        },
    ]).toArray();
};

module.exports = {
    getPlayerSeasonsList,
    getCumulativeStatsForCurrentSeason,
    getCumulativeStatsForQuerySeason,
};
