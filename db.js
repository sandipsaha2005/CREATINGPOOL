const { Pool} = require('pg')
const  DB_conf  = require('./db_config')

const createPoolWithRelease = (config) => {
  const pool = new Pool(config);
  pool.connect((err, client, release) => {
    if (err) throw err;
    console.log("Database connected successfully");
    release();
  });
  pool.on('release', () => {
    console.log('Client released');
  });
  return pool;
};

const createConnectionPool = (config) => {
  const pool = createPoolWithRelease({
    ...config,
    max: 2, // Set the maximum number of clients in the pool
    idleTimeoutMillis: 10000, // Set the idle timeout to 10 seconds (adjust as needed)
  });

  return pool;
};

const pool_main = createConnectionPool({
  host: 'localhost',
  user: 'postgres',
  database: 'sandipsaha',
  password: 'sandip2005saha',
  port: 5432
});

const queryDb = async (pool, query, params = []) => {
  const client = await pool.connect();
  try {
    const res = await client.query(query, params);
    return res.rows;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
    query_maindb: async (query, params) => queryDb(pool_main, query, params),
    pool_main,
  };