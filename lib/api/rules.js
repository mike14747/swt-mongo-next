import { connectToDatabase } from '../../config/connection';

const getRules = async () => {
    const { db } = await connectToDatabase();
    return await db.collection('rules').find({}).limit(1).toArray();
};

module.exports = {
    getRules,
};
