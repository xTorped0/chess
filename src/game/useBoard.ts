import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { Game } from './classes/Game';
import { Figure } from './classes/figures/Figure';

interface IStore {
	game?: Game;
	fields?: Map<string, Figure | null>;
	// availibleMoves?: string[];
	currentFigure?: Figure | null;
	playerMove?: 'white' | 'black';
	checked?: Figure | null;
	checkmate?: Figure | null;
}

type TActions = {
	initialize: () => void;
	onFigureMove: () => void;
	takeFigure: (figure: Figure | null) => void;
	clearMoves: () => void;
};

export const useBoard = create<IStore & TActions>()(
	devtools(
		immer((set, get) => ({
			initialize: () => {
				const game = new Game();
				set(store => {
					store.game = game;
				});

				game.startDefault();
			},
			onFigureMove: () => {
				set(store => {
					if (store.game) {
						const { move, checkmate, checked } = store.game;
						store.fields = new Map(store.game.board.fields);
						store.currentFigure = null;
						store.playerMove = move;

						store.checked = checked;
						store.checkmate = checkmate;
					}
				});
			},
			takeFigure(figure) {
				// const moves = figure.availibleMoves();

				set(store => {
					store.currentFigure = figure;
					// store.availibleMoves = moves;
				});
			},
			clearMoves() {
				set(store => {
					// store.availibleMoves = [];
					store.currentFigure = null;
				});
			}
		}))
	)
);
