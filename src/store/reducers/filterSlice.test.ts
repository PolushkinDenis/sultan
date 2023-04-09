import filterReducer, {changeSort} from './filtersSlice'

describe("FilterSlice tests", () => {
    test("Change sort", () => {
        const initialState = {
            products: [],
            filteredProducts: {products: [], active: false},
            filteredByType: {products: [], active: false},
            finalSorting: [],
            manufacturer: [],
            brand: [],
            type: null,
            priceFrom: 0,
            priceTo: 10000000,
            sort: "name-dec"
        }
        const expectedState = {
            products: [],
            filteredProducts: {products: [], active: false},
            filteredByType: {products: [], active: false},
            finalSorting: [],
            manufacturer: [],
            brand: [],
            type: null,
            priceFrom: 0,
            priceTo: 10000000,
            sort: "name-inc"
        }        
        expect(filterReducer(initialState, changeSort("name-inc"))).toEqual(expectedState)
    })
})