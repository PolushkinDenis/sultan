import React, {FC} from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { filtersSlice } from "../../../store/reducers/filtersSlice";
import "./BrandsList.scss"

interface BrandsListSelected {
    name: string,
    count: number,
    check: boolean
}

interface BrandsListProps {
    brands: BrandsListSelected
}

const BrandsList: FC<BrandsListProps> = ({brands}) => {

    const brandsArr = useAppSelector(state => state.filterReducer.brand?.filter(brnd => brnd.name === brands.name)[0])
    const dispatch = useAppDispatch()

    const selectBrand = () => {
        //Добавляем бренд для фильтрации (изменяем в сторе на true)
        if (brandsArr?.check === false) {
            const selectedBrands: BrandsListSelected = {
                name: brands.name,
                check: false,
                count: brands.count

            }
            dispatch(filtersSlice.actions.addBrand(selectedBrands))
        }
        //Убираем бренд для фильтрации (изменяем в сторе на false)
        else {
            const selectedBrands: BrandsListSelected = {
                name: brands.name,
                check: true,
                count: brands.count
            }
            dispatch(filtersSlice.actions.deleteBrand(selectedBrands))
        }
    }


    return (
        <div className="brandsList">
        <input type="checkbox" checked={brandsArr?.check} onChange={selectBrand}></input>
        <div className="brandsList-name">{brands.name}</div>
        <div className="brandsList-count">({brands.count})</div>
    </div>
    )
}


export default BrandsList