import PropTypes from 'prop-types';
import Head from 'next/head';

import { getStandingsBySeasonId, getStandingsSeasonsList } from '../lib/api/standings';
import { getCurrentSeasonId } from '../lib/api/settings';

import PageHeading from '../components/PageHeading';
import StandingsTables from '../components/StandingsTables';
import SeasonDropdown from '../components/SeasonDropdown';
import ErrorMessage from '../components/ErrorMessage';

import styles from '../styles/Standings.module.css';

const Standings = ({ standings, displayedSeason, seasons, error }) => {
    return (
        <>
            <Head>
                <title>Standings</title>
            </Head>

            <PageHeading text="Standings" />

            {seasons?.length > 0 &&
                <aside className={styles.seasonList}>
                    <SeasonDropdown displayedSeason={displayedSeason} buttonText="View Standings From" listItems={seasons} />
                </aside>
            }

            {error && <ErrorMessage text={error.message} />}

            {standings?.stores?.length > 0 &&
                <StandingsTables storesArr={standings.stores} />
            }
        </>
    );
};

Standings.propTypes = {
    standings: PropTypes.object,
    displayedSeason: PropTypes.object,
    seasons: PropTypes.array,
    error: PropTypes.object,
};

export async function getServerSideProps({ query }) {
    let seasonId = 0;
    let standings = null;
    let displayedSeason = null;
    let seasons = null;
    let error = null;

    try {
        const seasonsListResponse = await getStandingsSeasonsList();
        if (seasonsListResponse?.length > 0) {
            seasons = JSON.parse(JSON.stringify(seasonsListResponse)).map((season) => ({
                ...season,
                url: '/standings?seasonId=' + season.seasonId,
            }));
        }

        if (query?.seasonId) {
            seasonId = query.seasonId;
        } else {
            const seasonIdResponse = await getCurrentSeasonId();
            if (seasonIdResponse) {
                seasonId = JSON.parse(JSON.stringify(seasonIdResponse.currentSeasonId));
            }
        }

        const [standingsResponse] = await getStandingsBySeasonId(seasonId);
        if (standingsResponse) {
            standings = JSON.parse(JSON.stringify(standingsResponse));
            displayedSeason = {
                seasonId: standingsResponse.seasonId,
                seasonName: standingsResponse.seasonName,
                year: standingsResponse.year,
            };
        } else {
            error = { message: 'No standings are available for the selected season!' };
        }

        return { props: { standings, displayedSeason, seasons, error } };
    } catch (error) {
        console.error(error.message);
        return { props: { standings, displayedSeason, seasons, error: { message: 'An error occurred trying to fetch data!' } } };
    }
}

export default Standings;
