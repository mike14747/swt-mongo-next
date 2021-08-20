import { connectToDatabase } from '../../config/connection';

const getChampions = async () => {
    const { db } = await connectToDatabase();

    return db
        .collection('seasons')
        .aggregate([
            {
                $project: {
                    seasonId: 1,
                    seasonName: 1,
                    year: 1,
                    champion: 1,
                },
            },
            {
                $sort: {
                    seasonId: 1,
                },
            },
        ]).toArray();
};

module.exports = {
    getChampions,
};
