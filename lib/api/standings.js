import { connectToDatabase } from '../../config/connection';

const getStandingsBySeasonId = async (seasonId) => {
    const { db } = await connectToDatabase();
    // return await db.collection('standings').findOne({ seasonId }).toArray();

    // return db.collection('standings').findOne({ seasonId: parseInt(seasonId) })
    //     .then(result => result)
    //     .catch(error => console.error(error.message));

    return db.collection('standings').aggregate([
        {
            $match: {
                seasonId: parseInt(seasonId),
            },
        },
        {
            $unwind: {
                path: '$stores',
            },
        },
        {
            $sort: {
                'stores.storeCity': 1,
                'stores.divisionId': 1,
            },
        },
        {
            $group: {
                _id: '$_id',
                seasonId: { $first: '$seasonId' },
                seasonNum: { $first: '$seasonNum' },
                seasonName: { $first: '$seasonName' },
                year: { $first: '$year' },
                seasonGames: { $first: '$seasonGames' },
                stores: { $push: '$stores' },
            },
        },
    ]).toArray()
        .then(result => result)
        .catch(error => console.error(error.message));
};

module.exports = {
    getStandingsBySeasonId,
};
