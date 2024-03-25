"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.findAll = exports.findOne = exports.update = exports.create = void 0;
const db_1 = require("../dist/db");
const create = (user, callback) => {
    const queryString = 'INSERT INTO User VALUES (?, ?, ?, ?, ?, ?, ?)';
    db_1.db.query(queryString, [
        user.name,
        user.email,
        user.password,
        user.dateOfBirth,
        user.state,
        user.city,
        user.avatar
    ], (err, result) => {
        if (err) {
            callback(err);
        }
        const insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.create = create;
const update = (user, callback) => {
    const queryString = `UPDATE Costumer SET name=?, email=?, password=?, dateOfBirth=?, state=?, city=?, avatar=? WHERE id = ?`;
    db_1.db.query(queryString, [
        user.name,
        user.email,
        user.password,
        user.dateOfBirth,
        user.state,
        user.city,
        user.avatar,
        user.id
    ], (err, result) => {
        if (err) {
            callback(err);
        }
    });
};
exports.update = update;
const findOne = (userId, callback) => {
    const queryString = `
    SELECT 
        *
    FROM User
    
    WHERE User.id = ?
    `;
    db_1.db.query(queryString, userId, (err, result) => {
        if (err) {
            callback(err);
        }
        const row = result[0];
        const user = {
            id: row.id,
            name: row.name,
            email: row.email,
            password: row.password,
            dateOfBirth: row.dateOfBirth,
            state: row.state,
            city: row.city,
            avatar: row.avatar
        };
        callback(null, user);
    });
};
exports.findOne = findOne;
const findAll = (callback) => {
    const queryString = `SELECT * FROM User`;
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const users = [];
        rows.forEach(row => {
            const user = {
                id: row.id,
                name: row.name,
                email: row.email,
                password: row.password,
                dateOfBirth: row.dateOfBirth,
                state: row.state,
                city: row.city,
                avatar: row.avatar
            };
            users.push(user);
        });
        callback(null, users);
    });
};
exports.findAll = findAll;
const deleteUser = (costumerId, callback) => {
    const queryString = `DELETE FROM User WHERE id=?`;
    db_1.db.query(queryString, [costumerId], (error, result) => {
        if (error) {
            callback(error);
        }
        else {
            callback(null);
        }
    });
};
exports.deleteUser = deleteUser;
