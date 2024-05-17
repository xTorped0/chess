import { Figure, IInitial } from './Figure';

export class King extends Figure {
	history: string[];
	position: string;
	icon = '♔';
	name = 'King';

	constructor(properties: IInitial) {
		super(properties);

		this.position = properties.position;
		this.history = [properties.position];

		this.icon = this.color !== 'white' ? '♚' : '♔';
	}

	get defaultPosition() {
		return this.history.at(0);
	}
	get lastPosition() {
		return this.history.at(-1);
	}

	availibleMoves(attack: boolean = false) {
		let [x, y] = this.position.split('').map(elem => +elem);
		const moves = [];

		const directions = [
			{ dx: 1, dy: 1 },
			{ dx: 1, dy: 0 },
			{ dx: -1, dy: 1 },
			{ dx: -1, dy: 0 },
			{ dx: 1, dy: -1 },
			{ dx: 0, dy: 1 },
			{ dx: -1, dy: -1 },
			{ dx: 0, dy: -1 }
		];

		for (const dir of directions) {
			const newX = x + dir.dx;
			const newY = y + dir.dy;

			if (newX >= 1 && newX <= 8 && newY >= 1 && newY <= 8) {
				const field = this.board.getField(`${newX}${newY}`);
				if (field?.color === this.color) continue;

				if (attack || this.canMoveTo(`${newX}${newY}`)) {
					moves.push(`${newX}${newY}`);
					continue;
				}
			}
		}

		return moves;
	}

	couldAttack() {
		return this.availibleMoves(true);
	}

	move(position: string) {
		// if (this.availibleMoves().includes(position)) {
		this.position = position;
		this.board.setField(this);

		this.history.push(position);
		// }
	}

	isUnderAttack() {
		const enemyFigures = [...this.board.fields]
			.map(([_, figure]) => figure)
			.filter(
				figure =>
					figure && figure.color !== this.color && figure.name !== 'King'
			) as Figure[];

		for (const figure of enemyFigures) {
			if (figure.couldAttack().includes(this.position)) {
				return true;
			}
		}

		return false;
	}

	private canMoveTo(position: string) {
		const enemyFigures = [...this.board.fields]
			.map(([_, figure]) => figure)
			.filter(figure => figure && figure.color !== this.color) as Figure[];

		for (const figure of enemyFigures) {
			if (figure.couldAttack().includes(position)) return false;
		}

		return true;
	}
}
