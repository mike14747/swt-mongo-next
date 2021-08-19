import Head from 'next/head';

import ErrorMessage from '../../components/ErrorMessage';

const NoSearch = () => {
    return (
        <>
            <Head>
                <title>Player/Team Search</title>
            </Head>

            <h2 className="page-heading">Player/Team Search</h2>

            <article>
                <ErrorMessage text="No search criteria was provided. You should not be navigating to this page directly." />
            </article>
        </>
    );
};

export default NoSearch;
