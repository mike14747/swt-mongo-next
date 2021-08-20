import { connectToDatabase } from '../../config/connection';

const getNews = async () => {
    const { db } = await connectToDatabase();

    return db
        .collection('homepageNews')
        .find({ display: true })
        .project({ _id: 0, heading: 1, date: 1, content: 1 })
        .sort({ date: -1 })
        .limit(10)
        .toArray();
};

module.exports = {
    getNews,
};
