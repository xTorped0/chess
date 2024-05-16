import { Header } from '@/modules/Header';

import Game from './game';

function App() {
	return (
		<div className='relative flex flex-1 flex-col min-h-screen overflow-hidden bg-gray-200 py-4 px-5 gap-3'>
			<Header />
			<Game />
		</div>
	);
}

export default App;
