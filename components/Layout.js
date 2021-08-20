import React from 'react';
import useSWR from 'swr';
import PropTypes from 'prop-types';

import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import Loading from './Loading';
import Error from './Error';

const fetcher = (url) => fetch(url).then(res => res.json());

const Layout = ({ children }) => {
    const { data: settings, error: error1 } = useSWR('/api/settings', fetcher);
    const { data: storesInNavbar, error: error2 } = useSWR('/api/stores-in-navbar', fetcher);

    if (error1 || error2) return <Error />;
    if (!settings || !storesInNavbar) return <Loading />;

    return (
        <>
            <Header />
            <Navbar currentSeasonId={settings.currentSeasonId} displaySchedule={settings.displaySchedule} storesInNavbar={storesInNavbar} />

            <main className="main-container">
                { React.cloneElement(children, { currentSeasonId: settings.currentSeasonId }) }
            </main>

            <Footer contactEmail={settings.contactEmail} />
        </>
    );
};

Layout.propTypes = {
    children: PropTypes.object,
};

export default Layout;
