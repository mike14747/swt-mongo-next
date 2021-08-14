// import ReactHtmlParser from 'react-html-parser';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { getRules } from '../lib/api/rules';

import styles from '../styles/rules.module.css';

const Rules = ({ rules, error }) => {
    return (
        <>
            <Head>
                <title>League Rules</title>
            </Head>
            <h2 className="page-heading">League Rules</h2>
            <article className={styles.rulesArticle}>
                {rules
                    ? <ReactMarkdown
                        // eslint-disable-next-line react/no-children-prop
                        children={rules.content}
                    />
                    : error && <h4 className="text-danger text-center mt-4">{error.message}</h4>
                }
            </article>
        </>
    );
};

Rules.propTypes = {
    rules: PropTypes.object,
    error: PropTypes.object,
};

export async function getStaticProps() {
    let rules = null;
    let error = null;

    try {
        const rulesResponse = await getRules();
        if (rulesResponse) {
            rules = JSON.parse(JSON.stringify(rulesResponse));
        } else {
            error = { message: 'Rules are not currently available. Please try again later!' };
        }

        return { props: { rules, error, revalidate: 1 } };
    } catch (error) {
        console.error(error.message);
        return { props: { rules: null, error: { message: 'An error occurred trying to fetch data!' }, revalidate: 1 } };
    }
}

export default Rules;
