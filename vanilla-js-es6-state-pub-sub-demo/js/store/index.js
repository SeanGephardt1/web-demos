import actions from './actions.js';
import mutations from './mutations.js';
import state from './state.js';
import Store from './store.js';
import DataLists from '../store/data-lists.js';

// create a new "Store",
// call the "state.RandomData()" to generate random data??
export default new Store(
	{
		actions,
		mutations,
		state
	},
	state.RandomData()
);
