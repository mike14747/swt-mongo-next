import { useContext } from 'react';
import SettingsContext from '../context/settingsContext';

const Footer = () => {
    const { contactEmail } = useContext(SettingsContext);

    return (
        <div id="footer" className="row">
            <div className="col-6 p-2 border-right">
                <div className="mb-3"><b>Brought to you by:</b></div>
                <div className="mb-1">
                    <a href="https://www.winkinglizard.com/" rel="noopener noreferrer" target="_blank">Winking Lizard Tavern</a>
                </div>
                <div className="mb-1 small">and</div>
                <div className="m-0">
                    <a href="http://www.bellmusicco.com/" rel="noopener noreferrer" target="_blank">Bell Music Company</a>
                </div>
            </div>
            <div className="col-6 p-2 small border-left">
                <h5 className="mb-5"><a href={`mailto:${contactEmail}`}>Contact Us</a></h5>
                <div>&copy; 2010 Skeeball World Tour</div>
            </div>
            <style jsx>{`
                #footer {
                    background-color: #d5eff4;
                    padding: 0.50rem;
                    text-align: center;
                    margin-top: 1rem
                }

                @media (min-width: 576px) {
                    #footer {
                        padding: 1rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default Footer;
