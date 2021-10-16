import { ISplitFlapInput } from '../flaps/flap.interface';

export const splitRows = (rows: string[]): ISplitFlapInput => {
	return rows.map((row) => row.split(''));
};
