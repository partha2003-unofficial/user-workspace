import { checkUserToken } from "../authentication/auth.jwt.authentication.js";
import userModel from "../models/user.model.js";

async function auth_user(request, response, next) {

    const token = request.headers.authorization?.split(" ")[1];
    if (!token) { return response.status(401).json({ message: 'the user is not authorizied! by middeware' }) }

    try {
        const userValidation = checkUserToken(token);

        if (await userModel.findOne({ _id: userValidation._id })) {
            request.user = userValidation;
            return next();
        } else {
            console.log('unauthorized user !')
            return response.status(400).json({ message: 'user is not valid!' })
        }

    } catch (error) {
        return response.status(500).json({ message: 'internal server error in middleware' })
    }
}

export { auth_user }