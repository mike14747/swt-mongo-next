import { connectToDatabase } from '../../config/connection';

const getSettings = async () => {
    const { db } = await connectToDatabase();
    return await db.collection('settings').find({}).limit(1).toArray();
};

module.exports = {
    getSettings,
};
