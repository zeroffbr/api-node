async function basicAuth(req, res, next) {
    try {        
        const Skip = [
            "/",
        ]
        // make authenticate path public
        if (Skip.includes(req.path)) {
            return next();
        }
        if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
            res
            .setHeader('WWW-Authenticate', 'Basic realm="Enter credentials"',)
            .status(401)
            .send({ mensagem: 'Falha na autenticação'});
            return false
        }else{
            // verify auth credentials
            const base64Credentials = req.headers.authorization.split(' ')[1];
            const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
            const [username, password] = credentials.split(':');
            const user = (username === "testserver"  && password === "testserver");
            if (!user) {return res.status(401).send({ mensagem: 'Falha na autenticação'})}
            next()       
        }
    } catch (error) {
        return res.status(401).send({ mensagem: 'Falha na autenticação'});
    }
}

module.exports = basicAuth;