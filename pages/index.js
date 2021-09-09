import PropTypes from 'prop-types';
import Head from 'next/head';
import ReactHtmlParser from 'react-html-parser';

import TextBox from '../components/TextBox';
import AboutBox from '../components/AboutBox';
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

            <div className={styles.homepageContainer}>
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

                                <div className={styles.contentSection}>
                                    {ReactHtmlParser(item.content)}
                                </div>
                            </article>
                        ))
                    }
                </section>

                <section className={styles.asideSection}>
                    <TextBox data={textbox} />

                    <div className={styles.picSection}>
                        <img aria-hidden="true" src="/images/non-news/pic1.jpg" alt="Skeeball World Tour... join the fun!" className={styles.sidebarPic} />
                    </div>

                    <AboutBox />
                </section>

            </div>

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
