import { Figure, IInitial } from './Figure';

export class Queen extends Figure {
	history: string[];
	position: string;
	icon = '♕';
	name = 'Queen';

	constructor(properties: IInitial) {
		super(properties);

		this.position = properties.position;
		this.history = [properties.position];

		this.icon = this.color !== 'white' ? '♛' : '♕';
	}

	get defaultPosition() {
		return this.history.at(0);
	}
	get lastPosition() {
		return this.history.at(-1);
	}

	availibleMoves(attack: boolean = false) {
		let [x, y] = this.position.split('').map(elem => +elem);
		const moves: string[] = [];

		const directions = [
			{ dx: 1, dy: 1 },
			{ dx: -1, dy: -1 },
			{ dx: 1, dy: -1 },
			{ dx: -1, dy: 1 }
		];

		for (const dir of directions) {
			let newX = x + dir.dx;
			let newY = y + dir.dy;

			while (newX >= 1 && newX <= 8 && newY >= 1 && newY <= 8) {
				const coord = `${newX}${newY}`;
				const field = this.board.getField(coord);

				if (attack || this.board.canMove(this, coord)) {
					if (field) {
						if (field.color === this.color) {
							break;
						} else {
							moves.push(coord);
							break;
						}
					}
					moves.push(coord);
				}
				newX += dir.dx;
				newY += dir.dy;
			}
		}

		const closerDir = [
			{ dx: 1, dy: 0 },
			{ dx: -1, dy: 0 },
			{ dx: 0, dy: 1 },
			{ dx: 0, dy: -1 }
		];

		for (const dir of closerDir) {
			let newX = x + dir.dx;
			let newY = y + dir.dy;

			while (newX >= 1 && newX <= 8 && newY >= 1 && newY <= 8) {
				const coord = `${newX}${newY}`;

				if (this.board.canMove(this, coord)) {
					const field = this.board.getField(`${newX}${newY}`);
					if (field) {
						if (field.color === this.color) {
							break;
						} else {
							moves.push(`${newX}${newY}`);
							break;
						}
					}
					moves.push(`${newX}${newY}`);
				}

				newX += dir.dx;
				newY += dir.dy;
			}
		}

		return moves;
	}

	couldAttack() {
		return this.availibleMoves(true);
	}

	move(position: string) {
		if (this.availibleMoves().includes(position)) {
			this.position = position;
			this.board.setField(this);

			this.history.push(position);
		}
	}
}
