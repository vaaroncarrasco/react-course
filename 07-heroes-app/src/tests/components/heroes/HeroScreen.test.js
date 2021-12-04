import { mount } from "enzyme"
import { MemoryRouter, Route } from "react-router";
import { HeroScreen } from "../../../components/heroes/HeroScreen"

describe('testing <HeroScreen />', () => {

    const history = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn()
    };

    test('should display <Redirect /> if there are no url arguments', () => {

        const wrapper = mount(
            // ? Testing Router URL routes
            <MemoryRouter initialEntries={['/hero']} >
                <HeroScreen history={ history }/>
            </MemoryRouter>
        );

        expect( wrapper.find('Redirect').exists() ).toBe(true);
    });

    test('should show hero if url param exists and is found', () => {
        const wrapper = mount(
            // ? Testing Router URL params
            <MemoryRouter initialEntries={['/hero/marvel-spider']} >

                <Route path="/hero/:heroeId" component={ HeroScreen } />

            </MemoryRouter>
        );
        expect( wrapper.find('.row').exists() ).toBe(true);
    });

    test('should return to previous page with history.push()', () => {
        const history = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn()
        };

        const wrapper = mount(
            // ? Testing Router URL params
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route
                    path="/hero/:heroeId"

                    // * sending props to route's component props
                    component={ () => <HeroScreen history={ history } /> }

                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect( history.push ).toHaveBeenCalledWith('/')
        expect( history.goBack ).not.toHaveBeenCalled();

    });

    test('should return to previous page with history.goBack()', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route
                    path="/hero/:heroeId"

                    // * sending props to route's component props
                    component={ () => <HeroScreen history={ history } /> }

                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect( history.goBack ).toHaveBeenCalled();
        expect( history.push ).not.toHaveBeenCalledWith();

    });

    test('should call redirect if hero url param not found', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/jdof8sufds9s98']}>
                <Route
                    path="/hero/:heroeId"

                    // * sending props to route's component props
                    component={ () => <HeroScreen history={ history } /> }

                />
            </MemoryRouter>
        );
        expect( wrapper.text() ).toBe('');
    });


});