import { connectToDatabase } from '../../config/connection';

const getSettings = async () => {
    const { db } = await connectToDatabase();

    return db.collection('settings').findOne({})
        .then(result => result)
        .catch(error => console.error(error.message));
};

const getCurrentSeasonId = async () => {
    const { db } = await connectToDatabase();

    return db.collection('settings').findOne({}, { projection: { _id: 0, currentSeasonId: 1 } })
        .then(result => result)
        .catch(error => console.error(error.message));
};

module.exports = {
    getSettings,
    getCurrentSeasonId,
};
