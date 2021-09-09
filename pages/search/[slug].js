import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';

import { searchPlayers, searchTeams } from '../../lib/api/search';
import ErrorMessage from '../../components/ErrorMessage';

import styles from '../../styles/search.module.css';

const Search = ({ currentSeasonId, players, teams, slug, error }) => {
    // console.log('players:', players);
    // console.log('teams:', teams);
    return (
        <>
            <Head>
                <title>Player/Team Search</title>
            </Head>

            <article>
                <h2 className="page-heading no-season-dropdown">Player/Team Search</h2>

                {slug &&
                    <h3 className={styles.searchResultsHeading}>Search results for: <span className={styles.slug}>{slug}</span></h3>
                }

                <div className={styles.searchContainer}>
                    <section className={styles.searchSection}>
                        <h4 className={styles.groupHeading}><strong>Player Matches:</strong> {players?.length ? players.length : 0}</h4>
                        {players?.map(player => (
                            <p key={player.playerId}>
                                <Link href={'/player/' + player.playerId + '/season/' + currentSeasonId}>
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a>
                                        {player.playerName}
                                    </a>
                                </Link>
                                <span> ({player.stores.map((s, i) => (
                                    <span key={s.storeId}>
                                        {i > 0 && <>, </>}
                                        {s.storeCity}
                                    </span>
                                ))})</span>
                            </p>
                        ))}
                    </section>

                    <section className={styles.searchSection}>
                        <h4 className={styles.groupHeading}><strong>Team Matches:</strong> {teams?.length ? teams.length : 0}</h4>
                        {teams?.map(team => (
                            <p key={team.teamId}>
                                <Link href={'/team/' + team.teamId + '/season/' + currentSeasonId}>
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a>
                                        {team.teamName}
                                    </a>
                                </Link>
                                <span> ({team.stores.map((s, i) => (
                                    <span key={s.storeId}>
                                        {i > 0 && <>, </>}
                                        {s.storeCity}
                                    </span>
                                ))})</span>
                            </p>
                        ))}
                    </section>
                </div>

                {error && <ErrorMessage text={error.message} />}
            </article>
        </>
    );
};

Search.propTypes = {
    currentSeasonId: PropTypes.number,
    players: PropTypes.array,
    teams: PropTypes.array,
    slug: PropTypes.string,
    error: PropTypes.object,
};

export async function getServerSideProps({ params }) {
    let players = null;
    let teams = null;
    const slug = params.slug;
    let error = null;

    try {
        const playerResponse = await searchPlayers(slug);
        if (playerResponse) players = JSON.parse(JSON.stringify(playerResponse));

        const teamResponse = await searchTeams(slug);
        if (teamResponse) teams = JSON.parse(JSON.stringify(teamResponse));

        return { props: { players, teams, slug, error } };
    } catch (error) {
        console.error(error.message);
        return { props: { players: null, teams: null, slug, error: { message: 'An error occurred trying to fetch data!' } } };
    }
}

export default Search;
