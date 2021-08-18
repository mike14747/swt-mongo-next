import PropTypes from 'prop-types';
import Head from 'next/head';

import { getAllSchedulesList, getScheduleBySeasonStoreDivision } from '../../../../../../lib/api/schedules';

const Schedules = ({ schedule, error }) => {
    return (
        <>
            <Head>
                <title>
                    Schedule
                </title>
            </Head>

            <h2 className="page-heading">
                Schedule
            </h2>

            <p>This is the very nested schedule route!</p>
        </>
    );
};

Schedules.propTypes = {
    stores: PropTypes.array,
    error: PropTypes.object,
};

export async function getStaticProps({ params }) {
    let schedule = null;
    let error = null;

    try {
        const scheduleResponse = await getScheduleBySeasonStoreDivision(params.seasonId, params.storeId, params.divisionId);
        if (scheduleResponse?.length === 1) schedule = JSON.parse(JSON.stringify(scheduleResponse));

        return { props: { schedule, error } };
    } catch (error) {
        console.error(error.message);
        return { props: { schedule, error: { message: 'An error occurred trying to fetch data!' } } };
    }
}

export async function getStaticPaths() {
    const scheduleListResponse = await getAllSchedulesList();
    const scheduleList = JSON.parse(JSON.stringify(scheduleListResponse)) || [];
    const paths = scheduleList.map(path => {
        return {
            params: { seasonId: path.seasonId.toString(), storeId: path.storeId.toString(), divisionId: path.divisionId.toString() },
        };
    });

    return {
        paths,
        fallback: false,
    };
}

export default Schedules;
