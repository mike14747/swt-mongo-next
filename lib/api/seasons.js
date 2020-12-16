import { connectToDatabase } from '../../config/connection';

const getCurrentSeasonDetails = async () => {
    const { db } = await connectToDatabase();

    return db.collection('seasons').aggregate([
        {
            $lookup: {
                from: 'settings',
                localField: 'seasonId',
                foreignField: 'currentSeasonId',
                as: 'currentSeason',
            },
        },
        {
            $unwind: {
                path: '$currentSeason',
            },
        },
        {
            $project: {
                seasonId: 1,
                seasonNum: 1,
                seasonName: 1,
                year: 1,
                seasonGames: 1,
            },
        },
        {
            $limit: 1,
        },
    ]).toArray()
        .then(result => result)
        .catch(error => console.error(error.message));
};

module.exports = {
    getCurrentSeasonDetails,
};
