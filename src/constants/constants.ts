const DEFAULT_COUNT_LIMIT = 10;

const DEFAULT_OFFSET = 0;

enum CollectionName {
	ROOM = 'room',
	SCHEDULE = 'reservation',
	USERS = 'users',
}

enum MessageReply {
	BUSY = 'Room is busy',
	INVALID_DATE = 'Invalid date',
}

enum Role {
	ADMIN = 'admin',
	USER = 'user',
}

enum USER_STATUS {
	EXISTS = `User with email already exists`,
	NOT_EXISTS = `User with email not exists`,
	INVALID_PASSWORD = `Invalid password`,
}

enum STATISC {
	MONTH_ERROR = 'Invalid month name',
}

export {
	DEFAULT_COUNT_LIMIT,
	DEFAULT_OFFSET,
	CollectionName,
	MessageReply,
	Role,
	USER_STATUS,
	STATISC,
};
