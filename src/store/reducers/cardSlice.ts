import { Product } from "../../types/product"
import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface ProductItem {
    product: Product,
    count: number
}

interface CardState {
    products: ProductItem[],
}

const initialState: CardState = {
    products: [],
}

export const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        addCard(state, action: PayloadAction<ProductItem>) {
            if(state.products.length === 0) {
                state.products.push(action.payload)
            }
            else {
                state.products.map(product => {
                    if (product.product.barcode === action.payload.product.barcode) {
                        product.count++
                    }
                })
            }
            
        }

    }

})

export default cardSlice.reducer