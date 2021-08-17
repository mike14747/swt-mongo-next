import PropTypes from 'prop-types';
import Head from 'next/head';

import { getStandingsBySeasonId, getStandingsSeasonsList } from '../../lib/api/standings';

import StandingsTables from '../../components/StandingsTables';
import SeasonDropdown from '../../components/SeasonDropdown';
import ErrorMessage from '../../components/ErrorMessage';

const Standings = ({ standings, displayedSeason, seasons, error }) => {
    return (
        <>
            <Head>
                <title>Standings</title>
            </Head>

            <h2 className="page-heading">Standings</h2>

            {seasons?.length > 0 &&
                <aside>
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

export async function getStaticProps(context) {
    let standings = null;
    let displayedSeason = null;
    let seasons = null;
    let error = null;

    try {
        const seasonsListResponse = await getStandingsSeasonsList();
        if (seasonsListResponse?.length > 0) {
            seasons = JSON.parse(JSON.stringify(seasonsListResponse)).map((season) => ({
                ...season,
                url: '/standings/' + season.seasonId,
            }));
        }

        const [standingsResponse] = await getStandingsBySeasonId(context.params.id);
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

export async function getStaticPaths() {
    const seasonsListResponse = await getStandingsSeasonsList();
    const seasonsListJSON = JSON.parse(JSON.stringify(seasonsListResponse)) || [];
    const paths = seasonsListJSON.map(season => {
        return {
            params: { id: season.seasonId.toString() },
        };
    });

    return {
        paths,
        fallback: false,
    };
}

export default Standings;
