import PropTypes from 'prop-types';
import Head from 'next/head';
import ReactHtmlParser from 'react-html-parser';

import { getNews } from '../lib/api/news';

import styles from '../styles/home.module.css';

const Home = ({ news }) => {
    // console.log(news);
    return (
        <>
            <Head>
                <title>
                    SkeeballWorldTour
                </title>
            </Head>
            <h2 className="page-heading">Latest News</h2>

            {!news && <p className="error">An error occurred fetching data.</p>}

            {news?.length === 0 &&
                <article>
                    <p>There are no news items to display. Check back again soon.</p>
                </article>
            }

            {news?.length > 0 &&
                news.map((item, index) => (
                    <article key={index} className={styles.newsArticle}>
                        <section>
                            <h3 className={styles.newsHeading}>
                                {item.heading}
                            </h3>
                            <p className={styles.newsDate}>
                                {item.date}
                            </p>
                        </section>

                        <section>
                            {ReactHtmlParser(item.content)}
                        </section>
                    </article>
                ))
            }
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
