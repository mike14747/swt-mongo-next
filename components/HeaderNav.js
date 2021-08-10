/* eslint-disable jsx-a11y/anchor-is-valid */

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
                    margin-bottom: -0.50rem;
                }
                
                .h-nav-burger {
                    display: inline-block;
                    font-size: calc(1vw + 1vh + .5vmin + 12px);
                    font-weight: 600;
                    cursor: pointer;
                    border-radius: 0.25rem;
                    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
                    background-color: rgba(255, 255, 255, 0.5);
                    border: 1px #999999 solid;
                    padding: .25rem .50rem;
                    margin-bottom: 0.50rem;
                }
                
                ul.h-nav-content {
                    font-size: 1.25rem;
                    font-weight: 500;
                    display: none;
                    position: absolute;
                    right: 0;
                    text-align: left;
                    width: calc(100% + 200px);
                    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
                    z-index: 2;
                    margin: 0 0 0 -100px;
                    padding: 0;
                    cursor: pointer;
                }
                
                ul.h-nav-content a {
                    text-decoration: none;
                }
                
                ul.h-nav-content:hover a {
                    text-decoration: none;
                }
                
                ul.h-nav-content li {
                    padding: 1rem;
                    display: block;
                    border-top: 1px rgba(0, 0, 0, 0.25) solid;
                    border-bottom: 1px rgba(0, 0, 0, 0.25) solid;
                    border-right: 1px rgba(0, 0, 0, 0.25) solid;
                    border-left: 1px rgba(0, 0, 0, 0.25) solid;
                }
                
                .h-nav-container:hover, .h-nav-container:hover .h-nav-content {
                    display: block;
                }
                
                li.nav-item {
                    background-color: #f3e3c0 !important;
                    color: #cc0000;
                    cursor: pointer;
                }
                
                li.nav-item:hover {
                    background-color: #d5eff4 !important;
                    color: #006699;
                }

                @media (min-width: 768px) {
                    ul.h-nav-content {
                        width: calc(100% + 100px);
                    }
                }

                @media (min-width: 1024px) {
                    ul.h-nav-content {
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    );
};

export default HeaderNav;
