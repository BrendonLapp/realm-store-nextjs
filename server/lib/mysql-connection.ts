const mysql = require('mysql');
import { Connection } from 'mysql';

const connectToDB = (): Connection => {
  try {
    const connection = mysql.createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    });

    return connection;
  } catch (error) {
    console.log(error);
  }
};

export { connectToDB };
