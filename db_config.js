const DB_conf={
    HOST:process.env.DB_HOST,
    PASSWROD:process.env.DB_PASSWORD,
    USER:process.env.DB_USER,
    DATABASE:process.env.DB_DATABASE,
    PORT:process.env.DB_PORT,
}
module.exports = DB_conf