import { ISplitFlapInput } from '../flaps/flap.interface';
import { Flap } from '../flaps/flaps';

export const TEMPLATE_EMPTY_GRID = (rows: number, columns: number): ISplitFlapInput => {
	return Array.from({ length: rows }, () => Array.from(Flap.FIRST_FLAP.repeat(columns)));
};
