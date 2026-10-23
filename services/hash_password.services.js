import bcrypt from 'bcrypt';

async function createHashPassword(password) {
    return await bcrypt.hash(password, 10)
}

async function compareHashPassword(takingPassword, origingalPassword) {
    return bcrypt.compare(takingPassword, origingalPassword)
}
export { createHashPassword, compareHashPassword }  