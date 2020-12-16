import PropTypes from 'prop-types';
import Loading from '../components/loading';
import { useState } from 'react';
import Router from 'next/router';

import SettingsContext from '../context/settingsContext';
import HeaderContext from '../context/headerContext';
import CurrentSeasonContext from '../context/currentSeasonContext';

import Header from '../components/header/header';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer';

import '../styles/my_style.css';
import '../styles/app_style.css';

function MyApp({ settings, currentSeason, headerTextbox, storesInNavbar, error, Component, pageProps }) {
    const [loading, setLoading] = useState(false);

    Router.onRouteChangeStart = () => setLoading(true);
    Router.onRouteChangeComplete = () => setLoading(false);
    Router.onRouteChangeError = () => setLoading(false);

    return (
        <div id="app-wrapper" className="container border bg-white">
            <SettingsContext.Provider value={settings}>
                <CurrentSeasonContext.Provider value={currentSeason}>
                    <HeaderContext.Provider value={headerTextbox}>
                        <Header />
                    </HeaderContext.Provider>
                    <Navbar />
                    <div id="main-container">{loading ? <Loading /> : <Component {...pageProps} />}</div>
                    <Footer />
                </CurrentSeasonContext.Provider>
            </SettingsContext.Provider>
        </div>
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

MyApp.getInitialProps = async () => {
    const baseApiUrl = 'http://localhost:3000';

    let settings = null;
    let currentSeason = null;
    let headerTextbox = null;
    let storesInNavbar = null;
    let error = null;
    const errorMessage = 'An error occurred trying to fetch data!';

    try {
        const settingsResponse = await fetch(`${baseApiUrl}/api/settings`);
        if (settingsResponse.ok) {
            settings = await settingsResponse.json();
        } else {
            error = { message: errorMessage };
        }

        const currentSeasonResponse = await fetch(`${baseApiUrl}/api/current-season`);
        if (currentSeasonResponse.ok) {
            [currentSeason] = await currentSeasonResponse.json();
        } else {
            error = { message: errorMessage };
        }

        const textboxResponse = await fetch(`${baseApiUrl}/api/textbox`);
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
