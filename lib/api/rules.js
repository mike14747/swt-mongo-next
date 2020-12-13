import { connectToDatabase } from '../../config/connection';

const getRules = async () => {
    const { db } = await connectToDatabase();
    // return await db.collection('rules').findOne({});

    return db.collection('rules').findOne({})
        .then(result => result)
        .catch(error => console.error(error.message));
};

module.exports = {
    getRules,
};
