import mongoose from "mongoose";

async function conneciton_mongodb(url) {
    await mongoose.connect(url)
        .then(() => {
            console.log('connection successfull with database..')
        })
        .catch((error) => {
            console.log('conneciton fail with database..')
            process.exit(0)
        })
}

export { conneciton_mongodb }