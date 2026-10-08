const jwt = require('jsonwebtoken')

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        req.token = authorization.replace('Bearer ', '')
    } else {
        req.token = null
    }
    next()
}

const userExtractor = (req, res, next) => {
    if (!req.token) {
        return res.status(401).json({ error: 'token missing' })
    }

    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        req.user = decodedToken
        next()
    } catch {
        return res.status(401).json({ error: 'token invalid or expired' })
    }
}

const adminExtractor = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ error: 'admin rights required' })
    }
    next()
}

module.exports = { tokenExtractor, userExtractor, adminExtractor }