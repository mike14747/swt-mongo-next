import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';

import { getChampions } from '../lib/api/champions';

import PageHeading from '../components/pageHeading';

const Champions = ({ champions, error }) => {
    return (
        <>
            <Head>
                <title>Champions</title>
            </Head>
            <PageHeading text="Champions" />
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
    try {
        const championsResponse = await getChampions();
        if (championsResponse && championsResponse.length > 0) return { props: { champions: JSON.parse(JSON.stringify(championsResponse)), error: null, revalidate: 1 } };
        return { props: { champions: null, error: { message: 'Champions are not currently available. Please try again later!' }, revalidate: 1 } };
    } catch (error) {
        console.error(error.message);
        return { props: { champions: null, error: { message: 'An error occurred trying to fetch data!' }, revalidate: 1 } };
    }
}

export default Champions;
