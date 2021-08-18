import { connectToDatabase } from '../../config/connection';

const searchPlayers = async (slug) => {
    const { db } = await connectToDatabase();

    return await db
        .collection('players')
        .find({ playeName: `/${slug}/i` })
        .toArray();
};

const searchTeams = async (slug) => {
    const { db } = await connectToDatabase();

    return await db
        .collection('teams')
        .find({ teamName: `/${slug}/i` })
        .toArray();
};

module.exports = {
    searchPlayers,
    searchTeams,
};
