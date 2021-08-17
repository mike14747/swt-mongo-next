import Head from 'next/head';
import PropTypes from 'prop-types';

import ErrorMessage from '../components/ErrorMessage';
import { getActiveStores } from '../lib/api/stores';

import styles from '../styles/stores.module.css';

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

            {stores?.length === 0 &&
                <article>
                    <p>There are no stores to display. Check back again soon.</p>
                </article>
            }

            {stores?.length > 0 &&
                <article className={styles.storesArticle}>
                    {stores.map(store => (
                        <section key={store.storeId} className={styles.store}>
                            <h3 className={styles.storeName}>{store.name}</h3>
                            <p>{store.address}</p>
                            <p>{store.city}, {store.state} {store.zip}</p>
                            <p>{store.phone}</p>
                            <p>{store.mapUrl}</p>
                        </section>
                    ))}
                </article>

            }
        </>
    );
};

Stores.propTypes = {
    stores: PropTypes.araay,
    error: PropTypes.object,
};

export async function getStaticProps() {
    let stores = null;
    let error = null;

    try {
        const storesResponse = await getActiveStores();
        if (storesResponse?.length > 0) stores = JSON.parse(JSON.stringify(storesResponse));
        // console.log(stores);

        return { props: { stores, error } };
    } catch (error) {
        console.error(error.message);
        return { props: { stores, error: { message: 'An error occurred trying to fetch data!' } } };
    }

}

export default Stores;
