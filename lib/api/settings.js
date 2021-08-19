import { connectToDatabase } from '../../config/connection';

const getSettings = async () => {
    const { db } = await connectToDatabase();

    return db
        .collection('settings')
        .findOne({}, { projection: { _id: 0, currentSeasonId: 1, displaySchedule: 1, contactEmail: 1 } });
};

const getCurrentSeasonId = async () => {
    const { db } = await connectToDatabase();

    return db
        .collection('settings')
        .findOne({}, { projection: { _id: 0, currentSeasonId: 1 } });
};

module.exports = {
    getSettings,
    getCurrentSeasonId,
};
