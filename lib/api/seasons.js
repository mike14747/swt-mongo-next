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
    ]).toArray();
};

const getSeasonDetailsById = async (id) => {
    const { db } = await connectToDatabase();

    return await db
        .collection('seasons')
        .find({ seasonId: parseInt(id) })
        .project({ _id: 0, seasonId: 1, seasonName: 1, year: 1 })
        .limit(1)
        .toArray();
};

module.exports = {
    getCurrentSeasonDetails,
    getSeasonDetailsById,
};
