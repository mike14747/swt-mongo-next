import Link from 'next/link';

import SearchBar from './subcomponents/searchBar';
import HeaderNav from './subcomponents/headerNav';
import JoinFun from './subcomponents/joinFun';

const Header = () => {
    return (
        <div id="header" className="row mb-0">
            <div className="col-3 p-2 my-auto text-left">
                <Link href="/">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a><img className="img-fluid" src="/images/header/skeeball_logo.png" alt="Skeeball World Tour" /></a>
                </Link>
            </div>
            <div className="col-6 d-flex flex-column justify-content-center align-items-center mb-2 p-0">
                <JoinFun />
                <SearchBar />
            </div>
            <div className="col-3 p-2 my-auto text-right">
                <HeaderNav />
            </div>
            <style jsx>{`
                #header {
                    background-image: url("/images/header/head_bg_new.jpg");
                    background-size: cover;
                    margin-bottom: 0;
                }
                
                .col-logo {
                    flex: 0 0 16.666667%;
                    max-width: 16.666667%;
                }
                
                @media (max-width: 767.98px) {
                    .col-logo {
                        flex: 0 0 25%;
                        max-width: 25%;
                    }
                }
            `}</style>
        </div>
    );
};

export default Header;
