import Board from '../Board';

export interface IInitial {
	color: string;
	position: string;
	board: Board;
}

let increment = 0;

export abstract class Figure {
	abstract icon: string;
	abstract position: string;
	abstract name: string;
	abstract history: string[];

	readonly color: string;
	readonly id: number;
	readonly board: Board;

	constructor(properties: IInitial) {
		this.board = properties.board;
		this.color = properties.color;

		this.id = increment++;
	}

	abstract availibleMoves(): string[];
	abstract couldAttack(): string[];
	abstract move(position: string): void;

	get lastPosition() {
		return this.history.at(-1);
	}
	get defaultPosition() {
		return this.history.at(0);
	}
}
