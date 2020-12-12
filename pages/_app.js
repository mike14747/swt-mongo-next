import PropTypes from 'prop-types';
import Loading from '../components/loading';
import { useState } from 'react';
import Router from 'next/router';

import Header from '../components/header/header';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer';

import { getSettings } from '../lib/api/settings';

import '../styles/my_style.css';
import '../styles/app_style.css';

function MyApp({ Component, pageProps, settings }) {
    console.log('settings:', settings);

    const [loading, setLoading] = useState(false);

    Router.onRouteChangeStart = () => setLoading(true);
    Router.onRouteChangeComplete = () => setLoading(false);
    Router.onRouteChangeError = () => setLoading(false);

    return (
        <div id="app-wrapper" className="container border bg-white">
            <Header />
            <Navbar />
            <div id="main-container">{loading ? <Loading /> : <Component {...pageProps} />}</div>
            <Footer />
        </div>
    );
}

MyApp.propTypes = {
    Component: PropTypes.func,
    pageProps: PropTypes.any,
    settings: PropTypes.object,
};

export default MyApp;

export async function getInitialProps(context) {
    const baseApiUrl = 'http://localhost:3000';
    // try {
    //     const settingsResponse = await fetch(`${baseApiUrl}/api/settings`);
    //     const settingsJson = await settingsResponse.json();
    //     const settings = settingsJson[0] || {};

    //     const settingsResponse = await getSettings();
    //     console.log('settingsResponse:', settingsResponse);
    //     if (settingsResponse && settingsResponse.length === 1) return { props: { settings: JSON.parse(JSON.stringify(settingsResponse[0])) } };
    //     return { props: { settings: null } };
    // } catch (error) {
    //     console.error(error.message);
    //     return { props: { settings: null } };
    // }

    return {
        props: {},
    };
}
