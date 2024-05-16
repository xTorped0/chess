import { Figure, IInitial } from './Figure';

export class Knight extends Figure {
	history: string[];
	position: string;
	icon = '♘';
	name = 'Knight';

	constructor(properties: IInitial) {
		super(properties);

		this.position = properties.position;
		this.history = [properties.position];

		this.icon = this.color !== 'white' ? '♞' : '♘';
	}

	get defaultPosition() {
		return this.history.at(0);
	}
	get lastPosition() {
		return this.history.at(-1);
	}

	availibleMoves() {
		let [x, y] = this.position.split('').map(elem => +elem);
		const moves: string[] = [];

		const directions = [
			{ dx: 2, dy: 1 },
			{ dx: 2, dy: -1 },
			{ dx: 1, dy: 2 },
			{ dx: -1, dy: 2 },
			{ dx: -2, dy: 1 },
			{ dx: -2, dy: -1 },
			{ dx: 1, dy: -2 },
			{ dx: -1, dy: -2 }
		];

		for (const dir of directions) {
			const newX = x + dir.dx;
			const newY = y + dir.dy;

			if (newX >= 1 && newX <= 8 && newY >= 1 && newY <= 8) {
				const field = this.board.getField(`${newX}${newY}`);
				if (field?.color === this.color) continue;

				moves.push(`${newX}${newY}`);
			}
		}

		return moves;
	}

	couldAttack() {
		return this.availibleMoves();
	}

	move(position: string) {
		if (this.availibleMoves().includes(position)) {
			this.position = position;
			this.board.setField(this);

			this.history.push(position);
		}
	}
}
