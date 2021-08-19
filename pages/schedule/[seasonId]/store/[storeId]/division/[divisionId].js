import PropTypes from 'prop-types';
import Head from 'next/head';

import SeasonDropdown from '../../../../../../components/SeasonDropdown';
import ErrorMessage from '../../../../../../components/ErrorMessage';
import { getScheduleSeasonsListByStore, getAllSchedulesList, getScheduleBySeasonStoreDivision } from '../../../../../../lib/api/schedules';

const Schedules = ({ displayedSeason, seasons, schedule, error }) => {
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

            {seasons?.length > 0 &&
                <aside>
                    <SeasonDropdown displayedSeason={displayedSeason} buttonText="View Standings From" listItems={seasons} />
                </aside>
            }

            {error && <ErrorMessage text={error.message} />}
        </>
    );
};

Schedules.propTypes = {
    seasons: PropTypes.array,
    displayedSeason: PropTypes.object,
    stores: PropTypes.array,
    error: PropTypes.object,
};

export async function getStaticProps({ params }) {
    let seasons = null;
    let displayedSeason = null;
    let schedule = null;
    let error = null;

    try {
        const seasonsListResponse = await getScheduleSeasonsListByStore(params.storeId, params.divisionId);
        if (seasonsListResponse?.length > 0) {
            seasons = JSON.parse(JSON.stringify(seasonsListResponse)).map((season) => ({
                ...season,
                url: '/schedule/' + season.seasonId + '/store/' + season.storeId + '/division/' + season.divisionId,
            }));
        }

        const [scheduleResponse] = await getScheduleBySeasonStoreDivision(params.seasonId, params.storeId, params.divisionId);
        if (scheduleResponse) {
            schedule = JSON.parse(JSON.stringify(scheduleResponse));
            displayedSeason = {
                seasonId: schedule.seasonId,
                seasonName: schedule.seasonName,
                year: schedule.year,
            };
        }

        return { props: { displayedSeason, seasons, schedule, error } };
    } catch (error) {
        console.error(error.message);
        return { props: { displayedSeason, seasons, schedule, error: { message: 'An error occurred trying to fetch data!' } } };
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
