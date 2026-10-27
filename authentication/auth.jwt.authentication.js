import jwt from 'jsonwebtoken';
import env from 'dotenv'
env.config()

const secret_KEY = process.env.AUTHJWT_SECRET_KEY;

function genarateUserToken(user) {
    const payload = {
        _id: user._id,
        userName: user.userName
    }
    const token = jwt.sign(payload, secret_KEY);
    return token;
}

function checkUserToken(token) {
    const validationToken = jwt.verify(token, secret_KEY);
    return validationToken;
}

export { genarateUserToken, checkUserToken }