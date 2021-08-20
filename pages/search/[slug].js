import PropTypes from 'prop-types';
import Head from 'next/head';

import { searchPlayers, searchTeams } from '../../lib/api/search';
import ErrorMessage from '../../components/ErrorMessage';

import styles from '../../styles/search.module.css';

const Search = ({ players, teams, slug, error }) => {
    console.log('players:', players);
    console.log('teams:', teams);
    return (
        <>
            <Head>
                <title>Player/Team Search</title>
            </Head>

            <h2 className="page-heading">Player/Team Search</h2>

            <article>
                <section>
                    Player results for: {slug}
                </section>

                <section>
                    Team results for: {slug}
                </section>
            </article>

            {error && <ErrorMessage text={error.message} />}
        </>
    );
};

Search.propTypes = {
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
