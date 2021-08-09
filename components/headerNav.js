import Link from 'next/link';

const HeaderNav = () => {
    return (
        <div className="h-nav-container">
            <span className="h-nav-burger">&#9776;</span>
            <ul className="h-nav-content">
                <Link href="/champions">
                    <a><li className="nav-item">Champions</li></a>
                </Link>
                <Link href="/rules">
                    <a><li className="nav-item">Rules</li></a>
                </Link>

                <Link href="/leaders">
                    <a><li className="nav-item">Leaders</li></a>
                </Link>

                <Link href="/all-time">
                    <a><li className="nav-item">All-Time Records</li></a>
                </Link>
                <Link href="/test">
                    <a><li className="nav-item">Test</li></a>
                </Link>
            </ul>
            <style jsx>{`
                .h-nav-container {
                    position: relative;
                    display: inline-block;
                }
                
                .h-nav-burger {
                    font-size: calc(1vw + 1vh + .5vmin + 12px);
                    font-weight: 600;
                    cursor: pointer;
                    border-radius: 0.25rem;
                    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
                    background-color: rgba(255, 255, 255, 0.3);
                    border: 1px #999999 solid;
                    padding: .25rem .50rem;
                }
                
                .h-nav-content {
                    font-size: 1.25rem;
                    font-weight: 500;
                    display: none;
                    position: absolute;
                    text-align: left;
                    width: calc(100% + 100px);
                    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
                    z-index: 2;
                    margin: 0 0 0 -100px;
                    padding: 0;
                    cursor: pointer;
                }
                
                .h-nav-content a {
                    text-decoration: none;
                }
                
                .h-nav-content:hover a {
                    text-decoration: none;
                }
                
                .h-nav-content li {
                    padding: 0.75rem;
                    display: block;
                    border-top: 1px #cccccc solid;
                    border-right: 1px #cccccc solid;
                    border-left: 1px #cccccc solid;
                }
                
                .h-nav-content li:last-child {
                    border-bottom: 1px #cccccc solid;
                }
                
                .h-nav-container:hover, .h-nav-container:hover .h-nav-content {
                    display: block;
                }
                
                .nav-item {
                    background-color: #f3e3c0 !important;
                    color: #cc0000;
                    cursor: pointer;
                }
                
                .nav-item:hover {
                    background-color: #d5eff4 !important;
                    color: #006699;
                }
            `}</style>
        </div>
    );
};

export default HeaderNav;
