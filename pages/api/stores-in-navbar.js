import { getNavbarStores } from '../../lib/api/schedule';
import { getCurrentSeasonId } from '../../lib/api/settings';

module.exports = async (req, res) => {
    switch (req.method) {
        case 'GET':
            try {
                const { currentSeasonId } = await getCurrentSeasonId();
                const storesResponse = await getNavbarStores(currentSeasonId);
                if (storesResponse) res.status(200).json(storesResponse);
            } catch (error) {
                res.status(500).end();
            }
            break;
        default:
            res.status(401).end();
    }
};
