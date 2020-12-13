import PropTypes from 'prop-types';
import Head from 'next/head';

import { getStandingsBySeasonId, getStandingsSeasonsList } from '../lib/api/standings';

import PageHeading from '../components/pageHeading';
import StandingsTables from '../components/standingsTables/standingsTables';
import SeasonDropdown from '../components/seasonDropdown';

const Standings = ({ standings, displayedSeason, seasons, error }) => {
    return (
        <>
            <Head>
                <title>Standings</title>
            </Head>
            <PageHeading text="Standings" />
            <div className="row mb-4">
                <div className="col-12 text-right p-2">
                    {seasons && seasons.length > 0 &&
                        <SeasonDropdown displayedSeason={displayedSeason} buttonText="View Standings From" listItems={seasons} />
                    }
                </div>
            </div>
            {standings && standings.stores && standings.stores.length > 0
                ? <StandingsTables storesArr={standings.stores} />
                : standings
                    ? <div className="empty-result">There are no standings for the selected season.</div>
                    : error && <h4 className="text-danger text-center mt-4">{error.message}</h4>
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
    try {
        let standings = null;
        let displayedSeason = null;
        let seasons = null;
        let error = null;

        const seasonsListResponse = await getStandingsSeasonsList();
        if (seasonsListResponse && seasonsListResponse.length > 0) {
            seasons = JSON.parse(JSON.stringify(seasonsListResponse)).map((season) => ({
                ...season,
                url: '/standings?seasonId=' + season.seasonId,
            }));
        }

        if (!query || !query.seasonId) {
            error = { message: 'No season was selected for standings!' };
        } else {
            const [standingsResponse] = await getStandingsBySeasonId(query.seasonId);
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
        }

        return { props: { standings, displayedSeason, seasons, error } };
    } catch (error) {
        console.error(error.message);
        return { props: { standings: null, displayedSeason: null, seasons: null, error: { message: 'An error occurred trying to fetch data!' } } };
    }
}

export default Standings;
