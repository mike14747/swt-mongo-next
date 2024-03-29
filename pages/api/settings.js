import { getSettings } from '../../lib/api/settings';

module.exports = async (req, res) => {
    switch (req.method) {
        case 'GET':
            try {
                const settingsResponse = await getSettings();
                if (settingsResponse) res.status(200).json(settingsResponse);
            } catch (error) {
                res.status(500).end();
            }
            break;
        default:
            res.status(401).end();
    }
};
