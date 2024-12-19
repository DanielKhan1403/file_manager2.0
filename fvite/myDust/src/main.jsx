import React from 'react';
import ReactDOM from 'react-dom/client'; // Заменено на react-dom/client
import { Provider } from 'react-redux';
import store from './store/store.js';
import App from './App';
import './i18n.js';
// Получаем корневой элемент
const rootElement = document.getElementById('root');

// Создаем корень через createRoot
const root = ReactDOM.createRoot(rootElement);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
