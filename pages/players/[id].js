import PropTypes from 'prop-types';
import Head from 'next/head';

import { getPlayerSeasonsList, getCumulativeStatsForCurrentSeason, getCumulativeStatsForQuerySeason } from '../../lib/api/players';
import { getCurrentSeasonDetails, getSeasonDetailsById } from '../../lib/api/seasons';

import SeasonDropdown from '../../components/SeasonDropdown';
import PlayerStatsBlock from '../../components/playerStatsBlock/PlayerStatsBlock';
import ErrorMessage from '../../components/ErrorMessage';

import styles from '../../styles/players.module.css';

const Players = ({ playerInfo, stats, displayedSeason, seasons, error }) => {
    return (
        <>
            <Head>
                <title>Player Stats</title>
            </Head>

            <h2 className="page-heading">Player Stats</h2>

            {seasons?.length > 0 &&
                <aside>
                    <SeasonDropdown displayedSeason={displayedSeason} buttonText="View Stats From" listItems={seasons} />
                </aside>
            }

            <article>
                {playerInfo &&
                    <section className={styles.infoSection}>
                        <h3 className={styles.playerName}><span className={styles.textRed}>Player: </span>{playerInfo.playerName}</h3>
                        <p>
                            <small>Career Store(s): </small>
                            {playerInfo.stores.map((s, i) => (
                                <span key={s.storeId}>
                                    {i > 0 && <>, </>}
                                    <strong>{s.storeCity}</strong>
                                </span>
                            ))}
                        </p>
                    </section>
                }

                {stats &&
                    <section className={styles.statTotalsSection}>
                        <div className={styles.totalStatsGroup + ' ' + styles.seasonStatsBox}>
                            <h4 className={styles.seasonStatsHeading}>Season Stats</h4>
                            {stats.seasonStats
                                ? <PlayerStatsBlock stats={stats.seasonStats} />
                                : <ErrorMessage text="Player has no stats for the selected season." />
                            }
                        </div>
                        <div className={styles.totalStatsGroup + ' ' + styles.careerStatsBox}>
                            <h4 className={styles.careerStatsHeading}>Career Stats</h4>
                            {stats.careerStats
                                ? <PlayerStatsBlock stats={stats.careerStats} />
                                : <div>Player has no career stats.</div>
                            }
                        </div>
                    </section>
                }
            </article>

            {error && <ErrorMessage text={error.message} />}
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
        if (seasonsListResponse?.length > 0) {
            seasons = JSON.parse(JSON.stringify(seasonsListResponse)).map((season) => ({
                ...season,
                url: `/players/${params.id}?seasonId=${season.seasonId}`,
            }));
        }

        if (query?.seasonId) {
            [statsResponse] = await getCumulativeStatsForQuerySeason(params.id, query.seasonId);
            const [seasonInfoResponse] = await getSeasonDetailsById(query.seasonId);
            displayedSeason = JSON.parse(JSON.stringify(seasonInfoResponse));
        } else {
            [statsResponse] = await getCumulativeStatsForCurrentSeason(params.id);
            const [seasonInfoResponse] = await getCurrentSeasonDetails();
            displayedSeason = JSON.parse(JSON.stringify(seasonInfoResponse));
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
        }

        if (stats === null) error = { message: 'Player was not found!' };

        return { props: { playerInfo, stats, displayedSeason, seasons, error } };
    } catch (error) {
        console.error(error.message);
        return { props: { playerInfo: null, stats: null, displayedSeason: null, seasons: null, error: { message: 'An error occurred trying to fetch data!' } } };
    }
}

export default Players;
