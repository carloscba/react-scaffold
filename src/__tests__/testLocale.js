import React from 'react';
import ReactDOM from 'react-dom';
import Upload from '../components/Upload';
import Locale from '../scaffold/Locale';
import es from '../locale/es'
import en from '../locale/en'

it('Object en is equal es ', () => {

    const keysEn = Object.keys(en);
    const keysEs = Object.keys(es);

    expect(keysEn).toEqual(keysEs);

});

it('Test get value welcome', () => {
    window.locale = 'en';
    const locale = new Locale('App');
    const copy = locale.get();
    expect(copy.WELCOME).toEqual('Welcome');
});

it('Test get value bienvenido', () => {
    window.locale = 'es';
    const locale = new Locale('App');
    const copy = locale.get();
    expect(copy.WELCOME).toEqual('Bienvenido');
});