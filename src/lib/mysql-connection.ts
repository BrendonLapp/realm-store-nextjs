import mysql from 'mysql';

const connectToDB = () => {
  try {
    const connection = mysql.createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    });

    return connection;
  } catch (error) {
    console.error(error);
  }
};

export { connectToDB };
