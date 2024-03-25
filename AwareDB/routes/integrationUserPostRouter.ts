import express, { Request, Response } from 'express'
import * as integrationModel from "../models/integrateUserPostModel"
import { UserDB } from '../types/User';
import { Integration } from '../types/Integration';



const integrationRouter = express.Router();

integrationRouter.get('/:id', async (req: Request, res: Response) => {
    const id: number = Number(req.params.id)

    integrationModel.findAll(id,(err: Error, integration: Integration[]) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message })
        }

        res.status(200).json({ "dataIntegration": integration })
    })
})

integrationRouter.post('/', async (req: Request, res: Response) => {
    const newIntegration: Integration = req.body
    integrationModel.create(newIntegration, (err: Error, id: number) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message })
        }

        res.status(200).json({ "integration": id })
    })
})

integrationRouter.get('/:id', async (req: Request, res: Response) => {
    const idUser: number = Number(req.params.id);

    integrationModel.findAll(idUser, (err: Error, user: UserDB) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message })
        }

        res.status(200).json({ "integration": user })
    })
})

integrationRouter.delete('/:idUser_:idPost', async(req: Request, res: Response) => {
    const idUser: number = Number(req.params.idUser);
    const idPost: number = Number(req.params.idPost)

    integrationModel.deleteIntegration(idUser, idPost, (err: Error) => {
        if(err) {
            return res.status(500).json({ "errorMessage": err.message })
        }

        res.status(200).json({ "message" : "Integration deleted successfully" })
    })
})


export { integrationRouter }