import { Router } from 'express';

class UserController {
    router;
    path = "/users";
    users = [
        {
            id : 1,
            name : "asdf",
            age : 12,
        },
    ];
    constructor(){
        this.router = Router();
        this.init();
    }

    init(){
        this.router.get("/", this.getUsers.bind(this));
        this.router.get("/detail/:id", this.getUser.bind(this));
        this.router.post("/", this.createUser.bind(this));
        this.router.patch("/:id", this.updateUser.bind(this));
        this.router.delete("/:id", this.deleteUser.bind(this));
    }

    getUsers(req, res, err){
        try{
            res.status(200).json({users : this.users});
        } catch (err){
            next(err);
        }
    }

    getUser(req, res, next){
        try{
            const {id} = req.params;
            const user = this.users.find((user)=>user.id === Number(id));

            if(!user){
                throw {status: 404, message: "유저를 찾을 수 없습니다."};
            }
            res.status(200).json({user});

        }catch(err){
            next(err);
        }
    }

    createUser(req, res, next){
        try{
            const {name, age} = req.body;
            this.users.push({
                id : new Date().getTime(),
                name,
                age,
            });
            res.status(201).json({users : this.users});
        } catch(err){
            next(err);
        }
    }

    updateUser(req, res, next){
        try{
            const {name, age} = req.body;
            const {id} = req.params;
            const targetUserIdx = this.users.findIndex((user)=>user.id === Number(id));
            if(!targetUserIdx){
                throw {status : 404, massage : "유저가 존재하지 않습니다."};
            }

            this.users[targetUserIdx] = {
                id : this.users[targetUserIdx].id,
                name : name ?? this.users[targetUserIdx].name,
                age : age ?? this.users[targetUserIdx].age,
            };

            res.status(204).json({});
        } catch(err){
            next(err);
        }
    }

    deleteUser(req, res, next){
        try{
            const {id} = req.params;
            this.users = filterdUser;
            res.status(204).json({});

        } catch(err){
            next(err);
        }
    }
}

const userController = new UserController();
export default userController;