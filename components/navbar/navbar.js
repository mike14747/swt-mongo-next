import { useContext } from 'react';
import NavbarContext from '../../context/navbarContext';

import NavDropdown from './subcomponents/navDropdown';
import NavButton from './subcomponents/navButton';

const NavBar = () => {
    const { currentSeasonId = 0, displaySchedule = 0, storesInSchedule = [], storesInResults = [] } = useContext(NavbarContext);

    return (
        <div className="row mt-1 mb-4">
            <div className="col-12 justify-content-center text-center">
                <NavButton buttonText="Standings" href={`/standings/${currentSeasonId}`} />
                <NavDropdown buttonText="Results +" listItems={storesInResults} />
                {displaySchedule === 1 &&
                    <NavDropdown buttonText="Schedule +" listItems={storesInSchedule} />
                }
            </div>
        </div>
    );
};

export default NavBar;
