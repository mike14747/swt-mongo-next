import PropTypes from 'prop-types';
import Head from 'next/head';
import { useContext } from 'react';
import CurrentSeasonContext from '../../context/currentSeasonContext';

import { getPlayerSeasonsList, getCumulativeStatsForCurrentSeason, getCumulativeStatsForQuerySeason } from '../../lib/api/players';

import PageHeading from '../../components/pageHeading';
import SeasonDropdown from '../../components/seasonDropdown';
import PlayerStatsBlock from '../../components/playerStatsBlock/playerStatsBlock';
import ErrorMessage from '../../components/errorMessage';

const Players = ({ playerInfo, stats, displayedSeason, seasons, error }) => {
    const currentSeason = useContext(CurrentSeasonContext);

    return (
        <>
            <Head>
                <title>Player Stats</title>
            </Head>
            <PageHeading text="Player Stats" />
            <div className="row mb-4">
                <div className="col-6 text-left">
                    {playerInfo &&
                        <div className="mb-3">
                            <div className="bigger font-weight-bolder"><span className="text-danger mr-2">Player:</span>{playerInfo.playerName}</div>
                            <div>
                                <span className="small mr-2">Current View:</span>
                                <span className="font-weight-bolder">
                                    none
                                </span>
                            </div>
                            <div>
                                <span className="small mr-2">Career Store(s):</span>
                                {playerInfo.stores.map((s, i) => (
                                    <span key={s.storeId}>
                                        {i > 0 && <>, </>}
                                        <>{s.storeCity}</>
                                    </span>
                                ))}
                            </div>
                        </div>
                    }
                </div>
                <div className="col-6 text-right p-2">
                    {seasons && seasons.length > 0 &&
                        <SeasonDropdown displayedSeason={displayedSeason} buttonText="View Stats From" listItems={seasons} />
                    }
                </div>
            </div>

            {error && <ErrorMessage text={error.message} />}

            {stats &&
                <div className="row">
                    <div className="col-md-6">
                        <div className="text-center bigger font-weight-bolder text-primary mb-2">
                            {displayedSeason
                                ? <><span className="small text-dark mr-2">Selected season: </span>{displayedSeason.seasonName}, {displayedSeason.year}</>
                                : currentSeason &&
                                <><span className="small text-dark mr-2">Current Season is: </span>{currentSeason.seasonName}, {currentSeason.year}</>
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
    playerInfo: PropTypes.object,
    stats: PropTypes.object,
    displayedSeason: PropTypes.object,
    seasons: PropTypes.array,
    error: PropTypes.object,
};

export async function getServerSideProps({ params, query }) {
    let playerInfo = null;
    let stats = null;
    let displayedSeason = null;
    let seasons = null;
    let error = null;
    let statsResponse = null;

    try {
        const seasonsListResponse = await getPlayerSeasonsList(params.id);
        if (seasonsListResponse && seasonsListResponse.length > 0) {
            seasons = JSON.parse(JSON.stringify(seasonsListResponse)).map((season) => ({
                ...season,
                url: `/players/${params.id}?seasonId=${season.seasonId}`,
            }));
        }

        if (query && query.seasonId) {
            [statsResponse] = await getCumulativeStatsForQuerySeason(params.id, query.seasonId);
        } else {
            [statsResponse] = await getCumulativeStatsForCurrentSeason(params.id);
        }

        if (statsResponse) {
            const statsJson = JSON.parse(JSON.stringify(statsResponse));
            playerInfo = {
                playerId: statsJson.playerId,
                playerName: statsJson.playerName,
                stores: statsJson.stores,
            };
            stats = {
                seasonStats: statsJson.seasonStats || null,
                careerStats: statsJson.careerStats || null,
            };
            if (stats.seasonStats) {
                displayedSeason = {
                    seasonId: statsResponse.seasonStats.seasonId,
                    seasonName: statsResponse.seasonStats.seasonName,
                    year: statsResponse.seasonStats.year,
                };
            }
        }

        if (stats === null) error = { message: 'Player was not found!' };

        return { props: { playerInfo, stats, displayedSeason, seasons, error } };
    } catch (error) {
        console.error(error.message);
        return { props: { playerInfo: null, stats: null, displayedSeason: null, seasons: null, error: { message: 'An error occurred trying to fetch data!' } } };
    }
}

export default Players;
