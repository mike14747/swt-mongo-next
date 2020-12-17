import PropTypes from 'prop-types';
import Head from 'next/head';
import { useContext } from 'react';
import CurrentSeasonContext from '../../context/currentSeasonContext';

import PageHeading from '../../components/pageHeading';
import SeasonDropdown from '../../components/seasonDropdown';
import ErrorMessage from '../../components/errorMessage';

const Teams = ({ stats, displayedSeason, seasons, error }) => {
    const currentSeason = useContext(CurrentSeasonContext);

    return (
        <>
            <Head>
                <title>Team Stats</title>
            </Head>
            <PageHeading text="Team Stats" />
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
