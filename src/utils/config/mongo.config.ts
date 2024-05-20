const { DB_USERNAME, DB_PASSWORD, DB_PORT, MONGO_HOST } = process.env;

const mongoHost = MONGO_HOST || '127.0.0.1';

const UserDB = DB_USERNAME || 'purpleschool';
const PasswordDB = DB_PASSWORD || 'purpleschool123';
const Port = DB_PORT || 47018;

export const getUri = () =>
	`mongodb://${UserDB}:${PasswordDB}@${mongoHost}:${Port}?directConnection=true`;
