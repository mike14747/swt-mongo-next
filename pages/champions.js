import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';

import { getChampions } from '../lib/api/champions';
import ErrorMessage from '../components/ErrorMessage';

import styles from '../styles/champions.module.css';
import tableStyles from '../styles/table.module.css';

const Champions = ({ champions, error }) => {
    return (
        <>
            <Head>
                <title>Champions</title>
            </Head>
            <h2 className="page-heading">Champions</h2>

            {error && <ErrorMessage text={error.message} />}

            {champions && champions.length > 0 &&
                <article className={styles.championsArticle}>
                    <table className={tableStyles.table + ' ' + tableStyles.tableBordered + ' ' + tableStyles.tableHover}>
                        <thead>
                            <tr className={tableStyles.headingRow}>
                                <th className={tableStyles.textLeft}>Season</th>
                                <th className={tableStyles.textLeft}>Champion</th>
                                <th className={tableStyles.textLeft}>Store</th>
                            </tr>
                        </thead>
                        <tbody>
                            {champions.map((c) => (
                                <tr key={c.seasonId}>
                                    <td className={tableStyles.textLeft}>{c.seasonName}-{c.year}</td>
                                    <td className={tableStyles.textLeft}>
                                        <Link href={'/teams/' + c.champion.teamId}>
                                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                            <a>{c.champion.teamName}</a>
                                        </Link>
                                        {c.champion.comments?.length > 0 && <span className={styles.comment}>({c.champion.comments})</span>}
                                    </td>
                                    <td className={tableStyles.textLeft}>{c.champion.storeCity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </article>
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
        return { props: { champions, error, revalidate: 600 } };
    } catch (error) {
        console.error(error.message);
        return { props: { champions: null, error: { message: 'An error occurred trying to fetch data!' }, revalidate: 1 } };
    }
}

export default Champions;
