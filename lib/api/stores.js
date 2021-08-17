import { connectToDatabase } from '../../config/connection';

const getActiveStores = async () => {
    const { db } = await connectToDatabase();

    return await db.collection('stores')
        .find({ active: true })
        .project({ _id: 0, storeId: 1, name: 1, address: 1, city: 1, state: 1, zip: 1, phone: 1, mapUrl: 1 })
        .sort({ storeName: 1 })
        .toArray();
};

module.exports = {
    getActiveStores,
};
