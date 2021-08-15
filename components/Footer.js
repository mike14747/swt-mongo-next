import { useContext } from 'react';
import SettingsContext from '../context/settingsContext';

import styles from '../styles/Footer.module.css';

const Footer = () => {
    const { contactEmail } = useContext(SettingsContext);

    return (
        <footer className={styles.footer + ' container'}>
            <section className={styles.footerLeft}>
                <p><strong>Brought to you by:</strong></p>
                <p className={styles.sponsor}>
                    <a href="https://www.winkinglizard.com/" rel="noopener noreferrer" target="_blank">Winking Lizard Tavern</a>
                </p>
                <p className={styles.and}>and</p>
                <p>
                    <a href="http://www.bellmusicco.com/" rel="noopener noreferrer" target="_blank">Bell Music Company</a>
                </p>
            </section>
            <section className={styles.footerRight}>
                <address className={styles.contact}>
                    <a href={`mailto:${contactEmail}`}>CONTACT US</a>
                </address>
                <p>&copy; 2010 Skeeball World Tour</p>
            </section>
        </footer>
    );
};

export default Footer;
