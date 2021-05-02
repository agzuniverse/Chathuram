import React, { useEffect } from 'react';
import testData from './testData';
import * as ReactBootStrap from 'react-bootstrap';

const Row = (props) => {
    return props.content.map((value, index) => <td key={index}>{value}</td>);
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
        return props.data.rows?.map((row, index) => <tr key={index}><Row key={index} content={row} /></tr>)
    };

    return (
        <div style={{marginTop: 40}}>
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