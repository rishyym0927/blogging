const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        
        if (!tokenCookieValue) {
            // Redirect to signup page if no token cookie is present
            return res.status(401).json({ status: '401 Unauthorized' });
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
            return next();
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
    };
}


module.exports = checkForAuthenticationCookie;
