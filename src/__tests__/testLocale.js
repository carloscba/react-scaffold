import React from 'react';
import ReactDOM from 'react-dom';
import Upload from '../components/Upload';
import Locale from '../class/Locale';
import es from '../locale/es'
import en from '../locale/en'

it('Check nodes of locale Objects', () => {

    const keysEn = Object.keys(en);
    const keysEs = Object.keys(es);

    expect(keysEn).toEqual(keysEs);

});

it('Test en locale', () => {
    window.locale = 'en';
    const locale = new Locale('App');
    const copy = locale.get();

    expect(copy.WELCOME).toEqual('Welcome');
});

it('Test es locale', () => {
    window.locale = 'es';
    const locale = new Locale('App');
    const copy = locale.get();

    expect(copy.WELCOME).toEqual('Bienvenido');
});