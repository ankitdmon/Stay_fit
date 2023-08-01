const db = require("../db");
const bcrypt = require("bcryptjs");
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");


class User {

    /* authenticate user with username and password
   
    * Returns { username, first_name, last_name, email }
   
    * Throws UnauthorizedError is user not found or wrong password.
   */
    static async authenticate(username, password) {

        //try to find the user first

        const result = await db.query(
            `SELECT username, password,
             first_name AS "firstName",
             last_name AS "lastName",
             email FROM users
             WHERE username=$1`,
            [username]);

        const user = result.rows[0];

        if (user) {
            // compare hashed password to a new hash from password
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid === true) {
                delete user.password;
                return user;
            }
        }

        throw new UnauthorizedError("Invalid username/password");
    }

    /** Register user with data.
       *
       * Returns { username, firstName, lastName, email}
       *
       * Throws BadRequestError on duplicates.
       **/
    static async register({ username, password, firstName, lastName, email }) {

        const checkDuplicateUser = await db.query(`SELECT username FROM users
                                    WHERE username =$1`, [username]);

        if (checkDuplicateUser.rows[0]) {
            throw new BadRequestError(`Found Duplicate user,${username}`);
        }

        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
        const result = await db.query(
            `INSERT INTO users
           (username,
            password,
            first_name,
            last_name,
            email)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING username, first_name AS "firstName", last_name AS "lastName", email`,
            [
                username,
                hashedPassword,
                firstName,
                lastName,
                email
            ],
        );
        const user = result.rows[0];
        return user;
    }

    /** Given a username, return data about user.
       *
       * Returns { username, first_name, last_name,email}
       * Throws NotFoundError if user not found.
       **/
    static async get(username) {

        const userRes = await db.query(`SELECT username, 
                        first_name AS "firstName",
                        last_name AS "lastName",
                        email FROM users WHERE username =$1`, [username]);

        const user = userRes.rows[0];

        if (!user) {
            throw new NotFoundError(`No user Found : ${username}`);
        }

        return user;
    }

    static async saveToFoodJournal(username, { mealId, mealName, cal, img }) {

        const preCheckUser = await db.query(
            `SELECT username
           FROM users
           WHERE username = $1`, [username]);
        const user = preCheckUser.rows[0];

        if (!user) throw new NotFoundError(`No username: ${username}`);

        await db.query(
            `INSERT INTO foodjournal (user_name, meal_id , meal_name, calories,img)
             VALUES ($1, $2 ,$3, $4, $5)`,
            [username, mealId, mealName, cal, img]);
    }

    static async getMeals(username) {

        const result = await db.query(
            `SELECT id ,meal_name , calories ,img, meal_id, created_at
                       FROM foodjournal
                       WHERE user_name =$1`, [username]);

        return result.rows;
    }

    /** Delete given mealId from database; returns undefined. */

    static async remove(username, mealId) {

        let result = await db.query(`DELETE
           FROM foodjournal
           WHERE meal_id = $1 AND user_name =$2`, [mealId, username]);
        const meal = result.rows;
        if (!meal) throw new NotFoundError(`No Meals: ${mealId}`);
    }
}

module.exports = User