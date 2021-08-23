import Head from 'next/head';

import ErrorMessage from '../../components/ErrorMessage';

const NoResults = () => {
    return (
        <>
            <Head>
                <title>Results</title>
            </Head>

            <h2 className="page-heading">Results</h2>

            <article>
                <ErrorMessage text="No season and/or store was selected for displaying results. You should not be navigating to this page directly." />
            </article>
        </>
    );
};

export default NoResults;
