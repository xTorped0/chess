import { useShallow } from 'zustand/react/shallow';

import { Board } from './Board';
import { GameEnd } from './GameEnd';
import { NewGame } from './NewGame';
import './styles.scss';
import { useBoard } from './useBoard';

export default function GamePage() {
	const { game, player, checkmate, stalemate } = useBoard(
		useShallow(({ game, playerMove, checkmate, stalemate }) => ({
			game,
			player: playerMove,
			checkmate,
			stalemate
		}))
	);

	return (
		<div className='relative flex flex-col justify-center items-center overflow-hidden'>
			<h1 className='text-black uppercase mb-2'>
				<strong className={`text-${player}`}> {player} </strong> turn!{' '}
			</h1>
			<Board />
			{!game && <NewGame />}
			{(checkmate || stalemate) && <GameEnd />}
		</div>
	);
}
