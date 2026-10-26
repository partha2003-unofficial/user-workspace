import { genarateUserToken } from "../authentication/auth.jwt.authentication.js";
import userModel from "../models/user.model.js";
import { compareHashPassword, createHashPassword } from "../services/hash_password.services.js";
import { signupUserSchema } from "../validation/auth.validation.js";

async function userSignin(request, response) {

    //validaton using zod
    const { data, error } = signupUserSchema.safeParse(request.body)
    if (error) { return response.status(400).json({ message: error.errors.map((errors) => `${errors.message}`) }) };

    const hashPassword = await createHashPassword(data.password); //password hashing using
    const user = await userModel.create({
        userName: data.useName,
        password: hashPassword
    })

    if (user) {
        const token = genarateUserToken(user)
        response.setHeader('Authorizaiton', `Bearer ${token}`)
        return response.status(200).json({
            user: user.toJSON(),
            message: 'user created successfully..'
        })
    }else{
        return reresponse
    }
}

async function userLogin(request, response) {
    const { data, error } = signupUserSchema.safeParse(request.body);
    if (error) { return response.status(400).json({ message: error.errors.map((errors) => errors.message) }) };

    const { userName, password } = data; //taking the userName and password form the data 

    const user = await userModel.findOne({ userName })

    await compareHashPassword(password, user.password)
        .then((data) => {
            const token = genarateUserToken(user)
            request.user = user; //use for entair component to use the user values
            return response.cookie('user_cookie', token)
        })
        .catch((error) => { return response.status(400).json({ message: 'user is not authenticatated!', error: error }) })
}

export { userLogin, userSignin }