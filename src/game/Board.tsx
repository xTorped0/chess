import clsx from 'clsx';
import { useShallow } from 'zustand/react/shallow';

import { FigureElement } from './Figure';
import { useBoard } from './useBoard';
import { boardFields } from './utils';

export function Board() {
	const { fields, currentFigure, player } = useBoard(
		useShallow(state => ({
			fields: state.fields,
			player: state.playerMove,
			currentFigure: state.currentFigure
		}))
	);

	const { x, y } = boardFields;

	const availableMoves = currentFigure?.availibleMoves();

	return (
		<div
			className={clsx(
				'board grid border-navy-400 border rounded-sm grid-cols-8 grid-rows-8 transform transition-transform duration-300 ease-in-out',
				{
					'rotate-180': player === 'white'
				}
			)}
		>
			{y.map(y => {
				const isEvenY = +y % 2 === 0;

				return x.map((x, xind) => {
					const id = `${x}${y}`;
					const isEvenX = (xind + 1) % 2 === 0;

					return (
						<div
							key={id}
							data-field={id}
							className={clsx('field', {
								'bg-navy-400': (isEvenX && isEvenY) || (!isEvenX && !isEvenY)
							})}
						>
							<FigureElement
								id={id}
								availableMoves={availableMoves}
								figure={fields?.get(`${x}${y}`)}
							/>
						</div>
					);
				});
			})}
		</div>
	);
}
