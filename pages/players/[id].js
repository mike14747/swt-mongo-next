import PropTypes from 'prop-types';
import Head from 'next/head';

import { getPlayerSeasonsList, getCumulativeStatsForCurrentSeason, getCumulativeStatsForQuerySeason } from '../../lib/api/players';

import PageHeading from '../../components/pageHeading';
import SeasonDropdown from '../../components/seasonDropdown';
import PlayerStatsBlock from '../../components/playerStatsBlock/playerStatsBlock';

const Players = ({ stats, displayedSeason, seasons, error }) => {
    console.log('stats:', stats, 'error:', error);
    return (
        <>
            <Head>
                <title>Player Stats</title>
            </Head>
            <PageHeading text="Player Stats" />
            <div className="row mb-4">
                <div className="col-12 text-right p-2">
                    {seasons && seasons.length > 0 &&
                        <SeasonDropdown displayedSeason={displayedSeason} buttonText="View Standings From" listItems={seasons} />
                    }
                </div>
            </div>

            {error && error.message}

            {stats &&
                <div className="row">
                    <div className="col-sm-6">
                        <div>Season Stats</div>
                        {stats.seasonStats
                            ? <PlayerStatsBlock stats={stats.seasonStats} />
                            : <div className="text-danger">Player has no stats for the selected season.</div>
                        }
                    </div>
                    <div className="col-sm-6">
                        <div>Career Stats</div>
                        {stats.careerStats
                            ? <PlayerStatsBlock stats={stats.careerStats} />
                            : <div>Player has no career stats.</div>
                        }
                    </div>
                </div>
            }
        </>
    );
};

Players.propTypes = {
    stats: PropTypes.object,
    displayedSeason: PropTypes.object,
    seasons: PropTypes.array,
    error: PropTypes.object,
};

export async function getServerSideProps({ params, query }) {
    let seasonId = 0;
    let stats = null;
    let displayedSeason = null;
    let seasons = null;
    let error = null;

    try {
        const seasonsListResponse = await getPlayerSeasonsList(params.id);
        if (seasonsListResponse && seasonsListResponse.length > 0) {
            seasons = JSON.parse(JSON.stringify(seasonsListResponse)).map((season) => ({
                ...season,
                url: `/players/${params.id}?seasonId=${season.seasonId}`,
            }));
        }

        if (query && query.seasonId) {
            const [statsResponse] = await getCumulativeStatsForQuerySeason(params.id, query.seasonId);
            if (statsResponse) stats = JSON.parse(JSON.stringify(statsResponse));
        } else {
            const [statsResponse] = await getCumulativeStatsForCurrentSeason(params.id);
            if (statsResponse) stats = JSON.parse(JSON.stringify(statsResponse));
        }

        if (stats === null) error = { message: 'Player was not found!' };

        return { props: { stats, displayedSeason, seasons, error } };
    } catch (error) {
        console.error(error.message);
        return { props: { stats: null, displayedSeason: null, seasons: null, error: { message: 'An error occurred trying to fetch data!' } } };
    }
}

export default Players;
