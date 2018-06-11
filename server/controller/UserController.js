import UserModel from "../models/UserModel";
import UserFacade from "../facade/UserFacade";
import passport from "passport";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class UserController {

    constructor() {
    };

    async create(req, res, next) {

        const username = req.body.username || null;
        const password = req.body.password || null;

        let hash = null;
        if (password)
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

            if (result[1]) {
                res.json('user created');
            }
            else {
                res.json('username exists');
            }

        } catch (error) {
            res.json('error');
            throw error;
        }
    }

    async get(req, res, next) {

        const id = req.params.id || null;

        const users = id ? await UserModel.findById(id) : await UserModel.findAll();

        res.json(
            users
        );
    }

    delete(req, res, next) {
        res.status(200).json('deleted');
    }

    async verify(req, res, next) {
        const userFacade = new UserFacade();
        const validation = await userFacade.validateOnCreate(req.body);

        if (typeof validation === 'string') {
            return res.json({
                status: false,
                message: validation
            });
        }
        else {
            passport.authenticate('local', { session: false }, (err, user, info) => {
                if (err || !user) {
                    console.error(err);
                    return res.status(500).json({
                        status: false,
                        message: err || 'user not exist',
                        user: user
                    });
                }

                req.login(user, { session: false }, (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send(err);
                    }

                    jwt.sign(user.toJSON(), process.env.SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
                        if(err){
                            console.error(err);
                            return res.status(500).json({
                                status: false,
                                message: err
                            });
                        }
                        return res.json({ status: true, message: token });
                    });
                });
            })(req, res);
        }
    }
}

export default UserController;