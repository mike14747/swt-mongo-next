import { connectToDatabase } from '../../config/connection';

const getTextBoxData = async () => {
    const { db } = await connectToDatabase();

    return db.collection('textBox').findOne({})
        .then(result => result)
        .catch(error => console.error(error.message));
};

module.exports = {
    getTextBoxData,
};
