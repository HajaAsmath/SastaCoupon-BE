const bcrypt = require('bcrypt');
const userRepo = require('../repos/UserRepo')

const logIn = async (email, passsword) => {
        return await userRepo.findByEmaiId(email)
        .then(async (data) => {
            if(data[0].length>0) {
                const {ID, PASSWORD}  = data[0][0];
                if(await bcrypt.compare(passsword, PASSWORD)) {
                    return {userId: ID};
                }
                throw new Error('User not found');
            } else {
                throw new Error('User not found');
            }
        }).catch((err) => {
            throw err;
        });
}

const signUp = async (email, password) => {
    if(email && password) {
        let user = await userRepo.findByEmaiId(email).then(data => data[0]);
        if(user.length === 0) {
            const encryptedPassword = await bcrypt.hash(password, 10);
            return await userRepo.insertUser(email, encryptedPassword)
            .then(data => {
                if(data[0].affectedRows === 1) {
                    return {userId: data[0].insertId};
                }
            }).catch(err => {
                throw new Error(err);
            });
        } else {
            throw new Error('User already exist');
        }
    } else {
        throw new Error('Unexpected error occured');
    }
}

const test = async (password) => {
    return await bcrypt.hash(password, 10);
}

module.exports = {logIn, signUp, test}