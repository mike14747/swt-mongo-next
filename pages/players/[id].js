import PropTypes from 'prop-types';
import Head from 'next/head';
import { useContext } from 'react';
import CurrentSeasonContext from '../../context/currentSeasonContext';

import { getPlayerSeasonsList, getCumulativeStatsForCurrentSeason, getCumulativeStatsForQuerySeason } from '../../lib/api/players';

import PageHeading from '../../components/pageHeading';
import SeasonDropdown from '../../components/seasonDropdown';
import PlayerStatsBlock from '../../components/playerStatsBlock/playerStatsBlock';

const Players = ({ stats, displayedSeason, seasons, error }) => {
    const currentSeason = useContext(CurrentSeasonContext);

    if (!displayedSeason) {
        displayedSeason = {
            seasonId: currentSeason.seasonId,
            seasonName: currentSeason.seasonName,
            year: currentSeason.year,
        };
    }

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
                    <div className="col-md-6">
                        <div className="text-center bigger font-weight-bolder text-primary mb-2">
                            {displayedSeason && displayedSeason.seasonId &&
                                <div>{displayedSeason.seasonName}, {displayedSeason.year} Stats</div>
                            }
                        </div>
                        <div className="d-flex justify-content-center mb-4">
                            {stats.seasonStats
                                ? <PlayerStatsBlock stats={stats.seasonStats} />
                                : <div className="text-danger mt-3 mb-4 bigger">Player has no stats for the selected season.</div>
                            }
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="text-center bigger font-weight-bolder text-success mb-2">Career Stats</div>
                        <div className="d-flex justify-content-center mb-4">
                            {stats.careerStats
                                ? <PlayerStatsBlock stats={stats.careerStats} />
                                : <div>Player has no career stats.</div>
                            }
                        </div>
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
            if (statsResponse) {
                stats = JSON.parse(JSON.stringify(statsResponse));
                if (stats.seasonStats) {
                    displayedSeason = {
                        seasonId: statsResponse.seasonStats.seasonId,
                        seasonName: statsResponse.seasonStats.seasonName,
                        year: statsResponse.seasonStats.year,
                    };
                }
            }
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
