import React from 'react'
import TableOperations from '../../ui/TableOperations'
import Filter from '../../ui/Filter'
import SortBy from '../../ui/SortBy'

export default function CabinTableOperations() {
  return (
    <TableOperations>
        <Filter filterField="discount" options={[
            {value: "all", label: "All"},
            {value: "no-discount", label: "No discount"},
            {value: "with-discount", label: "With discount"}
        ]} />
        <SortBy options={[
            {value: "name-asc", label: "Name (A-Z)"},
            {value: "name-desc", label: "Name (Z-A)"},
            {value: "regularPrice-asc", label: "Price (low to high)"},
            {value: "regularPrice-desc", label: "Price (high to low)"},
            {value: "maxCapacity-asc", label: "Capacity (low to high)"},
            {value: "maxCapacity-desc", label: "Capacity (high to low)"}
        ]} />
    </TableOperations>
  )
}
