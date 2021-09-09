import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';

import SeasonDropdown from '../../../../../../components/SeasonDropdown';
import ErrorMessage from '../../../../../../components/ErrorMessage';
import { getResultsSeasonsListByStore, getAllResultsList, getResultsBySeasonStoreDivision } from '../../../../../../lib/api/results';
import addResultsTeamTotals from '../../../../../../lib/addResultsTeamTotals';

import styles from '../../../../../../styles/results.module.css';
import tableStyles from '../../../../../../styles/table.module.css';

const Results = ({ currentSeasonId, storeInfo, displayedSeason, seasons, results, error }) => {
    // console.log('results:', results);
    return (
        <>
            <Head>
                <title>
                    Results
                </title>
            </Head>

            <article>
                <h2 className="page-heading">
                    Results
                </h2>

                {seasons?.length > 0 &&
                    <SeasonDropdown displayedSeason={displayedSeason} buttonText="View Results From" listItems={seasons} />
                }

                <section>
                    {storeInfo &&
                        <h3 className={styles.storeName}><span className={styles.storeText}>Store: </span>{storeInfo.storeName} ({storeInfo.divisionName})</h3>
                    }

                    {results?.length > 0 &&
                        results.map((week, index) => (
                            <div key={index} className={tableStyles.resultsWeek}>
                                <h4 className={tableStyles.weekHeading + ' ' + tableStyles.weekHeadingResults}>Week: {week.weekId} ({week.date})</h4>
                                {week.matches.map((match, index) => (
                                    <section key={index}>
                                        <h5 className={tableStyles.matchHeading}>Start time: {match.startTime}, Alley: {match.alley}</h5>

                                        <div className={tableStyles.tableWrapper}>
                                            <table className={tableStyles.table + ' ' + tableStyles.tableBordered + ' ' + tableStyles.tableHover}>
                                                {match.teams.map((team, index) => (
                                                    <tbody key={index}>
                                                        <tr className={tableStyles.resultsHeadingRow}>
                                                            <td className={tableStyles.textLeft}>
                                                                <Link href={'/team/' + team.teamId + '/season/' + currentSeasonId}>
                                                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                                    <a>{team.teamName}</a>
                                                                </Link>
                                                                <span className={styles.record}> ({team.teamTotals.wins}-{team.teamTotals.losses}-{team.teamTotals.ties})</span>
                                                            </td>
                                                            <td>1</td>
                                                            <td>2</td>
                                                            <td>3</td>
                                                            <td>4</td>
                                                            <td>5</td>
                                                            <td>6</td>
                                                            <td>7</td>
                                                            <td>8</td>
                                                            <td>9</td>
                                                            <td>10</td>
                                                            <td>TOTAL POINTS</td>
                                                        </tr>

                                                        {team.players.map((player, index) => (
                                                            <tr key={index}>
                                                                <td className={tableStyles.textLeft}>
                                                                    <Link href={'/player/' + player.playerId + '/season/' + currentSeasonId}>
                                                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                                        <a>{player.playerName}</a>
                                                                    </Link>
                                                                </td>
                                                                {player.scores.map((score, index) => (
                                                                    <td key={index}>{score}</td>
                                                                ))}
                                                                <td>{player.totalPoints}</td>
                                                            </tr>
                                                        ))}

                                                        <tr className={tableStyles.resultsHeadingRow}>
                                                            <td className={tableStyles.textLeft}>Total</td>
                                                            {team.teamTotals.gameTotals.map((score, index) => (
                                                                <td key={index}>{score}</td>
                                                            ))}
                                                            <td>
                                                                {team.teamTotals.totalPoints}
                                                            </td>
                                                        </tr>

                                                        {index === 0 &&
                                                            <tr><td colSpan="12" className="border-0"></td></tr>
                                                        }
                                                    </tbody>
                                                ))}
                                            </table>
                                        </div>

                                    </section>
                                ))}
                            </div>
                        ))
                    }
                </section>

                {error && <ErrorMessage text={error.message} />}
            </article>
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
            results = addResultsTeamTotals(resultsJSON.weeks);
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
