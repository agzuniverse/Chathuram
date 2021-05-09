import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import testData from './testData';
import * as ReactBootStrap from 'react-bootstrap';
import Delete from '@material-ui/icons/Delete';
import { readData } from '../api';
import { removeRow } from '../api';

let rowDeleted = false
const deleteRow = async (table, row, setRowDeleted) => {
    console.log("deleting...")
    await removeRow({ "table": table, "row": row }) 
    if (table)
        console.log("table name is:" + table)
        // readData(table).then(data => { 
        //     setTableData(data)
        // })
        setRowDeleted(true)
    // rowDeleted = true
    console.log("deleted")
}

const Row = (props) => {
    const history = useHistory()
    const handleClick = () => {
        history.push({ pathname: '/edit', oldRow: props.content, tableName: props.tableName })
    }
    return props.content.map((value, index) => <td className="pointer" onClick={handleClick} key={index}>{value}</td>);
}

const Table = (props) => {
    const [tableData, setTableData] = useState()
    const [rowDeleted, setRowDeleted] = useState(false)
    useEffect(() => {
        console.log("props received....")
        console.log(props.tableName)
        if (props.tableName)
            readData(props.tableName).then(data => {
                console.log("data")
                console.log(data)
                console.log("props.tableName is " + props.tableName)
                setTableData(data)})
    }, [props])

    // useEffect(() => {
    //     console.log("does this work???")
    //     if (tableData?.tableName)
    //         // console.log("Table data is ...")
    //         // console.log(tableData)
    //         readData(tableData.tableName).then(data => {
    //             console.log(data)
    //             setTableData(data)})
    //     setRowDeleted(false)
    // }, [rowDeleted])

    const getKeys = () => {
        const keys = tableData.data.metadata?.map((meta, index) => meta.name);
        return keys;
    };

    const getHeader = () => {
        console.log("tableData inside getHeader...")
        console.log(tableData)
        const keys = getKeys();
        return keys?.map((key, index) => <th key={index}>{key}</th>)
    };

    const getRowsData = () => {
        const keys = getKeys();
        return tableData.data.rows?.map((row, index) => <tr key={index}><Row key={index} content={row} tableName={tableData.tableName}/><td className="pointer"><Delete onClick={() => deleteRow(tableData.tableName, row, setRowDeleted)}/></td></tr>)
    };

    return (
        <div style={{marginTop: 40}}>
            <ReactBootStrap.Table striped bordered hover>
                <thead>
                    <tr>{tableData?.data && getHeader()}</tr>
                </thead>
                <tbody>
                    {tableData?.data && getRowsData()}
                </tbody>
            </ReactBootStrap.Table>
        </div>
    );
}

// To test with sample json data
Table.defaultProps = {
    data: testData
}

export default Table;