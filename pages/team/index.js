import Head from 'next/head';

import ErrorMessage from '../../components/ErrorMessage';

const NoTeam = () => {
    return (
        <>
            <Head>
                <title>Team Stats</title>
            </Head>

            <h2 className="page-heading">Team Stats</h2>

            <article>
                <ErrorMessage text="No team was selected for displaying stats. You should not be navigating to this page directly." />
            </article>
        </>
    );
};

export default NoTeam;
