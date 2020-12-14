import { useContext } from 'react';
import NavbarContext from '../../context/navbarContext';
import SettingsContext from '../../context/settingsContext';

import NavDropdown from './subcomponents/navDropdown';
import NavButton from './subcomponents/navButton';

const NavBar = () => {
    const { storesInNavbar = [] } = useContext(NavbarContext);
    const { currentSeasonId = 0, displaySchedule = 0 } = useContext(SettingsContext);

    return (
        <div className="row mt-1 mb-4">
            <div className="col-12 justify-content-center text-center">
                <NavButton buttonText="Standings" href={`/standings?seasonId=${currentSeasonId}`} />
                <NavDropdown buttonText="Results +" listItems={storesInNavbar} />
                {displaySchedule === 1 &&
                    <NavDropdown buttonText="Schedule +" listItems={storesInNavbar} />
                }
            </div>
        </div>
    );
};

export default NavBar;
