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

            <article>
                <h2 className="page-heading no-season-dropdown">
                    Stores
                </h2>

                {error && <ErrorMessage text={error.message} />}

                {stores?.length === 0 &&
                    <p>There are no stores to display. Check back again soon.</p>
                }

                {stores?.length > 0 &&
                    <div className={styles.storesDiv}>
                        {stores.map(store => (
                            <section key={store.storeId} className={styles.card}>
                                <h3 className={styles.heading}>
                                    {store.name}
                                </h3>
                                <div className={styles.body}>
                                    <address>
                                        <p>
                                            {store.address}
                                        </p>
                                        <p>
                                            {store.city}, {store.state} {store.zip}
                                        </p>
                                        <p>
                                            {store.phone}
                                        </p>
                                    </address>

                                    {store.mapUrl &&
                                        <p className={styles.map}>
                                            <a href={store.mapUrl} target="_blank" rel="noreferrer">
                                                MAP IT!
                                                <img src="/images/non-news/google-maps.png" alt={'Map to ' + store.name} className={styles.mapIcon} />
                                            </a>
                                        </p>
                                    }

                                </div>
                            </section>
                        ))}
                    </div>
                }
            </article>


        </>
    );
};

Stores.propTypes = {
    stores: PropTypes.array,
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
