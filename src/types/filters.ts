import { Product } from "./product"

export interface ManufacturersAndBrandListSelected {
    name: string,
    count: number,
    check: boolean
}


// export interface BrandListSelected {
//     name: string,
//     count: number,
//     check: boolean
// }

export interface FilteredProducts {
    products: Product[]
    active: boolean
}

export interface FilteredByType {
    products: Product[]
    active: boolean
}

export interface IFilters {
    products: Product[],
    filteredProducts: FilteredProducts,
    filteredByType: FilteredByType,
    finalSorting: Product[],
    manufacturer: ManufacturersAndBrandListSelected[] | null,
    brand: ManufacturersAndBrandListSelected[] | null,
    type: string | null,
    priceFrom: number,
    priceTo: number,
    sort: string
}