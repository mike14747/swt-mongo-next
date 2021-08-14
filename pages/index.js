import PropTypes from 'prop-types';
import Head from 'next/head';
import ReactHtmlParser from 'react-html-parser';

import TextBox from '../components/TextBox';
import { getNews } from '../lib/api/news';
import { getTextBoxData } from '../lib/api/textbox';

import styles from '../styles/home.module.css';

const Home = ({ news, textbox }) => {
    // console.log(news);
    return (
        <>
            <Head>
                <title>
                    SkeeballWorldTour
                </title>
            </Head>
            <TextBox data={textbox} />
            <section className={styles.newsSection}>
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

                            <section className={styles.contentSection}>
                                {ReactHtmlParser(item.content)}
                            </section>
                        </article>
                    ))
                }
            </section>

        </>
    );
};

Home.propTypes = {
    news: PropTypes.array,
    textbox: PropTypes.object,
};

export default Home;

export async function getStaticProps() {
    const newsResponse = await getNews().catch((error) => console.log(error));
    const news = JSON.parse(JSON.stringify(newsResponse)) || null;

    const textboxResponse = await getTextBoxData().catch((error) => console.log(error));
    const textbox = JSON.parse(JSON.stringify(textboxResponse)) || null;

    return {
        props: { news, textbox },
        revalidate: 600, // page regeneration can occur in 10 minutes
    };
}
