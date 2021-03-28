import React from 'react';
import testData from './testData';
import * as ReactBootStrap from 'react-bootstrap';

const Row = (props) => {
    return props.keys.map((key, index) => <td key={props.content[key]}>{props.content[key]}</td>);
}

const Table = (props) => {

    const getKeys = () => {
        const keys = Object.keys(props.data[0]);
        return keys;
    };

    const getHeader = () => {
        const keys = getKeys();
        return keys.map((key, index) => <th key={key}>{key}</th>)
    };
    
    const getRowsData = () => {
        const keys = getKeys();
        return props.data.map((row, index) => <tr key={index}><Row key={index} content={row} keys={keys}/></tr>)
    };

    return (
        <div>
            <ReactBootStrap.Table striped bordered hover>
                <thead>
                    <tr>{props.data.length > 0 && getHeader()}</tr>
                </thead>
                <tbody>
                    {props.data.length > 0 && getRowsData()}
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