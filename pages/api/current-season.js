import { getCurrentSeasonDetails } from '../../lib/api/seasons';

module.exports = async (req, res) => {
    switch (req.method) {
        case 'GET':
            try {
                const currentSeasonResponse = await getCurrentSeasonDetails();
                if (currentSeasonResponse) res.status(200).json(currentSeasonResponse);
            } catch (error) {
                res.status(500).end();
            }
            break;
        default:
            res.status(401).end();
    }
};
