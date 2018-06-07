import UserModel from "../models/UserModel";
import UserFacade from "../facade/UserFacade";
import bcrypt from "bcrypt";

class UserController{

    constructor(){
    };

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

        const id = req.params.id || null;

        const users = id ? await UserModel.findById(id) : await UserModel.findAll();

        res.json(
            users
        );
    }

    delete(req, res, next){
        res.status(200).json('deleted');
    }

    async verify(req, res, next){

        const userFacade = new UserFacade();
        const validation = await userFacade.validateOnCreate(req.body);

        if(typeof validation === 'string'){
            return res.json({
                status: false,
                message: validation
            });
        }
        else{
            try {
                const user_data = await UserModel.findOne({where: {username: validation.username}});

                if(user_data){
                    const result = await bcrypt.compare(req.body.password, user_data.password);
                    
                    if(result)
                        return res.json({
                            status: true,
                            message: 'valid'
                        });
                }
            } catch (error) {
                console.error(error);
                return res.status(500).json({
                    status: false,
                    message: error.message
                })
            }

            return res.json({
                status: false,
                message: 'not valid'
            });
        }
    }
}

export default UserController;