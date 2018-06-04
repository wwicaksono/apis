import UserModel from "../models/UserModel";

class UserController{
    constructor(){};

    async create(req, res, next){

        const username = req.body.username || null;
        const password = req.body.password || null;

        try {
            const result = await UserModel.findOrCreate(
                {
                    where: {
                        username: username
                    },
                    defaults: {
                        password: password
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