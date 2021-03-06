import { IFlap, IFlapFace, ISplitFlapGrid, ISplitFlapInput } from './flap.interface';

export class Flap {
	static IDS: string[] = [
		' ',
		'A',
		'B',
		'C',
		'D',
		'E',
		'F',
		'G',
		'H',
		'I',
		'J',
		'K',
		'L',
		'M',
		'N',
		'O',
		'P',
		'Q',
		'R',
		'S',
		'T',
		'U',
		'V',
		'W',
		'X',
		'Y',
		'Z',
		'Å',
		'Ä',
		'Ö',
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'0',
		'!',
		'@',
		'#',
		'$',
		'(',
		')',
		'^',
		'-',
		'_',
		'+',
		'&',
		'=',
		';',
		':',
		'*',
		"'",
		'"',
		',',
		'.',
		'<',
		'>',
		'/',
		'\\',
		'?',
		'%',
		'°',
		'•',
		'r',
		'g',
		'b',
		'y',
	];
	static FIRST = Flap.IDS[0];
	static FACES: { [key: string]: IFlapFace } = {
		A: { content: 'A' },
		B: { content: 'B' },
		C: { content: 'C' },
		D: { content: 'D' },
		E: { content: 'E' },
		F: { content: 'F' },
		G: { content: 'G' },
		H: { content: 'H' },
		I: { content: 'I' },
		J: { content: 'J' },
		K: { content: 'K' },
		L: { content: 'L' },
		M: { content: 'M' },
		N: { content: 'N' },
		O: { content: 'O' },
		P: { content: 'P' },
		Q: { content: 'Q' },
		R: { content: 'R' },
		S: { content: 'S' },
		T: { content: 'T' },
		U: { content: 'U' },
		V: { content: 'V' },
		W: { content: 'W' },
		X: { content: 'X' },
		Y: { content: 'Y' },
		Z: { content: 'Z' },
		Å: { content: 'Å' },
		Ä: { content: 'Ä' },
		Ö: { content: 'Ö' },
		'0': { content: '0' },
		'1': { content: '1' },
		'2': { content: '2' },
		'3': { content: '3' },
		'4': { content: '4' },
		'5': { content: '5' },
		'6': { content: '6' },
		'7': { content: '7' },
		'8': { content: '8' },
		'9': { content: '9' },
		' ': { content: ' ' },
		'!': { content: '!' },
		'@': { content: '@' },
		'#': { content: '#' },
		// prettier-ignore
		'$': { content: '$' },
		'(': { content: '(' },
		')': { content: ')' },
		'^': { content: '^' },
		'-': { content: '-' },
		// prettier-ignore
		'_': { content: '_' },
		'+': { content: '+' },
		'&': { content: '&' },
		'=': { content: '=' },
		';': { content: ';' },
		':': { content: ':' },
		'*': { content: '*' },
		"'": { content: "'" },
		'"': { content: '"' },
		',': { content: ',' },
		'.': { content: '.' },
		'<': { content: '<' },
		'>': { content: '>' },
		'/': { content: '/' },
		'\\': { content: '\\' },
		'?': { content: '?' },
		'%': { content: '%' },
		'°': { content: '°' },
		'•': { content: '•' },
		r: { content: ' ', color: 'red' },
		g: { content: ' ', color: 'green' },
		b: { content: ' ', color: 'blue' },
		y: { content: ' ', color: 'yellow' },
	};

	static create(face: string, color?: string): IFlap {
		return {
			target: Flap.validate(face),
			next: Flap.FIRST,
			current: Flap.FIRST,
			color: color,
		};
	}

	static next(id: string): string {
		return Flap.IDS[Flap.IDS.indexOf(id) + 1] || Flap.FIRST;
	}

	static validate(id: string): string {
		return !!Flap.FACES[id] ? id : Flap.FIRST;
	}
}

export class Grid {
	static create(data: ISplitFlapInput): ISplitFlapGrid {
		return data.map((row) => row.map((col) => Flap.create(col)));
	}

	static update(grid: ISplitFlapGrid, data: ISplitFlapInput): void {
		grid.forEach((row, x) =>
			row.forEach((col, y) => {
				col.target = Flap.validate(data[x][y]);
			})
		);
	}

	static flip(data: ISplitFlapGrid): IFlap[] {
		return data
			.flatMap((col) => col)
			.filter((flap) => {
				return flap.target !== flap.current;
			});
	}
}
