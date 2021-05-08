import React from 'react'
import AddDataToDBTable from './AddDataToDBTable'

const RowEditor = (props) => {
    console.log(props)
    return (
        <div>
            <AddDataToDBTable table={props.location.tableName} />
        </div>
    )
}

export default RowEditor