const acceptAdmin = (req, res, next) => {

    if (req.isAuthenticated() && req.user.id === 1) {


        next();
    } else {

        res.sendStatus(403);
    }
};

module.exports = { acceptAdmin };