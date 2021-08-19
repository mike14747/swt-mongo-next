import PropTypes from 'prop-types';
import Head from 'next/head';

import ErrorMessage from '../../components/ErrorMessage';

import styles from '../../styles/search.module.css';

const Search = ({ players, teams, slug, error }) => {
    // console.log('players:', players);
    // console.log('teams:', teams);
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

export function getServerSideProps({ params }) {
    let players = null;
    let teams = null;
    let slug = '';
    let error = null;

    return {
        props: {
            players: [params.slug],
            teams: [params.slug],
            slug: params.slug,
        },
    };
}

export default Search;
