import PropTypes from 'prop-types';

import { getStandingsBySeasonId, getStandingsSeasonsList } from '../../lib/api/standings';

import StandingsBase from './index';

const Standings = ({ standings, displayedSeason, seasons, error }) => {
    return (
        <StandingsBase
            standings={standings}
            displayedSeason={displayedSeason}
            seasons={seasons}
            error={error}
        />
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
