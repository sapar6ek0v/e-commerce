import passport from "passport";

const handleJwt = (req, res, next, roles) => {
    return async (error, user) => {
        if (error || !user || !roles.includes(user.role)) {
            return res.status(401).json({message: "Доступ запрещен", error})
        }

        await req.logIn(user, {session: false})
        req.user = user
        return next()
    }
}

const authMiddleware = (roles = []) => {
    return (req, res, next) => {
        const authenticate = passport.authenticate('jwt', {session: false}, handleJwt(req, res, next, roles))

        return authenticate(req, res, next)

    }
}


export default authMiddleware