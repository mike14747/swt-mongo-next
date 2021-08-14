import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { useState } from 'react';
import Router from 'next/router';
import getBaseUrl from '../lib/getBaseUrl';

import SettingsContext from '../context/settingsContext';
import HeaderContext from '../context/headerContext';
import CurrentSeasonContext from '../context/currentSeasonContext';

import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// import '../styles/my_style.css';
// import '../styles/app_style.css';
import '../styles/globals.css';

function MyApp({ settings, currentSeason, headerTextbox, storesInNavbar, error, Component, pageProps }) {
    const [loading, setLoading] = useState(false);

    Router.onRouteChangeStart = () => setLoading(true);
    Router.onRouteChangeComplete = () => setLoading(false);
    Router.onRouteChangeError = () => setLoading(false);

    return (
        <>
            <SettingsContext.Provider value={settings}>
                <CurrentSeasonContext.Provider value={currentSeason}>
                    <HeaderContext.Provider value={headerTextbox}>
                        <Header />
                    </HeaderContext.Provider>
                    <Navbar />
                    <main className="main-container">{loading ? <Loading /> : <Component {...pageProps} />}</main>
                    <Footer />
                </CurrentSeasonContext.Provider>
            </SettingsContext.Provider>
        </>
    );
}

MyApp.propTypes = {
    settings: PropTypes.object,
    currentSeason: PropTypes.object,
    headerTextbox: PropTypes.object,
    storesInNavbar: PropTypes.array,
    error: PropTypes.object,
    Component: PropTypes.func,
    pageProps: PropTypes.any,
};

export default MyApp;

MyApp.getInitialProps = async (context) => {
    const baseUrl = getBaseUrl(context.ctx.req);

    let settings = null;
    let currentSeason = null;
    let headerTextbox = null;
    let storesInNavbar = null;
    let error = null;
    const errorMessage = 'An error occurred trying to fetch data!';

    try {
        const settingsResponse = await fetch(`${baseUrl}/api/settings`);
        if (settingsResponse.ok) {
            settings = await settingsResponse.json();
        } else {
            error = { message: errorMessage };
        }

        const currentSeasonResponse = await fetch(`${baseUrl}/api/current-season`);
        if (currentSeasonResponse.ok) {
            [currentSeason] = await currentSeasonResponse.json();
        } else {
            error = { message: errorMessage };
        }

        const textboxResponse = await fetch(`${baseUrl}/api/textbox`);
        if (textboxResponse.ok) {
            headerTextbox = await textboxResponse.json();
        } else {
            error = { message: errorMessage };
        }

        return { settings, currentSeason, headerTextbox, storesInNavbar, error };
    } catch (error) {
        console.error(error.message);
        return { settings, currentSeason, headerTextbox, storesInNavbar, error: { message: errorMessage } };
    }
};
