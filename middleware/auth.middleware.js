import { checkUserToken } from "../authentication/auth.jwt.authentication.js";
import userModel from "../models/user.model.js";

async function auth_user(request, response, next) {

    const token = (request.headers.auth_useruthorization || request.headers.authorization?.startsWith('Bearer '))?.split(' ')[1];
    if (!token) { return response.status(401).json({ message: 'the user is not authorizied!' }) }

    try {
        const userValidation = checkUserToken(token);

        if (await userModel.findOne({ _id: userValidation._id })) {
            request.user = userValidation;
            next();
        } else {
            return response.status(400).json({ message: 'user is not valid!' })
        }

    } catch (error) {
        return response.status(500).json({ message: 'internal server error' })
    }
}

export { auth_user }