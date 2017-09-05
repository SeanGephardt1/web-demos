import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AMPED from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AMPED />, document.getElementById('root'));
registerServiceWorker();
