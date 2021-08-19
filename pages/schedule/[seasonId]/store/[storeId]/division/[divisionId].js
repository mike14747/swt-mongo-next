import PropTypes from 'prop-types';
import Head from 'next/head';

import SeasonDropdown from '../../../../../../components/SeasonDropdown';
import ScheduleTable from '../../../../../../components/scheduleTable';
import ErrorMessage from '../../../../../../components/ErrorMessage';
import { getScheduleSeasonsListByStore, getAllSchedulesList, getScheduleBySeasonStoreDivision } from '../../../../../../lib/api/schedules';

import styles from '../../../../../../styles/schedule.module.css';

const Schedules = ({ currentSeasonId, storeInfo, displayedSeason, seasons, schedule, error }) => {
    // console.log(schedule);
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

            {seasons?.length > 0 &&
                <aside>
                    <SeasonDropdown displayedSeason={displayedSeason} buttonText="View Standings From" listItems={seasons} />
                </aside>
            }

            <article>
                {storeInfo &&
                    <section className={styles.infoSection}>
                        <h3 className={styles.storeName}><span className={styles.storeText}>Store: </span>{storeInfo.storeName} ({storeInfo.divisionName})</h3>
                    </section>
                }

                {schedule?.length > 0 &&
                    <ScheduleTable currentSeasonId={currentSeasonId} schedule={schedule} />
                }
            </article>

            {error && <ErrorMessage text={error.message} />}
        </>
    );
};

Schedules.propTypes = {
    storeInfo: PropTypes.object,
    displayedSeason: PropTypes.object,
    seasons: PropTypes.array,
    schedule: PropTypes.array,
    error: PropTypes.object,
};

export async function getStaticProps({ params }) {
    let storeInfo = null;
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
            const scheduleJSON = JSON.parse(JSON.stringify(scheduleResponse));
            storeInfo = {
                storeName: scheduleJSON.storeCity,
                divisionName: scheduleJSON.divisionName,
            };
            displayedSeason = {
                seasonId: scheduleJSON.seasonId,
                seasonName: scheduleJSON.seasonName,
                year: scheduleJSON.year,
            };
            schedule = scheduleJSON.weeks;
        }

        return { props: { storeInfo, displayedSeason, seasons, schedule, error } };
    } catch (error) {
        console.error(error.message);
        return { props: { storeInfo, displayedSeason, seasons, schedule, error: { message: 'An error occurred trying to fetch data!' } } };
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
