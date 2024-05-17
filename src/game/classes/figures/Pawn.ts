import { Figure, IInitial } from './Figure';

export class Pawn extends Figure {
	history: string[];
	position: string;
	icon = '♙';
	name = 'Pawn';

	constructor(properties: IInitial) {
		super(properties);

		this.position = properties.position;
		this.history = [properties.position];
	}

	get defaultPosition() {
		return this.history.at(0);
	}
	get lastPosition() {
		return this.history.at(-1);
	}

	availibleMoves() {
		const [x, y] = this.position.split('');

		const yDirection = this.color === 'white' ? 1 : -1;
		const y1 = +y + yDirection;
		const y2 = +y + 2 * yDirection;
		const xRight = +x + 1;
		const xLeft = +x - 1;

		const moves: string[] = [];

		if (xLeft >= 1) {
			const coord = `${xLeft}${y1}`;

			if (this.board.canMove(this, coord)) {
				const fieldLeft = this.board.getField(coord);
				if (fieldLeft && fieldLeft.color !== this.color) {
					moves.push(coord);
				}
			}
		}

		if (xRight <= 8) {
			const coord = `${xRight}${y1}`;

			if (this.board.canMove(this, coord)) {
				const fieldRight = this.board.getField(coord);
				if (fieldRight && fieldRight.color !== this.color) {
					moves.push(coord);
				}
			}
		}

		// Check field at y1 and y2 for pawn's initial move
		const coordY1 = `${x}${y1}`;
		const coordY2 = `${x}${y2}`;

		const fieldY1 = this.board.getField(coordY1);
		const fieldY2 = this.board.getField(coordY2);

		if (!fieldY2) {
			if (this.history.length === 1 && this.board.canMove(this, coordY2)) {
				moves.push(coordY2);
			}
		}

		if (!fieldY1) {
			if (
				this.board.canMove(this, coordY1) &&
				((this.color === 'white' && y1 < 8) ||
					(this.color === 'black' && y1 > 1))
			) {
				moves.push(coordY1);
			}
		}

		return moves;
	}

	couldAttack() {
		const [x, y] = this.position.split('');

		const yDirection = this.color === 'white' ? 1 : -1;

		const xRight = +x + 1;
		const xLeft = +x - 1;

		return [`${xRight}${+y + yDirection}`, `${xLeft}${+y + yDirection}`];
	}

	move(position: string) {
		if (this.availibleMoves().includes(position)) {
			this.position = position;
			this.board.setField(this);

			this.history.push(position);
		}
	}
}
