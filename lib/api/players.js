import { connectToDatabase } from '../../config/connection';

const getPlayerSeasonsList = async (playerId) => {
    const { db } = await connectToDatabase();

    return db.collection('players').aggregate([
        {
            $match: {
                playerId: parseInt(playerId),
            },
        }, {
            $unwind: {
                path: '$seasonStats',
            },
        }, {
            $group: {
                _id: '$seasonStats.seasonId',
                seasonId: { $first: '$seasonStats.seasonId' },
                seasonName: { $first: '$seasonStats.seasonName' },
                year: { $first: '$seasonStats.year' },
            },
        }, {
            $sort: {
                seasonId: 1,
            },
        },
    ]).toArray()
        .then(result => result)
        .catch(error => console.error(error.message));
};

module.exports = {
    getPlayerSeasonsList,
};
