import { useShallow } from 'zustand/react/shallow';

import { useBoard } from './useBoard';

export function NewGame() {
	const initialize = useBoard(useShallow(store => store.initialize));

	return (
		<div className='absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50'>
			<div className='p-4 bg-white rounded-lg flex flex-col justify-center items-center gap-4'>
				<h1 className='text-blue-600 text-2xl'> Lets start!</h1>

				<button
					onClick={() => {
						initialize();
					}}
					className='top-4 right-4 px-4 py-2 bg-white rounded-lg  border-2 border-blue-600 text-blue-600'
				>
					New Game
				</button>
			</div>
		</div>
	);
}
