import PropTypes from 'prop-types';
import Head from 'next/head';

import { getNavbarStores } from '../lib/api/schedules';

const Schedules = ({ stores, error }) => {
    // console.log(stores);
    return (
        <>
            <Head>
                Schedule
            </Head>
            <h2 className="page-heading">
                Schedule
            </h2>
        </>
    );
};

Schedules.propTypes = {
    stores: PropTypes.array,
    error: PropTypes.object,
};

export async function getStaticProps() {
    let stores = null;
    let error = null;

    try {
        const storesResponse = await getNavbarStores(24);
        if (storesResponse?.length > 0) stores = JSON.parse(JSON.stringify(storesResponse));

        return { props: { stores, error } };
    } catch (error) {
        console.error(error.message);
        return { props: { stores, error: { message: 'An error occurred trying to fetch data!' } } };
    }
}

export default Schedules;
