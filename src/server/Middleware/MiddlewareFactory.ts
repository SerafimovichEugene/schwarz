import { decode } from 'jwt-simple';
import User from '../models/User';


export default class MiddlewareFactory {
    public guard() {
        const guardMiddleware = async (req, res, next) => {
            try {
                let userFromToken = decode(req.cookies.token, process.env.JWT_SECRET_ADMIN);
                let adminUser = await User.findOne({login: userFromToken.login});
                if (adminUser.isAdmin) {
                    next();
                }
            } catch (error) {
                console.log('middleware error');
                res.status(200).json({message: 'You cant always get what you want'}).end();
            }
        };
        return guardMiddleware;
    }
}
