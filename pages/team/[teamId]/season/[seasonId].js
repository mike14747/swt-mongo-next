import PropTypes from 'prop-types';
import Head from 'next/head';

import { getTeamSeasonsListAndInfo, getCumulativeStatsForQuerySeason } from '../../../../lib/api/team';
import { getSeasonDetailsById } from '../../../../lib/api/seasons';

import SeasonDropdown from '../../../../components/SeasonDropdown';
import TeamStatsBlock from '../../../../components/TeamStatsBlock';
import ErrorMessage from '../../../../components/ErrorMessage';

import styles from '../../../../styles/team.module.css';

const Team = ({ teamInfo, stats, displayedSeason, seasons, error }) => {
    return (
        <>
            <Head>
                <title>Team Stats</title>
            </Head>

            <h2 className="page-heading">Team Stats</h2>

            {seasons?.length > 0 &&
                <aside>
                    <SeasonDropdown displayedSeason={displayedSeason} buttonText="View Stats From" listItems={seasons} />
                </aside>
            }

            <article>
                {teamInfo &&
                    <section className={styles.infoSection}>
                        <h3 className={styles.teamName}><span className={styles.teamText}>Team: </span>{teamInfo.teamName}</h3>
                        <p>
                            <small>Store(s): </small>
                            {teamInfo.stores.map((s, i) => (
                                <span key={s.storeId}>
                                    {i > 0 && <>, </>}
                                    <strong>{s.storeCity}</strong>
                                </span>
                            ))}
                        </p>
                    </section>
                }

                {stats
                    ? <section className={styles.statTotalsSection}>
                        <div className={styles.totalStatsGroup + ' ' + styles.seasonStatsBox}>
                            <h4 className={styles.seasonStatsHeading}>Season Stats</h4>
                            {stats.seasons[0]
                                ? <TeamStatsBlock stats={stats.seasons[0]} />
                                : <ErrorMessage text="Team has no stats for the selected season." />
                            }
                        </div>
                        {/* <div className={styles.totalStatsGroup + ' ' + styles.careerStatsBox}>
                            <h4 className={styles.careerStatsHeading}>Players</h4>
                            <p>Players on this team will have their games and avg scores listed here eventually.</p>
                        </div> */}
                    </section>
                    : <ErrorMessage text="Team has no stats for the selected season." />
                }
            </article>

            {error && <ErrorMessage text={error.message} />}
        </>
    );
};

Team.propTypes = {
    teamInfo: PropTypes.object,
    stats: PropTypes.object,
    displayedSeason: PropTypes.object,
    seasons: PropTypes.array,
    error: PropTypes.object,
};

export async function getServerSideProps({ params }) {
    let teamInfo = null;
    let stats = null;
    let displayedSeason = null;
    let seasons = null;
    let error = null;

    try {
        const [seasonsListAndInfoResponse] = await getTeamSeasonsListAndInfo(params.teamId);
        if (seasonsListAndInfoResponse) {
            const listAndInfoJSON = JSON.parse(JSON.stringify(seasonsListAndInfoResponse));
            seasons = listAndInfoJSON?.seasons?.map((season) => ({
                ...season,
                url: `/team/${params.teamId}/season/${season.seasonId}`,
            })).reverse();
            teamInfo = {
                teamId: listAndInfoJSON?.teamId,
                teamName: listAndInfoJSON?.teamName,
                stores: listAndInfoJSON?.stores,
            };
        }

        const [seasonInfoResponse] = await getSeasonDetailsById(params.seasonId);
        if (seasonInfoResponse) displayedSeason = JSON.parse(JSON.stringify(seasonInfoResponse));

        const [statsResponse] = await getCumulativeStatsForQuerySeason(params.teamId, params.seasonId);
        if (statsResponse) stats = JSON.parse(JSON.stringify(statsResponse));

        if (seasons === null) error = { message: 'Team was not found!' };

        return { props: { teamInfo, stats, displayedSeason, seasons, error } };
    } catch (error) {
        console.error(error.message);
        return { props: { teamInfo: null, stats: null, displayedSeason: null, seasons: null, error: { message: 'An error occurred trying to fetch data!' } } };
    }
}

export default Team;
