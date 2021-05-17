import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import testData from './testData';
import * as ReactBootstrap from 'react-bootstrap';
import {Container, Pagination} from 'react-bootstrap';
import Delete from '@material-ui/icons/Delete';
import { readData } from '../api';
import { removeRow } from '../api';

const Row = (props) => {
    const history = useHistory()
    const handleClick = () => {
        history.push({ pathname: '/edit', oldRow: props.content, tableName: props.tableName })
    }
    return props.content.map((value, index) => <td className="pointer" onClick={handleClick} key={index}>{value}</td>);
}

const Table = (props) => {
    const [tableData, setTableData] = useState()
    useEffect(() => {
        if (props.tableName)
            readData(props.tableName, props.pageNum).then(data => {
                setTableData(data)
            })
    }, [props.tableName])

    const deleteRow = (row) => {
        removeRow({ "table": props.tableName, "row": row }).then(() =>
            readData(props.tableName).then(data => setTableData(data)))
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
        return tableData.rows?.map((row, index) => <tr key={index}><Row key={index} content={row} tableName={props.tableName} /><td className="pointer"><Delete onClick={() => deleteRow(row)} /></td></tr>)
    };

    const getPagination = () => {
        let {pages} = tableData;
        let {tableName, pageNum} = props;
        pages = parseInt(pages);
        pageNum = pageNum ? parseInt(pageNum) : 1;
        console.log("pages:", pages, "pageNum:", pageNum);
        let content = [];
        let url = `http://localhost:3000/dashboard/${tableName}/`;
        if(pageNum != 1)
            content.push(<Pagination.Prev href={url+(pageNum-1)}/>);
        if(pages < 7){
            for (let i=1; i<=pages; i++) {
                content.push(<Pagination.Item key={i} href={url+i}>{i}</Pagination.Item>);
            }
        }
        else{
            if(pageNum < 4){
                for (let i=1; i<=4; i++) {
                    content.push(<Pagination.Item key={i} href={url+i}>{i}</Pagination.Item>);
                }
                let mid = Math.floor((4+pages)/2);
                content.push(<Pagination.Ellipsis href={url+mid}/>);
                content.push(<Pagination.Item href={url+pages}>{pages}</Pagination.Item>);
            }
            else if(pages - pageNum < 3){
                for (let i=1; i<=2; i++) {
                    content.push(<Pagination.Item key={i} href={url+i}>{i}</Pagination.Item>);
                }
                let mid = Math.floor((pages-1)/2);
                content.push(<Pagination.Ellipsis href={url+mid}/>);
                for (let i=pages-3; i<=pages; i++) {
                    content.push(<Pagination.Item key={i} href={url+i}>{i}</Pagination.Item>);
                }
            }
            else{
                content.push(<Pagination.Item key={1} href={url+"1"}>{1}</Pagination.Item>);
                let mid1 = Math.floor(pageNum/2);
                content.push(<Pagination.Ellipsis href={url+mid1}/>);
                for (let i=pageNum-1; i<=pageNum+1; i++) {
                    content.push(<Pagination.Item key={i} href={url+i}>{i}</Pagination.Item>);
                }
                let mid2 = Math.floor((pageNum+1+pages)/2);
                content.push(<Pagination.Ellipsis href={url+mid2}/>);
                content.push(<Pagination.Item key={pages} href={url+pages}>{pages}</Pagination.Item>);
            }
        }
        if(pageNum != pages)
            content.push(<Pagination.Next href={url+(pageNum+1)}/>);
        return (
        <Pagination>
            {content}
        </Pagination>
        )
    }

    return (
        <Container style={{marginTop: 40}}>
            <ReactBootstrap.Table striped bordered hover>
                <thead>
                    <tr>{tableData && getHeader()}</tr>
                </thead>
                <tbody>
                    {tableData && getRowsData()}
                </tbody>
            </ReactBootstrap.Table>
            <div className="pagination-parent">
                {tableData && (tableData.pages != 1) && getPagination()}
            </div>
        </Container>
    );
}

// To test with sample json data
Table.defaultProps = {
    data: testData
}

export default Table;