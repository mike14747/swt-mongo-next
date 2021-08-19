import PropTypes from 'prop-types';
import Head from 'next/head';

import SeasonDropdown from '../../components/SeasonDropdown';
// import ErrorMessage from '../../components/ErrorMessage';

const Teams = ({ stats, displayedSeason, seasons, error }) => {
    return (
        <>
            <Head>
                <title>Team Stats</title>
            </Head>
            <h2 className="page-heading">Team Stats</h2>
            <div className="row mb-4">
                <div className="col-6 text-left">
                    This is the TEAMS page!
                </div>
                <div className="col-6 text-right p-2">
                    {seasons && seasons.length > 0 &&
                        <SeasonDropdown displayedSeason={displayedSeason} buttonText="View Stats From" listItems={seasons} />
                    }
                </div>
            </div>
        </>
    );
};

Teams.propTypes = {
    stats: PropTypes.object,
    displayedSeason: PropTypes.object,
    seasons: PropTypes.array,
    error: PropTypes.object,
};

export async function getServerSideProps({ params, query }) {
    let stats = null;
    let displayedSeason = null;
    let seasons = null;
    let error = null;

    try {
        return { props: { stats, displayedSeason, seasons, error } };
    } catch (error) {
        console.error(error);
        return { props: { stats: null, displayedSeason: null, seasons: null, error: { message: 'An error occurred trying to fetch data!' } } };
    }
}

export default Teams;
