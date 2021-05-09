import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import testData from './testData';
import * as ReactBootStrap from 'react-bootstrap';

const Row = (props) => {
    const history = useHistory()
    const handleClick = () => {
        history.push({ pathname: '/edit', oldRow: props.content, tableName: props.tableName })
    }
    return props.content.map((value, index) => <td className="pointer" onClick={handleClick} key={index}>{value}</td>);
}

const Table = (props) => {
    console.log("props", props)

    const getKeys = () => {
        const keys = props.data.metadata?.map((meta, index) => meta.name);
        return keys;
    };

    const getHeader = () => {
        const keys = getKeys();
        return keys?.map((key, index) => <th key={index}>{key}</th>)
    };

    const getRowsData = () => {
        const keys = getKeys();
        return props.data.rows?.map((row, index) => <tr key={index}><Row key={index} content={row} tableName={props.tableName} /></tr>)
    };

    return (
        <div>
            <ReactBootStrap.Table striped bordered hover>
                <thead>
                    <tr>{props.data && getHeader()}</tr>
                </thead>
                <tbody>
                    {props.data && getRowsData()}
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