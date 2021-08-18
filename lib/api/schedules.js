import { connectToDatabase } from '../../config/connection';

const getNavbarStores = async (seasonId) => {
    const { db } = await connectToDatabase();

    return db
        .collection('schedules')
        .aggregate([
            {
                $match: {
                    seasonId: parseInt(seasonId),
                },
            }, {
                $project: {
                    _id: 0,
                    seasonId: 1,
                    storeId: 1,
                    storeCity: 1,
                    divisionId: 1,
                    divisionName: 1,
                },
            }, {
                $sort: {
                    storeCity: 1,
                    divisionId: 1,
                },
            },
        ]).toArray();
};

const getAllSchedulesList = async () => {
    const { db } = await connectToDatabase();

    return db
        .collection('schedules')
        .find({})
        .project({ _id: 0, seasonId: 1, storeId: 1, divisionId: 1 })
        .sort({ seasonId: 1, storeId: 1, divisionId: 1 })
        .toArray();
};

const getScheduleBySeasonStoreDivision = async (seasonId, storeId, divisionId) => {
    const { db } = await connectToDatabase();

    return db
        .collection('schedules')
        .find({ seasonId: seasonId, storeId: storeId, divisionId: divisionId })
        .limit(1)
        .toArray();
};

module.exports = {
    getNavbarStores,
    getAllSchedulesList,
    getScheduleBySeasonStoreDivision,
};
