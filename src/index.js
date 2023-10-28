import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';

//redux
import GlobalStyles from './components/GlobalStyles/GlobalStyles';
import store from './store';

//react context

import { ContextProviderUser } from './context';

///i18n
// import { I18nextProvider } from 'react-i18next';
import './i18n/I18n';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalStyles>
            <Provider store={store}>
                <ContextProviderUser>
                    <App />
                </ContextProviderUser>
            </Provider>
        </GlobalStyles>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
