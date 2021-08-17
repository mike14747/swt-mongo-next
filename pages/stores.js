import Head from 'next/head';
import PropTypes from 'prop-types';

import ErrorMessage from '../components/ErrorMessage';

const Stores = ({ stores, error }) => {
    return (
        <>
            <Head>
                <title>Stores</title>
            </Head>

            <h2 className="page-heading">
                Stores
            </h2>

            {error && <ErrorMessage text={error.message} />}

            {stores}
        </>
    );
};

Stores.propTypes = {
    stores: PropTypes.araay,
    error: PropTypes.object,
};

export async function getStaticProps() {

}

export default Stores;
