import PropTypes from 'prop-types';
import Head from 'next/head';

import { getTeamSeasonsListAndInfo } from '../../../lib/api/team';

import SeasonDropdown from '../../../components/SeasonDropdown';
import ErrorMessage from '../../../components/ErrorMessage';

import styles from '../../../styles/team.module.css';

const Team = ({ teamInfo, seasons, error }) => {
    return (
        <>
            <Head>
                <title>Team Stats</title>
            </Head>

            <article>
                <h2 className="page-heading">Team Stats</h2>

                {seasons?.length > 0 &&
                    <SeasonDropdown displayedSeason={null} buttonText="View Stats From" listItems={seasons} />
                }

                {teamInfo &&
                    <section className={styles.infoSection}>
                        <h3 className={styles.teamName}><span className={styles.teamText}>Team: </span>{teamInfo.teamName}</h3>
                        <p>
                            <small>Career Store(s): </small>
                            {teamInfo.stores?.map((s, i) => (
                                <span key={s.storeId}>
                                    {i > 0 && <>, </>}
                                    <strong>{s.storeCity}</strong>
                                </span>
                            ))}
                        </p>
                    </section>
                }

                {error && <ErrorMessage text={error.message} />}

                <ErrorMessage text="No season was selected for displaying stats. You should not be navigating to this page directly." />
            </article>
        </>
    );
};

Team.propTypes = {
    teamInfo: PropTypes.object,
    seasons: PropTypes.array,
    error: PropTypes.object,
};

export async function getServerSideProps({ params }) {
    let teamInfo = null;
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

        return { props: { teamInfo, seasons, error } };
    } catch (error) {
        console.error(error.message);
        return { props: { teamInfo: null, seasons: null, error: { message: 'An error occurred trying to fetch data!' } } };
    }
}

export default Team;
