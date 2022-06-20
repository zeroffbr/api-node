async function basicAuth(req, res, next) {
    // make authenticate path public
    // if (req.path === '/') {
    //     return next();
    // }

    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        res
        .setHeader('WWW-Authenticate', 'Basic realm="Enter credentials"',)
        .status(401)
        .send('Authorization not found')
        return false
    }else{
        // verify auth credentials
        const base64Credentials = req.headers.authorization?.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');
        const user = (username === process.env.BASIC_USER && password === process.env.BASIC_PASS);
        if (!user) {
            res.status(401).send('Unauthorized')
            return false
        }
        next()        
    }
}

module.exports = basicAuth;