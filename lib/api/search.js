import { connectToDatabase } from '../../config/connection';

const searchPlayers = async (slug) => {
    const { db } = await connectToDatabase();

    return db
        .collection('players')
        .find({ playerName: { $regex: slug, $options: 'i' } })
        .project({ _id: 0, playerId: 1, playerName: 1, stores: 1 })
        .sort({ playerName: 1 })
        .toArray();
};

const searchTeams = async (slug) => {
    const { db } = await connectToDatabase();

    return db
        .collection('teams')
        .find({ teamName: { $regex: slug, $options: 'i' } })
        .project({ _id: 0, teamId: 1, teamName: 1, stores: 1 })
        .sort({ teamName: 1 })
        .toArray();
};

module.exports = {
    searchPlayers,
    searchTeams,
};
