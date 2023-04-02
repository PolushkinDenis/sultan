import React, { FC, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { filtersSlice } from "../../../store/reducers/filtersSlice"
import './ManufacturerList.scss'

interface ManufacturersListSelected {
    name: string,
    count: number,
    check: boolean
}

interface ManufacturerListProps {
    manufacturer: ManufacturersListSelected
}

const ManufacturerList: FC<ManufacturerListProps> = ({manufacturer}) => {
    const [check, setCheck] = useState(false)

    const man = useAppSelector(state => state.filterReducer.manufacturer)

    const manufacturerArr = useAppSelector(state => state.filterReducer.manufacturer?.filter(manufactur => manufactur.name === manufacturer.name)[0])

    // const manufacturerArr = useAppSelector(state => state.filterReducer.manufacturer)

    const [currentManufacturer, setCurrentManufacturer] = useState(manufacturerArr)

    const dispatch = useAppDispatch()


    const selectManufacturer = () => {
        if (manufacturerArr?.check === false) {
            const selectedManufacturer: ManufacturersListSelected = {
                name: manufacturer.name,
                check: false,
                count: manufacturer.count

            }
            dispatch(filtersSlice.actions.addManufacturer(selectedManufacturer))
            setCheck(true)
        }
        else {
            const selectedManufacturer: ManufacturersListSelected = {
                name: manufacturer.name,
                check: true,
                count: manufacturer.count
            }
            dispatch(filtersSlice.actions.deleteManufacturer(selectedManufacturer))
            setCheck(false)
        }
    }

    return (
        <div className="manufacturerList">
            <input type="checkbox" checked={manufacturerArr?.check} onChange={selectManufacturer}></input>
            <div className="manufacturerList-name">{manufacturer.name}</div>
            <div className="manufacturerList-count">({manufacturer.count})</div>
        </div>
    )
}

export default ManufacturerList