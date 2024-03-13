import { db } from "../dist/db";
import { OkPacket, RowDataPacket } from "mysql2"
import { callbackify } from "util";
import { error } from "console";
import { off } from "process";
import { UserDB } from "../types/User";

export const create = (user: UserDB, callback: Function) => {
    const queryString = 'INSERT INTO User (name, email, password, dateOfBirth, state, city, avatar) VALUES (?, ?, ?, ?, ?, ?, ?)'

    db.query(
        queryString,
        [
            user.name,
            user.email,
            user.password,
            user.dateOfBirth,
            user.state,
            user.city,
            user.avatar
        ],
        (err, result) => {
            if (err) { callback(err) }

            const insertId = (<OkPacket>result).insertId
            callback(null, insertId)
        }
    )
}

export const update = (user: UserDB, callback: Function) => {
    const queryString = `UPDATE Costumer SET name=?, email=?, password=?, dateOfBirth=?, state=?, city=?, avatar=? WHERE id = ?`

    db.query(
        queryString,
        [
            user.name,
            user.email,
            user.password,
            user.dateOfBirth,
            user.state,
            user.city,
            user.avatar,
            user.id
        ],
        (err, result) => {
            if (err) { callback(err) }
        }
    )
}

export const findOne = (userId: number, callback: Function) => {
    const queryString = `
    SELECT 
        *
    FROM User
    
    WHERE User.id = ?
    `

    db.query(
        queryString, userId, (err, result) => {
            if (err) { callback(err) }

            const row = (<RowDataPacket>result)[0]
            const user: UserDB = {
                id: row.id,
                name: row.name,
                email: row.email,
                password: row.password,
                dateOfBirth: row.dateOfBirth,
                state: row.state,
                city: row.city,
                avatar: row.avatar
            }
            callback(null, user)
        }
    )
}

export const findAll = (callback: Function) => {
    const queryString =
    `SELECT * FROM User`

    db.query(
        queryString, (err, result) => {
            if (err) { callback(err) }

            const rows = <RowDataPacket[]>result
            const users: UserDB[] = []

            rows.forEach(row => {
                const user: UserDB = {
                    id: row.id,
                    name: row.name,
                    email: row.email,
                    password: row.password,
                    dateOfBirth: row.dateOfBirth,
                    state: row.state,
                    city: row.city,
                    avatar: row.avatar
                }
                users.push(user)
            }
            )
            callback(null, users)
        }
    )
}

export const deleteUser = (costumerId: number, callback: Function) => {
    const queryString = `DELETE FROM User WHERE id=?`

    db.query(queryString, [costumerId], (error, result)=>{
        if(error) {
            callback(error)
        } else {
            callback(null)
        }
    })
}