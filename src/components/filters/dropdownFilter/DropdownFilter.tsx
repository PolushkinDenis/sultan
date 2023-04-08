import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { ManufacturersAndBrandListSelected } from "../../../types/filters";
import { filtersSlice } from "../../../store/reducers/filtersSlice";
import './DropdownFilter.scss'

interface DropdownFilterSelected {
    name: string,
    count: number,
    check: boolean
}

interface DropdownFilterProps {
    type: string,
    listFilter: DropdownFilterSelected
}

const DropdownFilter: FC<DropdownFilterProps> = ({ type, listFilter }) => {
    const [listFilterRedux, setListFilterRedux] = useState<ManufacturersAndBrandListSelected>()
    const dispatch = useAppDispatch()
    const brandsArr = useAppSelector(state => state.filterReducer.brand?.filter(brnd => brnd.name === listFilter.name)[0])
    const manufacturerArr = useAppSelector(state => state.filterReducer.manufacturer?.filter(manufactur => manufactur.name === listFilter.name)[0])

    useEffect(() => {
        if (type === "brand") {
            setListFilterRedux(brandsArr)
        }
        else {
            setListFilterRedux(manufacturerArr)
        }
    }, [brandsArr, manufacturerArr])

    const selectDropdownFilter = () => {
        if (listFilterRedux?.check === false) {
            const selectedFilter: DropdownFilterSelected = {
                name: listFilter.name,
                check: false,
                count: listFilter.count
            }
            type === "brand" ? dispatch(filtersSlice.actions.addBrand(selectedFilter)) : dispatch(filtersSlice.actions.addManufacturer(selectedFilter))
        }
        else {
            const selectedFilter: DropdownFilterSelected = {
                name: listFilter.name,
                check: true,
                count: listFilter.count
            }
            type === "brand" ? dispatch(filtersSlice.actions.deleteBrand(selectedFilter)) : dispatch(filtersSlice.actions.deleteManufacturer(selectedFilter))
        }
    }

    return (
        <>
            {listFilterRedux && (
                <div className="dropdownFilter">
                    <input type="checkbox" checked={listFilterRedux?.check} onChange={selectDropdownFilter}></input>
                    <div className="dropdownFilter-name">{listFilter.name}</div>
                    <div className="dropdownFilter-count">({listFilter.count})</div>
                </div>
            )}
        </>

    )
}

export default DropdownFilter