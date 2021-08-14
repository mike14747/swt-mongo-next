import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';

import { getChampions } from '../lib/api/champions';

const Champions = ({ champions, error }) => {
    return (
        <>
            <Head>
                <title>Champions</title>
            </Head>
            <h2 className="page-heading">Champions</h2>
            {champions && champions.length > 0
                ? <div className="d-flex justify-content-center">
                    <div className="min-w-50 mx-auto">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr className="bg-gray6">
                                    <th>Season</th>
                                    <th>Champion</th>
                                    <th>Store</th>
                                </tr>
                            </thead>
                            <tbody>
                                {champions.map((c) => (
                                    <tr key={c.seasonId}>
                                        <td>{c.seasonName}-{c.year}</td>
                                        <td>
                                            <Link href={'/teams/' + c.champion.teamId}>
                                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                <a>{c.champion.teamName}</a>
                                            </Link>
                                            {c.champion.comments.length > 0 && <span className="small ml-2">*({c.champion.comments})</span>}
                                        </td>
                                        <td>{c.champion.storeCity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                : champions
                    ? <div className="empty-result">There are no champions to display!</div>
                    : error && <h4 className="text-danger text-center mt-4">An error occurred trying to fetch data!</h4>
            }
        </>
    );
};

Champions.propTypes = {
    champions: PropTypes.array,
    error: PropTypes.object,
};

export async function getStaticProps() {
    let champions = null;
    let error = null;

    try {
        const championsResponse = await getChampions();
        if (championsResponse?.length > 0) {
            champions = JSON.parse(JSON.stringify(championsResponse));
        } else {
            error = { message: 'Champions are not currently available. Please try again later!' };
        }
        return { props: { champions, error, revalidate: 1 } };
    } catch (error) {
        console.error(error.message);
        return { props: { champions: null, error: { message: 'An error occurred trying to fetch data!' }, revalidate: 1 } };
    }
}

export default Champions;
