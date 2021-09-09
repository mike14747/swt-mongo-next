import NavDropdown from './NavDropdown';
import NavButton from './NavButton';

import styles from '../styles/Navbar.module.css';

const NavBar = ({ currentSeasonId, displaySchedule, storesInNavbar }) => {
    const resultsStoresInNavbar = storesInNavbar?.map(store => {
        return {
            href: '/results/' + store.seasonId + '/store/' + store.storeId + '/division/' + store.divisionId,
            text: store.storeCity + ' (' + store.divisionName + ')',
        };
    });

    const scheduleStoresInNavbar = storesInNavbar?.map(store => {
        return {
            href: '/schedule/' + store.seasonId + '/store/' + store.storeId + '/division/' + store.divisionId,
            text: store.storeCity + ' (' + store.divisionName + ')',
        };
    });

    return (
        <nav aria-label="Primary Navigation" className={styles.nav + ' container'}>
            <NavButton buttonText="Standings" href={'/standings/' + currentSeasonId} />
            <NavDropdown buttonText="Results" listItems={resultsStoresInNavbar} />
            {displaySchedule &&
                <NavDropdown buttonText="Schedule" listItems={scheduleStoresInNavbar} />
            }
        </nav>
    );
};

export default NavBar;
