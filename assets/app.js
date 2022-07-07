/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.scss';
import React from 'react';
import ReactDOM from 'react-dom';

import Module from '@/module';
import { Provider } from 'react-redux';
import store from '@/store';

ReactDOM.render(
<Provider store={store}>
    <Module />
</Provider>, document.getElementById('root'));


require('@fortawesome/fontawesome-free/css/all.min.css');
require('@fortawesome/fontawesome-free/js/all.js');