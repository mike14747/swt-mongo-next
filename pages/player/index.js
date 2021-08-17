import Head from 'next/head';

import ErrorMessage from '../../components/ErrorMessage';

const NoPlayer = () => {
    return (
        <>
            <Head>
                <title>Player Stats</title>
            </Head>

            <h2 className="page-heading">Player Stats</h2>

            <article>
                <ErrorMessage text="No player was selected for displaying stats. You should not be navigating to this page directly." />
            </article>
        </>
    );
};

export default NoPlayer;
