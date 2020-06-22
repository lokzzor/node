module.exports = {
  HOST: "localhost",
  USER: "calendar",
  PASSWORD: "calendar",
  DB: "calendardb",
  dialect: "postgresql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
