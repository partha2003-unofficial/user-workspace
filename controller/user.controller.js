import { genarateUserToken } from "../authentication/auth.jwt.authentication.js";
import userModel from "../models/user.model.js";
import { compareHashPassword, createHashPassword } from "../services/hash_password.services.js";
import { signupUserSchema } from "../validation/auth.validation.js";

async function userSignUp(request, response) {

    //validaton using zod
    const { data, error } = signupUserSchema.safeParse(request.body)
    if (error) { return response.status(400).json({ message: error.message }) };

    try {
        const hashPassword = await createHashPassword(data.password); //password hashing using
        const user = await userModel.create({
            userName: data.name,
            password: hashPassword
        })

        if (user) {
            const token = genarateUserToken(user)
            response.setHeader('Authorizaiton', `Bearer ${token}`)
            return response.status(200).json({
                user: user.toJSON(),
                token: token,
                message: 'user created successfully..'
            })
        } else {
            return response.status(400).json({ message: 'user is not created!' })
        }
    } catch (error) {
        return response.status(500).json({ message: 'internal server error !' })
    }
}

async function userLogin(request, response) {
    const { data, error } = signupUserSchema.safeParse(request.body);
    if (error) { return response.status(400).json({ message: error.errors.map((errors) => errors.message) }) };

    const { name, password } = data; //taking the userName and password form the data 

    const user = await userModel.findOne({ userName: name })
    console.log(user)
    if (!user) { return response.status(404).json({ message: 'user is not found' }) }

    try {
        await compareHashPassword(password, user.password)
            .then((data) => {
                const token = genarateUserToken(user)
                request.user = user; //use for entair component to use the user values
                response.cookie('user_cookie', token)
                return response.status(200).json({ message: 'user login successfully !', user: user })
            })
            .catch((error) => { return response.status(400).json({ message: 'user is not authenticatated!', error: error }) })
    } catch (error) {
        return response.status(500).json({ message: 'internal server error !' })
    }
}

export { userLogin, userSignUp }