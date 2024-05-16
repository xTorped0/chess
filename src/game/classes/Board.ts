import { boardFields } from '../utils';
import { Game } from './Game';
import { Figure } from './figures/Figure';

type Field = Figure | null;

class Board {
	fields: Map<string, Field> = new Map<string, Field>();
	game: Game;
	removedFigures: Figure[] = [];
	// element: HTMLDivElement;

	constructor(game: Game) {
		boardFields.x.forEach(x => {
			boardFields.y.forEach(y => {
				this.fields.set(`${x}${y}`, null);
			});
		});

		this.game = game;
	}

	initializeFields(figures: Figure[]) {
		figures.forEach(figure => {
			this.fields.set(figure.position, figure);
		});
	}

	getField(field: string): Field | undefined {
		return this.fields.get(field);
	}

	setField(figure: Field): Field | undefined {
		if (!figure || figure.color !== this.game.move) return;

		this.fields.set(figure.lastPosition!, null);

		const fieldFigure = this.fields.get(figure.position);
		if (fieldFigure) this.removedFigures.push(fieldFigure);

		this.fields.set(figure.position, figure);

		this.game.onMoveEnd();

		return fieldFigure;
	}

	canMove(figure: Figure, position: string): boolean {
		const king = this.game.getKing(figure.color)!;

		// new position
		const field = this.getField(position);
		this.fields.set(position, figure);
		this.fields.set(figure.position, null);

		const isUnderAttack = king.isUnderAttack();

		// restore old position
		this.fields.set(figure.position, figure);
		this.fields.set(position, field!);

		return !isUnderAttack;
	}

	// private insertIcon(figure: Field) {
	// 	if (figure) {
	// 		const field = this.element.querySelector<HTMLDivElement>(
	// 			`[data-field="${figure.position}"]`
	// 		)!;
	// 		field.innerHTML = figure.icon;
	// 	}
	// }

	// private removeIcon(position: string) {
	// 	const field = this.element.querySelector<HTMLDivElement>(
	// 		`[data-field="${position}"]`
	// 	)!;
	// 	field.innerHTML = '';
	// }
}

export default Board;
