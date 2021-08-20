import { connectToDatabase } from '../../config/connection';

const getTextBoxData = async () => {
    const { db } = await connectToDatabase();

    return db
        .collection('textBox')
        .findOne({});
};

module.exports = {
    getTextBoxData,
};
