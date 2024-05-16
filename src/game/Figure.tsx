import clsx from 'clsx';
import { useShallow } from 'zustand/react/shallow';

import { Figure } from './classes/figures/Figure';
import { useBoard } from './useBoard';

interface IFigureProps {
	figure?: Figure | null;
	id: string;
	availableMoves?: string[];
}
export function FigureElement(props: IFigureProps) {
	const { takeFigure, currentFigure, playerMove, checked } = useBoard(
		useShallow(state => ({
			playerMove: state.playerMove,
			checked: state.checked,
			takeFigure: state.takeFigure,
			currentFigure: state.currentFigure
		}))
	);

	const { figure, id, availableMoves } = props;

	const isCurrent = currentFigure === figure;
	const isMovePosition = availableMoves?.includes(id);
	const isBgRed = checked === figure;

	function handleClick() {
		if (isMovePosition) {
			currentFigure?.move(id);
			return;
		}

		takeFigure(
			currentFigure !== figure &&
				playerMove === figure?.color &&
				(!checked || checked === figure)
				? figure!
				: null
		);
	}

	if (!figure)
		return (
			<EmptyFigure
				id={id}
				availableMoves={availableMoves}
			/>
		);

	return (
		<div
			onClick={handleClick}
			className={clsx('figure animation-opacity hover:cursor-pointer', {
				'text-white': figure?.color === 'white',
				'text-black': figure?.color === 'black',
				'hover:cursor-not-allowed': figure?.color !== playerMove,
				'border-4 border-red-400': isCurrent,
				'border-4 border-red-600': !isCurrent && isMovePosition,
				'bg-red-800': isBgRed
			})}
		>
			{figure?.icon}
		</div>
	);
}

function EmptyFigure(props: IFigureProps) {
	const { clear, figure } = useBoard(
		useShallow(state => ({
			clear: state.clearMoves,
			figure: state.currentFigure
		}))
	);

	const { id, availableMoves } = props;

	const isMovePosition = availableMoves?.includes(id);

	function handleClick() {
		if (!isMovePosition) clear();
		else figure?.move(id);
	}

	return (
		<div
			className={clsx('figure animation-opacity', {
				'border-4 border-green-400 cursor-pointer': isMovePosition
			})}
			onClick={handleClick}
		></div>
	);
}
