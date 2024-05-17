import clsx from 'clsx';
import { useShallow } from 'zustand/react/shallow';

import { useBoard } from './useBoard';

export function LostFigures() {
	const deletedFigures = useBoard(useShallow(store => store.deletedFigures));

	return (
		<div className='flex justify-center bg-opacity-50'>
			{deletedFigures?.map(figure => (
				<div
					key={figure.id}
					className={clsx('figure animation-opacity hover:cursor-pointer w-6', {
						'text-white': figure?.color === 'white',
						'text-black': figure?.color === 'black'
					})}
				>
					{figure.icon}
				</div>
			))}
		</div>
	);
}
