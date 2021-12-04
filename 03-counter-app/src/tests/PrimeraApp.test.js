import React from "react";
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import PrimeraApp from "../PrimeraApp";

describe('<PrimeraApp /> testing', () => {

    // test('should show the msg "hola mundo"', () => {
    //     const saludo = 'hola mundo';
    //     // wrapper is a library that renders react components to test them
    //     // const wrapper = render(<PrimeraApp saludo={ saludo } />);
    //     const { getByText } = render(<PrimeraApp saludo={ saludo } />);
    //     expect( getByText(saludo) ).toBeInTheDocument();
    // });

    // * Install enzyme then the adapter
    test('should show <PrimeraApp /> correctly', () => {
        const saludo = 'hola mundo';
        const wrapper = shallow( <PrimeraApp saludo={ saludo } /> ); // shallow comes with enzyme package

        // * enzyme snapshot to json -> for testing purposes
        expect( wrapper ).toMatchSnapshot(); // to match snapshot from original react component
    });

    test('should show subtitle sent through props', () => {
        const saludo = 'hola mundo';
        const subtitulo = 'texto de prueba';

        // * wrapper has all the data of the rendered component
        const wrapper = shallow( <PrimeraApp saludo={ saludo } subtitulo={ subtitulo } />);

        const textoParrafo = wrapper.find('p').text();

        expect( textoParrafo ).toBe( subtitulo );
    });
});
