
interface ProductFilter {
    filter: string
}

export interface Product {
    url: string,
    name: string,
    type: "weight" | "volume",
    size: string,
    barcode: string,
    manufacturer: string,
    brand: string,
    description: string,
    price: number,
    filter: string[]
}