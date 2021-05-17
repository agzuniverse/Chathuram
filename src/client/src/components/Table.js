import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import testData from './testData';
import * as ReactBootStrap from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Delete from '@material-ui/icons/Delete';
import { readData, removeAllRows, removeRow } from '../api';

const Row = (props) => {
    const history = useHistory()
    const handleClick = () => {
        history.push({ pathname: '/edit', oldRow: props.content, tableName: props.tableName })
    }
    return props.content.map((value, index) => <td className="pointer" onClick={handleClick} key={index}>{value}</td>);
}

const Table = (props) => {
    const [tableData, setTableData] = useState()
    const [rowsSelected, setRowsSelected] = useState([])

    useEffect(() => {
        if (props.tableName)
            readData(props.tableName).then(data => {
                setTableData(data)
            })
    }, [props.tableName])

    const updateRowsSelected = (e, row) => {
        const oldRowsSelected = rowsSelected
        let newRowsSelected
        if (e.target.checked) {
            newRowsSelected = oldRowsSelected.concat([row])
        }
        else {
            newRowsSelected = oldRowsSelected.filter((current) => JSON.stringify(current) != JSON.stringify(row))
        }
        setRowsSelected(newRowsSelected)
    }

    const deleteRow = (row) => {
        removeRow({ "table": props.tableName, "rows": [row] }).then(() =>
            readData(props.tableName).then(data => setTableData(data)))
    }

    const deleteAllRows = () => {
        removeAllRows(props.tableName).then(() =>
            readData(props.tableName).then(data => setTableData(data)))
    } 

    const deleteSelectedRows = () => {
        // get all selected items
        removeRow({ "table": props.tableName, "rows": rowsSelected }).then(() =>
            {
                setRowsSelected([])
                setTableData([])
                readData(props.tableName).then(data => setTableData(data))
            })
    }

    const getKeys = () => {
        const keys = tableData.metadata?.map((meta, index) => meta.name);
        return keys;
    };

    const getHeader = () => {
        const keys = getKeys();
        return keys?.map((key, index) => <th key={index}>{key}</th>)
    };

    const getRowsData = () => {
        const keys = getKeys();
        return tableData.rows?.map((row, index) => 
            <tr key={index}>
                <Row key={index} content={row} tableName={props.tableName} />
                <td className="pointer"><Delete onClick={() => deleteRow(row)} /></td>
                <td>
                    <input
                        type="checkbox"
                        onClick={(e) => updateRowsSelected(e, row)} 
                    />
                </td>
            </tr>)
    };

    return (
        <ReactBootStrap.Container style={{marginTop: 40}}>
            <ReactBootStrap.Table striped bordered hover>
                <thead>
                    <tr>{tableData && getHeader()}</tr>
                </thead>
                <tbody>
                    {tableData && getRowsData()}
                </tbody>
            </ReactBootStrap.Table>
            <Button variant="primary" type="submit" id="delete-all-button" onClick={e => {
                e.preventDefault();
                deleteAllRows()
            }}>
                Delete all rows</Button>
            <Button variant="primary" type="submit" id="delete-selected-button" onClick={e => {
                e.preventDefault();
                deleteSelectedRows()
            }}>
                Delete selected rows</Button>
        </ReactBootStrap.Container>
    );
}

// To test with sample json data
Table.defaultProps = {
    data: testData
}

export default Table;