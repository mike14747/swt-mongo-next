import { getTextBoxData } from '../../lib/api/textbox';

module.exports = async (req, res) => {
    switch (req.method) {
        case 'GET':
            try {
                const textboxResponse = await getTextBoxData();
                res.status(200).json(textboxResponse);
            } catch (error) {
                res.status(500).end();
            }
            break;
        default:
            res.status(401).end();
    }
};
