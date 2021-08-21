import { connectToDatabase } from '../../config/connection';

const getTeamSeasonsListAndInfo = async (teamId) => {
    const { db } = await connectToDatabase();

    return db
        .collection('teams')
        .find({ teamId: parseInt(teamId) })
        .project({ _id: 0, teamId: 1, teamName: 1, stores: 1, 'seasons.seasonId': 1, 'seasons.seasonName': 1, 'seasons.year': 1 })
        .limit(1)
        .toArray();
};

const getCumulativeStatsForQuerySeason = async (teamId, seasonId) => {
    const { db } = await connectToDatabase();

    return db
        .collection('teams')
        .find({ teamId: parseInt(teamId), 'seasons.seasonId': parseInt(seasonId) })
        .project({ _id: 0, seasons: { $elemMatch: { seasonId: parseInt(seasonId) } } })
        .limit(1)
        .toArray();

};

const getTeamInfo = async (teamId) => {
    const { db } = await connectToDatabase();

    return db
        .collection('teams')
        .find({ teamId: parseInt(teamId) })
        .project({ _id: 0, teamId: 1, teamName: 1, stores: 1 })
        .limit(1)
        .toArray();
};

module.exports = {
    getTeamSeasonsListAndInfo,
    getCumulativeStatsForQuerySeason,
    getTeamInfo,
};
