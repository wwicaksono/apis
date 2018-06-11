import bcrypt from "bcrypt";

class UserFacade{

    constructor(){}

    /**
     * Validate on create new user
     * @param {username, password} params 
     * @return {mixed}
     */
    async validateOnCreate(params){
                
        let result = {};

        if(params.username && params.password){
            result.username = params.username;
            result.password = params.password;

            return result;
        }
        else if(!params.username){
            return 'username not provided';
        }
        else{
            return 'password not provided';
        }
    }
}

export default UserFacade;