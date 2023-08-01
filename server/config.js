require("dotenv").config();

const PORT = +process.env.PORT || 3001;
function getDatabaseUri() {
    return (process.env.NODE_ENV === "test")
        ? "postgres://postgres:postgresql@localhost:5432/myfitness_test"
        : process.env.DATABASE_URL || "postgres://postgres:postgresql@localhost:5432/myfitness";
}
const SECRET_KEY = process.env.SECRET_KEY || "oh-its-secret-key";

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

module.exports = {
    PORT,
    SECRET_KEY,
    BCRYPT_WORK_FACTOR,
    getDatabaseUri
};