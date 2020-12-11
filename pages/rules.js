// import ReactHtmlParser from 'react-html-parser';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { getRules } from '../lib/api/rules';

import PageHeading from '../components/pageHeading';

const Rules = ({ rules, error }) => {
    return (
        <>
            <Head>
                <title>League Rules</title>
            </Head>
            <PageHeading text="League Rules" />
            {rules
                ? <ReactMarkdown
                    source={rules.content}
                />
                : error && <h4 className="text-danger text-center mt-4">{error.message}</h4>
            }
        </>
    );
};

Rules.propTypes = {
    rules: PropTypes.object,
    error: PropTypes.object,
};

export async function getStaticProps() {
    const rulesResponse = await getRules();

    if (rulesResponse && rulesResponse.length === 1) {
        return { props: { rules: JSON.parse(JSON.stringify(rulesResponse[0])), error: null, revalidate: 1 } };
    } else {
        return { props: { rules: null, error: { message: 'An error occurred trying to fetch data!' }, revalidate: 1 } };
    }

    // return rulesResponse && rulesResponse.length === 1 ? { props: { rules: JSON.parse(JSON.stringify(rulesResponse[0])), error: null, revalidate: 1 } } : { props: { rules: null, error: { message: 'An error occurred trying to fetch data!' }, revalidate: 1 } };
}

export default Rules;
