import { useContext } from 'react';
import SettingsContext from '../context/settingsContext';

import styles from '../styles/Footer.module.css';

const Footer = () => {
    const { contactEmail } = useContext(SettingsContext);

    return (
        <footer className={styles.footer + ' container'}>
            <div className={styles.footerLeft}>
                <p><b>Brought to you by:</b></p>
                <p>
                    <a href="https://www.winkinglizard.com/" rel="noopener noreferrer" target="_blank">Winking Lizard Tavern</a>
                </p>
                <p className={styles.and}>and</p>
                <p>
                    <a href="http://www.bellmusicco.com/" rel="noopener noreferrer" target="_blank">Bell Music Company</a>
                </p>
            </div>
            <div className={styles.footerRight}>
                <address className={styles.contact}>
                    <a href={`mailto:${contactEmail}`}>CONTACT US</a>
                </address>
                <p>&copy; 2010 Skeeball World Tour</p>
            </div>
        </footer>
    );
};

export default Footer;
