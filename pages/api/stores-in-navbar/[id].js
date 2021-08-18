import { getNavbarStores } from '../../../lib/api/schedules';

module.exports = async (req, res) => {
    switch (req.method) {
        case 'GET':
            try {
                const storesResponse = await getNavbarStores(req.query.id);
                if (storesResponse) res.status(200).json(storesResponse);
            } catch (error) {
                res.status(500).end();
            }
            break;
        default:
            res.status(401).end();
    }
};
