import PropTypes from 'prop-types';
import Head from 'next/head';

import { getPlayerSeasonsList } from '../../lib/api/players';

import PageHeading from '../../components/pageHeading';
import SeasonDropdown from '../../components/seasonDropdown';

const Players = ({ seasonStats, careerStats, displayedSeason, seasons, error }) => {
    return (
        <>
            <Head>
                <title>Player Stats</title>
            </Head>
            <PageHeading text="Player Stats" />
            <div className="row mb-4">
                <div className="col-12 text-right p-2">
                    {seasons && seasons.length > 0 &&
                        <SeasonDropdown displayedSeason={displayedSeason} buttonText="View Standings From" listItems={seasons} />
                    }
                </div>
            </div>
            {/* {standings && standings.stores && standings.stores.length > 0
                ? <StandingsTables storesArr={standings.stores} />
                : standings
                    ? <div className="empty-result">There are no standings for the selected season.</div>
                    : error && <h4 className="text-danger text-center mt-4">{error.message}</h4>
            } */}
        </>
    );
};

Players.propTypes = {
    seasonStats: PropTypes.object,
    careerStats: PropTypes.object,
    displayedSeason: PropTypes.object,
    seasons: PropTypes.array,
    error: PropTypes.object,
};

export async function getServerSideProps({ params, query }) {
    try {
        let seasonStats = null;
        let careerStats = null;
        let displayedSeason = null;
        let seasons = null;
        let error = null;

        const seasonsListResponse = await getPlayerSeasonsList(params.id);
        if (seasonsListResponse && seasonsListResponse.length > 0) {
            seasons = JSON.parse(JSON.stringify(seasonsListResponse)).map((season) => ({
                ...season,
                url: `/players/${params.id}?seasonId=${season.seasonId}`,
            }));
        }

        // if (!query || !query.seasonId) {
        //     error = { message: 'No season was selected!' };
        // } else {
        //     const [standingsResponse] = await getStandingsBySeasonId(query.seasonId);
        //     if (standingsResponse) {
        //         standings = JSON.parse(JSON.stringify(standingsResponse));
        //         displayedSeason = {
        //             seasonId: standingsResponse.seasonId,
        //             seasonName: standingsResponse.seasonName,
        //             year: standingsResponse.year,
        //         };
        //     } else {
        //         error = { message: 'No standings are available for the selected season!' };
        //     }
        // }

        return { props: { seasonStats, careerStats, displayedSeason, seasons, error } };
    } catch (error) {
        console.error(error.message);
        return { props: { seasonStats: null, careerStats: null, displayedSeason: null, seasons: null, error: { message: 'An error occurred trying to fetch data!' } } };
    }
}

export default Players;
