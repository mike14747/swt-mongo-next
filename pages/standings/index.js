import PropTypes from 'prop-types';
import Head from 'next/head';

import { getStandingsSeasonsList } from '../../lib/api/standings';

import SeasonDropdown from '../../components/SeasonDropdown';
import ErrorMessage from '../../components/ErrorMessage';

const NoStandings = ({ seasons, error }) => {
    return (
        <>
            <Head>
                <title>Standings</title>
            </Head>

            <h2 className="page-heading">Standings</h2>

            {seasons?.length > 0 &&
                <aside>
                    <SeasonDropdown displayedSeason={null} buttonText="View Standings From" listItems={seasons} />
                </aside>
            }

            {error && <ErrorMessage text={error.message} />}

            <article>
                <ErrorMessage text="No season was selected for displaying standings. You should not be navigating to this page directly." />
            </article>
        </>
    );
};

NoStandings.propTypes = {
    seasons: PropTypes.array,
    error: PropTypes.object,
};

export async function getStaticProps() {
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

        return { props: { seasons, error } };
    } catch (error) {
        console.error(error.message);
        return { props: { seasons, error: { message: 'An error occurred trying to fetch data!' } } };
    }
}

export default NoStandings;
