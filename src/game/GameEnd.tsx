import { useShallow } from 'zustand/react/shallow';

import { King } from './classes/figures/King';
import { useBoard } from './useBoard';

export function GameEnd() {
	const { checkmate, stalemate } = useBoard(
		useShallow(({ checkmate, stalemate }) => ({
			checkmate,
			stalemate
		}))
	);

	return (
		<div className='absolute inset-0 flex justify-center items-center bg-black bg-opacity-50'>
			<div className='p-4 bg-white rounded-lg'>
				{checkmate && (
					<h1 className='text-red-600 text-2xl'>
						{checkmate.color} {checkmate instanceof King ? 'king' : 'queen'} is
						checkmated!
					</h1>
				)}
				{stalemate && <h1 className='text-red-600 text-2xl'>Stalemate!</h1>}
			</div>

			<button
				onClick={() => {
					useBoard.getState().initialize();
				}}
				className='absolute top-4 right-4 px-4 py-2 bg-white rounded-lg'
			>
				New Game
			</button>
		</div>
	);
}
