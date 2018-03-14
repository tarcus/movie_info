import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {BrowserRouter} from 'react-router-dom';

//i18n
import  {IntlProvider, addLocaleData} from 'react-intl'
import en from 'react-intl/locale-data/en'
import ru from 'react-intl/locale-data/ru'

addLocaleData([...en, ...ru]);


//сюда нужно подтянуть файл нужной локали те что en.json
import localeDataRu from '../locales/ru.json'
import localeDataEn from '../locales/en.json'

//смотрим локаль в localStorage
const locFromStorage = localStorage.getItem('lang')

const localeData = (locFromStorage==="ru") ? localeDataRu : localeDataEn;

const locale = locFromStorage;

//FIREBASE
const config = {
    apiKey: "AIzaSyByHMiwEWa-TyfVxi5evuhoXh83Xvc5iB0",
    authDomain: "movieinfo-29a55.firebaseapp.com",
    databaseURL: "https://movieinfo-29a55.firebaseio.com",
    projectId: "movieinfo-29a55",
    storageBucket: "movieinfo-29a55.appspot.com",
    messagingSenderId: "516967630209"
};

firebase.initializeApp(config);


//Не работает...
//var db = firebase.database();




ReactDOM.render(
	<IntlProvider locale={locale} messages={localeData}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</IntlProvider>,
	document.getElementById('root')
);