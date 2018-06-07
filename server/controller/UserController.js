import UserModel from "../models/UserModel";
import bcrypt from "bcrypt";

class UserController{
    constructor(){};

    async create(req, res, next){

        const username = req.body.username || null;
        const password = req.body.password || null;
        let hash = null;
        if(password)
            hash = await bcrypt.hash(password, 5);

        try {
            const result = await UserModel.findOrCreate(
                {
                    where: {
                        username: username
                    },
                    defaults: {
                        password: hash
                    }
                }
            );

            if(result[1]){
                res.json('user created');
            }
            else{
                res.json('username exists');
            }

        } catch (error) {
            res.json('error');
            throw error;
        }
    }

    async get(req, res, next){
        const users = await UserModel.findAll();
        res.json(
            users
        );
    }

    delete(req, res, next){
        res.status(200);
    }
}

export default UserController;