import PropTypes from 'prop-types';
import Head from 'next/head';

import { getNews } from '../lib/api/news';
import PageHeading from '../components/PageHeading';

const Home = ({ news }) => {
    // console.log(news);
    return (
        <>
            <Head>
                <title>
                    SkeeballWorldTour
                </title>
            </Head>
            <PageHeading text="Latest News" />
        </>
    );
};

Home.propTypes = {
    news: PropTypes.array,
};

export default Home;

export async function getStaticProps() {
    const newsResponse = await getNews().catch((error) => console.log(error));
    const news = JSON.parse(JSON.stringify(newsResponse)) || null;

    return {
        props: { news },
        revalidate: 600, // page regeneration can occur in 10 minutes
    };
}
