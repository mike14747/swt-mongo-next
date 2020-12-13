import PropTypes from 'prop-types';
import Head from 'next/head';

import { getStandingsBySeasonId } from '../lib/api/standings';

import PageHeading from '../components/pageHeading';
import StandingsTables from '../components/standingsTables/standingsTables';

const Standings = ({ standings, error }) => {
    return (
        <>
            <Head>
                <title>Standings</title>
            </Head>
            <PageHeading text="Standings" />
            {standings && standings.stores && standings.stores.length > 0
                ? <StandingsTables storesArr={standings.stores} />
                : standings
                    ? <div className="empty-result">There are no standings for the selected season.</div>
                    : error && <h4 className="text-danger text-center mt-4">{error.message}</h4>
            }
        </>
    );
};

Standings.propTypes = {
    standings: PropTypes.object,
    error: PropTypes.object,
};

export async function getServerSideProps({ query }) {
    if (!query || !query.seasonId) return { props: { standings: null, error: { message: 'No season was selected for standings!' } } };

    try {
        const standingsResponse = await getStandingsBySeasonId(query.seasonId);
        return standingsResponse && standingsResponse.length > 0 ? { props: { standings: JSON.parse(JSON.stringify(standingsResponse[0])), error: null } } : { props: { standings: null, error: { message: 'No standings are available for the selected season!' } } };
    } catch (error) {
        console.error(error.message);
        return { props: { standings: null, error: { message: 'An error occurred trying to fetch data!' } } };
    }
}

export default Standings;
