import * as SQLite from "expo-sqlite"

let dbExport: SQLite.SQLiteDatabase
 const createDatabase = () => {
    const openDatabase = () => {
        const db = SQLite.openDatabase("db.db");
        return db;
    };

    const db = openDatabase();

    db.transaction((tx) => {
        tx.executeSql(
            `
            CREATE TABLE IF NOT EXISTS Users (
              id integer primary key not null,
              name text,
              email text unique,
              password text,
              date_of_birth text,
              state text,
              avatar string
            );`
        );
    })
    console.log("criando db");
    
    dbExport = db
}

export {createDatabase, dbExport}