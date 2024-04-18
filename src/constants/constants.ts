const DEFAULT_COUNT_LIMIT = 10;

const DEFAULT_OFFSET = 0;

enum CollectionName {
	ROOM = 'room',
	SCHEDULE = 'reservation',
	COUNTERS = 'counters',
}

enum CounterName {
	ROOM = 'room',
	SCHEDULE = 'reservation',
}

enum MessageReply {
	BUSY = 'Room is busy',
	INVALID_DATE = 'Invalid date',
}

export { DEFAULT_COUNT_LIMIT, DEFAULT_OFFSET, CollectionName, CounterName, MessageReply };
