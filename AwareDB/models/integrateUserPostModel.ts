import { db } from "../dist/db";
import { OkPacket, RowDataPacket } from "mysql2"
import { callbackify } from "util";
import { error } from "console";
import { off } from "process";
import { UserDB } from "../types/User";
import { Integration } from "../types/Integration";

export const create = (integration: Integration, callback: Function) => {
    const queryString = 'INSERT INTO IntegrationUserPost VALUES (?, ?);'

    db.query(
        queryString,
        [
            integration.idUser,
            integration.idPost
        ],
        (err, result) => {
            if (err) { callback(err) }

            const insertId = (<OkPacket>result).insertId
            callback(null, insertId)
        }
    )
}


export const findAll = (idUser: number, callback: Function) => {
    const queryString =
    `SELECT idPost FROM IntegrationUserPost WHERE idUser = ?;`

    db.query(
        queryString,
        [idUser],
        (err, result) => {
            if (err) { callback(err) }

            const rows = <RowDataPacket[]>result
            const integrations: number[]= []

            rows.forEach(row => {
                integrations.push(row.idPost)
            }
            )
            callback(null, integrations)
        }
    )
}

export const deleteIntegration = (idUser: number, idPost: number, callback: Function) => {
    const queryString = `DELETE FROM IntegrationUserPost WHERE idUser = ? AND idPost = ?`

    db.query(queryString, [idUser, idPost], (error, result)=>{
        if(error) {
            callback(error)
        } else {
            callback(null)
        }
    })
}