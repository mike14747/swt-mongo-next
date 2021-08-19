import NavDropdown from './NavDropdown';
import NavButton from './NavButton';

import styles from '../styles/Navbar.module.css';

const NavBar = ({ currentSeasonId, displaySchedule, storesInNavbar }) => {
    console.log('displaySchedule in Navbar:', displaySchedule);
    const tempContent = [
        {
            href: '/',
            text: 'Brunswick (Monday)',
        },
        {
            href: '/',
            text: 'Mentor (Thursday)',
        },
    ];

    const scheduleStoresInNavbar = storesInNavbar?.map(store => {
        return {
            href: '/schedule/' + store.seasonId + '/store/' + store.storeId + '/division/' + store.divisionId,
            text: store.storeCity + ' (' + store.divisionName + ')',
        };
    });

    return (
        <nav className={styles.nav + ' container'}>
            <NavButton buttonText="Standings" href={'/standings/' + currentSeasonId} />
            <NavDropdown buttonText="Results" listItems={tempContent} />
            {displaySchedule &&
                <NavDropdown buttonText="Schedule" listItems={scheduleStoresInNavbar} />
            }
        </nav>
    );
};

export default NavBar;
