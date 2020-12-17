import { connectToDatabase } from '../../config/connection';

const getNavbarTeams = async () => {
    const { db } = await connectToDatabase();

    return db.collection('schedules').aggregate([

    ])
        .then(result => result)
        .catch(error => console.error(error.message));
};

module.exports = {
    getNavbarTeams,
};
