import { useContext } from 'react';
import NavbarContext from '../context/navbarContext';
import SettingsContext from '../context/settingsContext';

import NavDropdown from './NavDropdown';
import NavButton from './NavButton';

import styles from '../styles/Navbar.module.css';

const NavBar = () => {
    const { storesInNavbar = [] } = useContext(NavbarContext);
    const { currentSeasonId = 0, displaySchedule = 0 } = useContext(SettingsContext);

    return (
        <nav className={styles.nav}>
            <NavButton buttonText="Standings" href={`/standings?seasonId=${currentSeasonId}`} />
            <NavDropdown buttonText="Results +" listItems={storesInNavbar} />
            {displaySchedule === 1 &&
                <NavDropdown buttonText="Schedule +" listItems={storesInNavbar} />
            }
        </nav>
    );
};

export default NavBar;
