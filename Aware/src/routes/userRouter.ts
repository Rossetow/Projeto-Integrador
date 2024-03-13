import express, { Request, Response } from 'express'
import * as userModel from "../Models/userModel"
import { UserDB } from '../types/User';

const userRouter = express.Router();

userRouter.get('/', async (req: Request, res: Response) => {
    userModel.findAll((err: Error, user: UserDB[]) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message })
        }

        res.status(200).json({ "dataUser": user })
    })
})

userRouter.post('/', async (req: Request, res: Response) => {
    const newUser: UserDB = req.body
    userModel.create(newUser, (err: Error, id: number) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message })
        }

        res.status(200).json({ "user_id": id })
    })
})

userRouter.get('/:id', async (req: Request, res: Response) => {
    const user: number = Number(req.params.id)
    userModel.findOne(user, (err: Error, user: UserDB) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message })
        }

        res.status(200).json({ "userProduct": user })
    })
})

userRouter.put('/:id', async (req: Request, res: Response) => {
    const user: UserDB = req.body
    userModel.update(user, (err: Error) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message })
        }

        res.status(200).send()
    })
})

userRouter.delete('/:id', async(req: Request, res: Response) => {
    const user: number = Number(req.params.id)

    userModel.deleteUser(user, (err: Error) => {
        if(err) {
            return res.status(500).json({ "errorMessage": err.message })
        }

        res.status(200).json({ "message" : "User deleted successfully" })
    })
})


export { userRouter }