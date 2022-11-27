const profileRepo = require('../repos/ProfileRepo');

const mysql = require('mysql');


const getUserDetail = async (userId) => {
    console.log("Inside Profile Service"+userId)
    return await profileRepo.findProfile(userId).then((data) => {
        console.log(data[0]);
        if(data[0].length>0) {
                console.log("Inside Profile Service inside check ")   ;

               return data[0];
            
        } else {
            throw new Error('User not found');
        } 
      
           return data[0];
        
    });
    
}
const saveUserDetail = async (user_profile) => {
    console.log("Inside Profile Service"+user_profile)
    return await profileRepo.saveProfile(user_profile).then((data) => {
        console.log(data[0]);
        
        if(data[0].length>0) {
                console.log("Inside Profile Service inside check ")   ;

               return data[0];
            
        } else {
            throw new Error('User not found');
        } 
      
           return data[0];
        
    });
    
}

module.exports = {getUserDetail,saveUserDetail}