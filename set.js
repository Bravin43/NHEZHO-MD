const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR01GZnhnSzdHUkpVWVpMM1hUYmhXblh2OWJVYks3cDRNaXZHSWFoWmRWMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiN0lUNFJ1NVR0bWhMQ0w2STFIK29TMVg1V3RYYno0azNpQVNRNXBOdDRFdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpT2ZDQ0R6NHJWN1EwdUIxQ0t6UEVzWHFWOGlHdUZUK25rbkxzK3RHT1ZVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5ZWllSzhoL2dFRWJmVXFHUTRkZlNMY1AxaEZXQUF0V3h3b0Z0aUp6eno4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRBQ01JYVh4TGVnK0Y4MVJ2aEJJQUtJRDEya1NTdmZZa0lCOGpjOGdBRkk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjFzV0h2MkdCVXoyNjNMRXdQUVo4VDRZSGxURTZNVlN6UUkxVzluWGxtVXM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUU1ZWsyQm13ZFE0VHJLbm5wL0RDNk1aZi9Na2hidzVCNzBObjVYRjFGVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSkRQbkhCY2RJVkh3bnN5REJ2VEVGcmlBM2x3ZDVpWXEzZW9Hc0tEamxrND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhBTDNrVHdCeWJaNldEKzZXa2FXQ3BxSTNaQWl3bzhaMmdyMWtwV0lTeURvTXh3NTZheG9zM1dzSlZRTkdoWkliVGFnU0pGNzZHT0N2emU2UGw1b2p3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjAxLCJhZHZTZWNyZXRLZXkiOiJFNnV1SDRJY0VNdExHeEllV3hITmlqQXo4Q3lSUmlvTVRHamtkUzhZRFlFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJKMjFLUFlHOVJXR19KZ3NaV1daV2FRIiwicGhvbmVJZCI6Ijc5ZTAzYjRlLTk0MTAtNDU3YS1iMDk5LWViN2I3N2JkZTc3YSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtZzRWSjJOaEFET1JRS012S0pSQlp6RHQvYTQ9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidldnZkhmWGoyZCtHWi8xZDZJcC9nTW9Menc0PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkVUVldYTjdDIiwibWUiOnsiaWQiOiIyNTQ3NDA0Mzk0MTY6OUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJ2ZXRlcmFuIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOUHM0SW9HRUtydnpyd0dHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJobjA1OXVlbUUwT21lTU1hRUJaaDF0MXRxak1GK1Z5QjgwanBjZ01wRWhNPSIsImFjY291bnRTaWduYXR1cmUiOiJ4Q1YyQ1d3UklDdG1EZ2wwcGlvemM5cURjUFhjbDdPa211Q0ZVTmM0UnMwN3BxL3ZMSklaZlVVM09pY2hrWjdOVy9wVWVxUVdNc2tSM25sc2I4VGFBdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiV0Zhb3IrN3B0eHpKV0ZzWFcwWXBoSkxEOFNaVEp2U2RxWXJxa0lBVjd4UTE2bFRtNzZpb25PclVnM3NtL2p3L0FpUVF5WXZ0aDFJeHVJRkxObGhVZ2c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3NDA0Mzk0MTY6OUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZWjlPZmJucGhORHBuakRHaEFXWWRiZGJhb3pCZmxjZ2ZOSTZYSURLUklUIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM3NzM0MDczfQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    ANTICALL: process.env.ANTICALL || 'yes',
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    AUTOREAD_MESSAGE : process.env.AUTO_READ || "yes",
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TECH : process.env.AUTO_REACT_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
