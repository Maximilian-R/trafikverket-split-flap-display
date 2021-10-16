export interface Flap {
	content?: string;
	color?: string;
}

export const characterIds: string[] = [
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

export const characters: { [key: string]: Flap } = {
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

export const validate = (id: string) => (!!characters[id] ? id : ' ');
