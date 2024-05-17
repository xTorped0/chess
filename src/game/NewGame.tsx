import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useBoard } from './useBoard';

export function NewGame() {
	const initialize = useBoard(useShallow(store => store.initialize));

	useEffect(() => {
		initialize();
	}, []);

	return (
		<div className='absolute inset-0 flex justify-center items-center bg-black bg-opacity-50'>
			<div className='p-4 bg-white rounded-lg'>
				<h1 className='text-blue-600 text-2xl'> Lets start!</h1>
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
