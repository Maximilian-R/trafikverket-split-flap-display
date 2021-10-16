export interface IFlapFace {
	content?: string;
	color?: string;
}

export interface IFlap {
	target: string;
	next: string;
	current: string;
	color?: string;
}

export type ISplitFlapSize = [number, number];

export type ISplitFlapInput = string[][];

export type ISplitFlapGrid = IFlap[][];
