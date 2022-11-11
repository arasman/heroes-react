import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { SearchPage } from "../../../src/heroes"


const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('SearchPages tests', () => {
    beforeEach( ()=> {
        jest.clearAllMocks();
    })

    test('should display with default values', () => {
        const {container} = render(
        <MemoryRouter>
            <SearchPage />
        </MemoryRouter>
        )
        expect(container).toMatchSnapshot();       
    });

    test('should display batman and the input with batman as searching value', () => {
        const {container} = render(
        <MemoryRouter initialEntries={['/search?q=batman']}>
            <SearchPage />
        </MemoryRouter>
        )
        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman');
        const img = screen.getByRole('img');
        expect(img.src).toContain('/assets/heroes/dc-batman.jpg')
        const divSearchHero = screen.getByLabelText('search_hero');
        expect (divSearchHero.style.display).toBe("none");
        // screen.debug();
    })
    
    test('should display an error if the searched hero do not exist', () => {
         render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
            );
        const divNotFound = screen.getByLabelText('hero_not_found');
        console.log(divNotFound.style.display);
        expect(divNotFound.style.display).not.toBe("none");
    })
    
    test('should should navigate to the new screen', () => {
        const searchText = 'superman';
        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
            );
        const input = screen.getByRole('textbox');
        // console.log(input)
        fireEvent.change(input, {target: {name: 'searchText', value: searchText}});   
        const form = screen.getByTestId('searchForm');
        fireEvent.submit(form);
        expect( mockNavigate ).toHaveBeenCalledWith(`?q=${searchText}`);
        // screen.debug();
    })
    
  
})
