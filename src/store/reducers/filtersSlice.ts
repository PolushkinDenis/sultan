import { IFilters, ManufacturersAndBrandListSelected, } from "../../types/filters";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Product } from "../../types/product";

// const localStroage = localStorage.getItem('products')
// const productslocalStroage: Product[] = localStroage !== null ? JSON.parse(localStroage) : []

const initialState: IFilters = {
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

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        changeSort(state, action: PayloadAction<string>){
            state.sort = action.payload
        },
        initState(state, action: PayloadAction<Product[]>) {
            state.products.push(...action.payload)
            state.filteredProducts.products.push(...action.payload)
            state.finalSorting.push(...action.payload)
        },
        resetState(state) {
            state = initialState
        },
        initManufacturer(state, action: PayloadAction<ManufacturersAndBrandListSelected[]>) {
            state.manufacturer?.push(...action.payload)
        },
        addManufacturer(state, action: PayloadAction<ManufacturersAndBrandListSelected>) {
            if (state.manufacturer !== null) {
                const index: number = state.manufacturer.findIndex(el => el.name === action.payload.name)
                state.manufacturer[index].check = true
            }
        },
        deleteManufacturer(state, action: PayloadAction<ManufacturersAndBrandListSelected>) {
            if (state.manufacturer !== null) {
                const index: number = state.manufacturer.findIndex(el => el.name === action.payload.name)
                state.manufacturer[index].check = false
            }
        },
        initBrand(state, action: PayloadAction<ManufacturersAndBrandListSelected[]>) {
            state.brand?.push(...action.payload)
        },
        addBrand(state, action: PayloadAction<ManufacturersAndBrandListSelected>) {
            if (state.brand !== null) {
                const index: number = state.brand.findIndex(el => el.name === action.payload.name)
                state.brand[index].check = true
            }
        },
        deleteBrand(state, action: PayloadAction<ManufacturersAndBrandListSelected>) {
            if (state.brand !== null) {
                const index: number = state.brand.findIndex(el => el.name === action.payload.name)
                state.brand[index].check = false
            }
        },
        filteredByMain(state, action: PayloadAction<Product[]>) {
            //state.filteredProducts = action.payload
            console.log("redx")
            console.log(action.payload)
            const newProducts = [...action.payload]
            console.log(newProducts)
            state.filteredProducts.products = newProducts
            state.filteredProducts.active = true
        },
        resetFiltered(state) {
            state.filteredProducts.products = []
            state.filteredProducts.active = false
        },
        filteredByType(state, action: PayloadAction<Product[]>) {
            state.filteredByType.products = action.payload
            state.filteredByType.active = true
        },
        resetFilteredByType(state) {
            state.filteredByType.products = []
            state.filteredByType.active = false
        },
        addFinalFiltered(state, action: PayloadAction<Product[]>) {
            state.finalSorting = action.payload
        },
        resetManufacturer(state) {
            state.manufacturer?.map(manufactur => manufactur.check = false)
        },
        resetBrand(state) {
            state.brand?.map(brnd => brnd.check = false)
        },
        selectType(state, action: PayloadAction<string>) {
            state.type = action.payload
        }
    }
})

export default filtersSlice.reducer