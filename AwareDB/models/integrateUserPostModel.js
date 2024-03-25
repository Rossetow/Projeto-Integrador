"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteIntegration = exports.findAll = exports.create = void 0;
const db_1 = require("../dist/db");
const create = (integration, callback) => {
    const queryString = 'INSERT INTO IntegrationUserPost VALUES (?, ?);';
    db_1.db.query(queryString, [
        integration.idUser,
        integration.idPost
    ], (err, result) => {
        if (err) {
            callback(err);
        }
        const insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.create = create;
const findAll = (idUser, callback) => {
    const queryString = `SELECT * FROM IntegrationUserPost WHERE idUser = ?;`;
    db_1.db.query(queryString, [idUser], (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const integrations = [];
        rows.forEach(row => {
            const integration = {
                id: row.id,
                idUser: row.idUser,
                idPost: row.idPost,
            };
            integrations.push(integration);
        });
        callback(null, integrations);
    });
};
exports.findAll = findAll;
const deleteIntegration = (idUser, idPost, callback) => {
    const queryString = `DELETE FROM IntegrationUserPost WHERE idUser = ? AND idPost = ?`;
    db_1.db.query(queryString, [idUser, idPost], (error, result) => {
        if (error) {
            callback(error);
        }
        else {
            callback(null);
        }
    });
};
exports.deleteIntegration = deleteIntegration;
