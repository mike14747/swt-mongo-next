import PropTypes from 'prop-types';
import Head from 'next/head';

import SeasonDropdown from '../../../../../../components/SeasonDropdown';
import ErrorMessage from '../../../../../../components/ErrorMessage';
import { getResultsSeasonsListByStore, getAllResultsList, getResultsBySeasonStoreDivision } from '../../../../../../lib/api/results';

import styles from '../../../../../../styles/results.module.css';

const Results = ({ currentSeasonId, storeInfo, displayedSeason, seasons, results, error }) => {
    console.log('results:', results);
    return (
        <>
            <Head>
                <title>
                    Results
                </title>
            </Head>

            <h2 className="page-heading">
                Results
            </h2>

            {seasons?.length > 0 &&
                <aside>
                    <SeasonDropdown displayedSeason={displayedSeason} buttonText="View Results From" listItems={seasons} />
                </aside>
            }

            <article>
                {storeInfo &&
                    <section className={styles.infoSection}>
                        <h3 className={styles.storeName}><span className={styles.storeText}>Store: </span>{storeInfo.storeName} ({storeInfo.divisionName})</h3>
                    </section>
                }
            </article>

            {error && <ErrorMessage text={error.message} />}
        </>
    );
};

Results.propTypes = {
    currentSeasonId: PropTypes.number,
    storeInfo: PropTypes.object,
    displayedSeason: PropTypes.object,
    seasons: PropTypes.array,
    results: PropTypes.array,
    error: PropTypes.object,
};

export async function getStaticProps({ params }) {
    let storeInfo = null;
    let seasons = null;
    let displayedSeason = null;
    let results = null;
    let error = null;

    try {
        const seasonsListResponse = await getResultsSeasonsListByStore(params.storeId, params.divisionId);
        if (seasonsListResponse?.length > 0) {
            seasons = JSON.parse(JSON.stringify(seasonsListResponse)).map((season) => ({
                ...season,
                url: '/results/' + season.seasonId + '/store/' + season.storeId + '/division/' + season.divisionId,
            }));
        }

        const [resultsResponse] = await getResultsBySeasonStoreDivision(params.seasonId, params.storeId, params.divisionId);
        if (resultsResponse) {
            const resultsJSON = JSON.parse(JSON.stringify(resultsResponse));
            storeInfo = {
                storeName: resultsJSON.storeCity,
                divisionName: resultsJSON.divisionName,
            };
            displayedSeason = {
                seasonId: resultsJSON.seasonId,
                seasonName: resultsJSON.seasonName,
                year: resultsJSON.year,
            };
            results = resultsJSON.weeks;
        }

        return { props: { storeInfo, displayedSeason, seasons, results, error } };
    } catch (error) {
        console.error(error.message);
        return { props: { storeInfo, displayedSeason, seasons, results, error: { message: 'An error occurred trying to fetch data!' } } };
    }
}

export async function getStaticPaths() {
    const resultsListResponse = await getAllResultsList();
    const resultsList = JSON.parse(JSON.stringify(resultsListResponse)) || [];
    const paths = resultsList.map(path => {
        return {
            params: { seasonId: path.seasonId.toString(), storeId: path.storeId.toString(), divisionId: path.divisionId.toString() },
        };
    });

    return {
        paths,
        fallback: false,
    };
}

export default Results;
