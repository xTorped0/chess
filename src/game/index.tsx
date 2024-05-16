import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { Board } from './Board';
import './styles.scss';
import { useBoard } from './useBoard';

export default function GamePage() {
	const { initialize, player } = useBoard(
		useShallow(({ initialize, playerMove }) => ({
			initialize,
			player: playerMove
		}))
	);

	useEffect(() => {
		initialize();
	}, []);

	return (
		<div className='relative flex flex-col justify-center items-center overflow-hidden'>
			<h1 className='text-black uppercase mb-2'>
				<strong className={`text-${player}`}> {player} </strong> turn!{' '}
			</h1>
			<Board />
		</div>
	);
}
