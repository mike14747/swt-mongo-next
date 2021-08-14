export default function baseUrl(req) {
    let host = req?.headers?.host || window.location.host || 'localhost:3000';

    let protocol = /^localhost(:\d+)?$/.test(host) ? 'http:' : 'https:';

    if (req?.headers['x-forwarded-host'] && typeof req.headers['x-forwarded-host'] === 'string') {
        host = req.headers['x-forwarded-host'];
    }

    if (req?.headers['x-forwarded-proto'] && typeof req.headers['x-forwarded-proto'] === 'string') {
        protocol = req.headers['x-forwarded-proto'] + ':';
    }

    return protocol + '//' + host;
}
