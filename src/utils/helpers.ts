import { TransformFnParams } from 'class-transformer';

export const transformToBoolean = ({ value }: TransformFnParams): boolean => {
	if (typeof value === 'boolean') return value;
	value = value.toLowerCase().trim();
	return value === 'true';
};

export const transformToNumber = ({ value }: TransformFnParams): number => {
	if (typeof value === 'number') return value;
	return Number(value);
};

export const transformToDate = ({ value }: TransformFnParams): Date => {
	return new Date(value);
};
