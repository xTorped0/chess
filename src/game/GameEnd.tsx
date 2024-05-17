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
		<div className='absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 \'>
			<div className='p-4 bg-white rounded-lg flex flex-col justify-center items-center gap-4'>
				{checkmate && (
					<h1 className='text-red-600 text-2xl'>
						{checkmate.color} {checkmate instanceof King ? 'king' : 'queen'} is
						checkmated!
					</h1>
				)}
				{stalemate && <h1 className='text-red-600 text-2xl'>Stalemate!</h1>}

				<button
					onClick={() => {
						useBoard.getState().initialize();
					}}
					className='top-4 right-4 px-4 py-2 bg-white rounded-lg border-2 border-blue-600 text-blue-600'
				>
					New Game
				</button>
			</div>
		</div>
	);
}
