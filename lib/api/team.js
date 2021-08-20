import { connectToDatabase } from '../../config/connection';

const getTeamSeasonsList = async (teamId) => {
    const { db } = await connectToDatabase();

    return db
        .collection('teams')
        .aggregate([
            {
                $match: {
                    teamId: parseInt(teamId),
                },
            },
            {
                $unwind: {
                    path: '$seasonStats',
                },
            },
            {
                $group: {
                    _id: '$seasonStats.seasonId',
                    seasonId: { $first: '$seasonStats.seasonId' },
                    seasonName: { $first: '$seasonStats.seasonName' },
                    year: { $first: '$seasonStats.year' },
                },
            },
            {
                $sort: {
                    seasonId: -1,
                },
            },
        ]).toArray();
};

const getCumulativeStatsForCurrentSeason = async (teamId) => {
    const { db } = await connectToDatabase();

    return db
        .collection('teams')
        .aggregate([
            {
                $match: {
                    teamId: parseInt(teamId),
                },
            },
            {
                $lookup: {
                    from: 'settings',
                    localField: 'seasonStats.seasonId',
                    foreignField: 'currentSeasonId',
                    as: 'currentSeason',
                },
            },
            {
                $unwind: {
                    path: '$currentSeason',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $project: {
                    teamId: 1,
                    teamName: 1,
                    stores: 1,
                    seasonStats: {
                        $filter: {
                            input: '$seasonStats',
                            as: 'seasonStats',
                            cond: { $eq: ['$$seasonStats.seasonId', '$currentSeason.currentSeasonId'] },
                        },
                    },
                    careerStats: 1,
                },
            },
            {
                $unwind: {
                    path: '$seasonStats',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $limit: 1,
            },
        ]).toArray();
};

const getCumulativeStatsForQuerySeason = async (teamId, seasonId) => {
    const { db } = await connectToDatabase();

    return db
        .collection('teams')
        .aggregate([
            {
                $match: {
                    teamId: parseInt(teamId),
                },
            },
            {
                $project: {
                    teamId: 1,
                    teamName: 1,
                    stores: 1,
                    seasonStats: {
                        $filter: {
                            input: '$seasonStats',
                            as: 'seasonStats',
                            cond: { $eq: ['$$seasonStats.seasonId', parseInt(seasonId)] },
                        },
                    },
                    careerStats: 1,
                },
            },
            {
                $unwind: {
                    path: '$seasonStats',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $limit: 1,
            },
        ]).toArray();
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
    getTeamSeasonsList,
    getCumulativeStatsForCurrentSeason,
    getCumulativeStatsForQuerySeason,
    getTeamInfo,
};
