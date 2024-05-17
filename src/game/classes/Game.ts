import { useBoard } from '../useBoard';
import Board from './Board';
import { Bishop } from './figures/Bishop';
import { King } from './figures/King';
import { Knight } from './figures/Knight';
import { Pawn } from './figures/Pawn';
import { Queen } from './figures/Queen';
import { Rook } from './figures/Rook';

export class Game {
	board: Board;

	move: 'white' | 'black' = 'white';

	whiteKing: King | null = null;
	blackKing: King | null = null;

	whiteFigures: (Pawn | Rook | Bishop | Knight | Queen | King)[] = [];
	blackFigures: (Pawn | Rook | Bishop | Knight | Queen | King)[] = [];

	checked: King | null = null;
	checkmate: King | null = null;
	isStalemate: boolean = false;

	constructor() {
		this.board = new Board(this);
	}

	getKing(color: 'white' | 'black') {
		return color === 'white' ? this.whiteKing : this.blackKing;
	}

	startDefault() {
		const whitePawn = ['12', '22', '32', '42', '52', '62', '72', '82'];
		const blackPawn = ['17', '27', '37', '47', '57', '67', '77', '87'];

		const whitePawns = whitePawn.map(position => {
			return new Pawn({ color: 'white', position, board: this.board });
		});
		const blackPawns = blackPawn.map(position => {
			return new Pawn({ color: 'black', position, board: this.board });
		});
		//
		const whiteRooks = ['11', '81'].map(position => {
			return new Rook({ color: 'white', position, board: this.board });
		});
		const blackRooks = ['18', '88'].map(position => {
			return new Rook({ color: 'black', position, board: this.board });
		});
		//
		const whiteBishops = ['31', '61'].map(position => {
			return new Bishop({ color: 'white', position, board: this.board });
		});
		const blackBishops = ['38', '68'].map(position => {
			return new Bishop({ color: 'black', position, board: this.board });
		});
		//
		const whiteKnights = ['21', '71'].map(position => {
			return new Knight({ color: 'white', position, board: this.board });
		});
		const blackKnights = ['28', '78'].map(position => {
			return new Knight({ color: 'black', position, board: this.board });
		});
		//
		const whiteQueen = new Queen({
			color: 'white',
			position: '41',
			board: this.board
		});
		const blackQueen = new Queen({
			color: 'black',
			position: '48',
			board: this.board
		});
		//
		this.whiteKing = new King({
			color: 'white',
			position: '51',
			board: this.board
		});
		this.blackKing = new King({
			color: 'black',
			position: '58',
			board: this.board
		});

		this.whiteFigures = [
			...whitePawns,
			...whiteRooks,
			...whiteBishops,
			...whiteKnights,
			whiteQueen,
			this.whiteKing
		];

		this.blackFigures = [
			...blackPawns,
			...blackRooks,
			...blackBishops,
			...blackKnights,
			blackQueen,
			this.blackKing
		];

		this.board.initializeFields([...this.whiteFigures, ...this.blackFigures]);

		useBoard.getState().onFigureMove();
	}

	onMoveEnd(deletedFigure?: Pawn | Rook | Bishop | Knight | Queen) {
		this.checked = null;

		if (deletedFigure) {
			const figures =
				deletedFigure.color === 'white' ? this.whiteFigures : this.blackFigures;
			const index = figures.indexOf(deletedFigure);
			if (index !== -1) figures.splice(index, 1);
		}

		if (this.whiteKing?.isUnderAttack()) {
			this.checked = this.whiteKing;
			// if (!this.whiteKing.availibleMoves().length)
			// 	this.checkmate = this.whiteKing;
		} else if (this.blackKing?.isUnderAttack()) {
			this.checked = this.blackKing;
			// if (!this.blackKing.availibleMoves().length)
			// 	this.checkmate = this.blackKing;
		}

		this.move = this.move === 'white' ? 'black' : 'white';

		this.onCheckMate();

		useBoard.getState().onFigureMove();
	}

	onCheckMate() {
		const figures =
			this.move === 'white' ? this.whiteFigures : this.blackFigures;
		const availableMoves = figures
			.map(figure => figure.availibleMoves())
			.flat();

		if (!availableMoves.length) {
			const king = this.move === 'white' ? this.whiteKing : this.blackKing;

			if (this.checked === king)
				this.checkmate =
					this.move === 'white' ? this.whiteKing : this.blackKing;
			else this.isStalemate = true;
		}
	}
}
