import { connectToDatabase } from '../../config/connection';

const getRules = async () => {
    const { db } = await connectToDatabase();

    return db
        .collection('rules')
        .findOne({});
};

module.exports = {
    getRules,
};
