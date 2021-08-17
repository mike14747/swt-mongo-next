import { useContext } from 'react';
import NavbarContext from '../context/navbarContext';
import SettingsContext from '../context/settingsContext';

import NavDropdown from './NavDropdown';
import NavButton from './NavButton';

import styles from '../styles/Navbar.module.css';

const NavBar = () => {
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

    const { storesInNavbar = [] } = useContext(NavbarContext);
    const { currentSeasonId = 0, displaySchedule = false } = useContext(SettingsContext);

    return (
        <nav className={styles.nav + ' container'}>
            <NavButton buttonText="Standings" href={`/standings?seasonId=${currentSeasonId}`} />
            <NavDropdown buttonText="Results" listItems={tempContent} />
            {displaySchedule &&
                <NavDropdown buttonText="Schedule" listItems={tempContent} />
            }
        </nav>
    );
};

export default NavBar;
