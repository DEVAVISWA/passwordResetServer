require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const JWT_SECRET= process.env.JWT_SECRET
const EMAIL_FROM= process.env.EMAIL_FROM
const EMAIL_FROM_PASSWORD= process.env.EMAIL_FROM_PASSWORD

module.exports ={
    MONGODB_URI,
    PORT,
    JWT_SECRET,
    EMAIL_FROM,
    EMAIL_FROM_PASSWORD
}