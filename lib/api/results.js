import { connectToDatabase } from '../../config/connection';

const getAllResultsList = async () => {
    const { db } = await connectToDatabase();

    return db
        .collection('results')
        .aggregate([
            {
                $group: {
                    _id: '$_id',
                    seasonId: { $first: '$seasonId' },
                    storeId: { $first: '$storeId' },
                    divisionId: { $first: '$divisionId' },
                },
            },
            {
                $project: { _id: 0 },
            },
            {
                $sort: { seasonId: 1, storeId: 1, divisionId: 1 },
            },
        ])
        .toArray();
};

const getResultsBySeasonStoreDivision = async (seasonId, storeId, divisionId) => {
    const { db } = await connectToDatabase();

    return db
        .collection('results')
        .find({ seasonId: parseInt(seasonId), storeId: parseInt(storeId), divisionId: parseInt(divisionId) })
        .project({ _id: 0 })
        .limit(1)
        .toArray();
};

const getResultsSeasonsListByStore = async (storeId, divisionId) => {
    const { db } = await connectToDatabase();

    return db
        .collection('results')
        .find({ storeId: parseInt(storeId), divisionId: parseInt(divisionId) })
        .project({ _id: 0, seasonId: 1, seasonName: 1, year: 1, storeId: 1, divisionId: 1 })
        .sort({ seasonId: -1 })
        .toArray();
};

module.exports = {
    getAllResultsList,
    getResultsBySeasonStoreDivision,
    getResultsSeasonsListByStore,
};
