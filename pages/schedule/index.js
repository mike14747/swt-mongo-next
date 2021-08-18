import Head from 'next/head';

import ErrorMessage from '../../components/ErrorMessage';

const NoSchedule = () => {
    return (
        <>
            <Head>
                <title>Schedule</title>
            </Head>

            <h2 className="page-heading">Schedule</h2>

            <article>
                <ErrorMessage text="No schedule was selected for displaying stats. You should not be navigating to this page directly." />
            </article>
        </>
    );
};

export default NoSchedule;
