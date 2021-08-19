import PropTypes from 'prop-types';
import Head from 'next/head';

import { getPlayerSeasonsList, getPlayerInfo } from '../../../lib/api/player';

import SeasonDropdown from '../../../components/SeasonDropdown';
import ErrorMessage from '../../../components/ErrorMessage';

import styles from '../../../styles/player.module.css';

const Player = ({ playerInfo, seasons, error }) => {
    return (
        <>
            <Head>
                <title>Player Stats</title>
            </Head>

            <h2 className="page-heading">Player Stats</h2>

            {seasons?.length > 0 &&
                <aside>
                    <SeasonDropdown displayedSeason={null} buttonText="View Stats From" listItems={seasons} />
                </aside>
            }

            <article>
                {playerInfo &&
                    <section className={styles.infoSection}>
                        <h3 className={styles.playerName}><span className={styles.playerText}>Player: </span>{playerInfo.playerName}</h3>
                        <p>
                            <small>Career Store(s): </small>
                            {playerInfo.stores?.map((s, i) => (
                                <span key={s.storeId}>
                                    {i > 0 && <>, </>}
                                    <strong>{s.storeCity}</strong>
                                </span>
                            ))}
                        </p>
                    </section>
                }
            </article>

            {error && <ErrorMessage text={error.message} />}

            <article>
                <ErrorMessage text="No season was selected for displaying stats. You should not be navigating to this page directly." />
            </article>
        </>
    );
};

Player.propTypes = {
    playerInfo: PropTypes.object,
    seasons: PropTypes.array,
    error: PropTypes.object,
};

export async function getServerSideProps({ params }) {
    let playerInfo = null;
    let seasons = null;
    let error = null;

    try {
        const seasonsListResponse = await getPlayerSeasonsList(params.playerId);
        if (seasonsListResponse?.length > 0) {
            seasons = JSON.parse(JSON.stringify(seasonsListResponse)).map((season) => ({
                ...season,
                url: `/player/${params.playerId}/season/${season.seasonId}`,
            }));
        }

        const [playerInfoResponse] = await getPlayerInfo(params.playerId);
        if (playerInfoResponse) playerInfo = JSON.parse(JSON.stringify(playerInfoResponse));

        return { props: { playerInfo, seasons, error } };
    } catch (error) {
        console.error(error.message);
        return { props: { playerInfo: null, seasons: null, error: { message: 'An error occurred trying to fetch data!' } } };
    }
}

export default Player;
