import store from './store/index.js'; 
import DataLists from './store/data-lists.js';

// Load up components
import Count from './components/count.js';
import List from './components/list.js';
import Status from './components/status.js';
import List_Item from './components/list_item.js';

// Load up some DOM elements
const formElement = document.querySelector('.js-form');
const inputElement = document.querySelector('#new-item-field');

// Add a submit event listener to the form and prevent it from posting back
formElement.addEventListener( 'submit', evt => 
{
	console.debug("formElement.addEventListener");
    evt.preventDefault();

	// new create a list_item with random data

	let _first_name_index = Math.floor( Math.random() * DataLists.firstNames.length - 1 );
	if ( _first_name_index < 0 )
	{
		_first_name_index = 0;
	}
	let _first_name = DataLists.firstNames[_first_name_index];
	//	console.debug( _first_name_index, "_first_name", _first_name );

	let _last_name_index = Math.floor( Math.random() * DataLists.lastNames.length - 1 );
	if ( _last_name_index < 0 )
	{
		_last_name_index = 0;
	}
	let _last_name = DataLists.lastNames[_last_name_index];
	//	console.debug(_last_name_index, "_last_name", _last_name );

	let _full_name = _first_name + " " + _last_name;
	//	console.debug("_full_name", _full_name);

	let _y = new Number( Math.floor( Math.random() * ( 2020 - 1920 + 1 ) + 1920 ) );
	let _m = new Number( Math.random() * 13 );
	let _d = new Number( Math.random() * 32 );
	let _new_date = new Date( _y, _m, _d );
	//	console.debug( "_new_date", _new_date.toUTCString() );

	let _new_list_item = new List_Item();
	_new_list_item.name = _full_name;	//	"Sean Gephardt";
	_new_list_item.date = _new_date.toDateString();
    store.dispatch('addItem', _new_list_item);

	// oringal code -add a string from the input text field
    // Grab the text value of the textbox and trim any whitespace off it
    //	let value = inputElement.value.trim();
    // If there's some content, trigger the action and clear the field, ready for the next item
	//if ( value.length )
	//{
 //       store.dispatch('addItem', value);
 //       inputElement.value = '';
 //       inputElement.focus();
 //   }
	return;
});

// Instantiate components
const countInstance = new Count();
const listInstance = new List();
const statusInstance = new Status();

// Initial renders
countInstance.render();
listInstance.render();
statusInstance.render();
