import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory } from "react-router-dom";
import { testData } from './testData';
import * as ReactBootStrap from 'react-bootstrap';
import { Container, Pagination, Button, Modal } from 'react-bootstrap';
import Delete from '@material-ui/icons/Delete';
import { readData, removeAllRows, removeRow } from '../api';
import { ErrorContext } from '../Contexts';

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
    const { errorMessage, setErrorMessage, clearError } = useContext(ErrorContext)
    const [show, setShow] = useState(false)
    const deleteType = useRef()
    const currentRow = useRef({})

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    useEffect(() => {
        if (props.tableName) {
            clearError()
            readData(props.tableName, props.pageNum).then(data => {
                if (data.error) {
                    setErrorMessage(data.error)
                }
                else
                    setTableData(data)
            })
        }
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
        row = currentRow.current
        clearError()
        removeRow({ "table": props.tableName, "rows": [row] }).then(data => {
            if (data.error) {
                setErrorMessage(data.error)
            }
            else {
                readData(props.tableName, props.pageNum).then(data => {
                    if (data.error) {
                        setErrorMessage(data.error)
                    }
                    else
                        setTableData(data)
                })
            }
        })
        handleClose()
    }

    const deleteAllRows = () => {
        clearError()
        removeAllRows(props.tableName).then(() =>
            readData(props.tableName).then(data => {
                if (data.error) {
                    setErrorMessage(data.error)
                }
                else
                    setTableData(data)
            })
        )
        handleClose()
    }

    const deleteSelectedRows = () => {
        // get all selected items
        clearError()
        removeRow({ "table": props.tableName, "rows": rowsSelected }).then(() => {
            setRowsSelected([])
            setTableData([])
            readData(props.tableName).then(data => {
                if (data.error) {
                    setErrorMessage(data.error)
                }
                else
                    setTableData(data)
            })
        })
        handleClose()
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
                <td className="pointer"><Delete data-testid={"del" + index} onClick={() => {
                    currentRow.current = row;
                    deleteType.current = deleteRow;
                    tableData.metadata && handleShow();
                }} /></td>
                <td>
                    <input
                        type="checkbox"
                        onClick={(e) => updateRowsSelected(e, row)}
                    />
                </td>
            </tr>)
    };

    const getPagination = () => {
        let { pages } = tableData;
        let { tableName, pageNum } = props;
        pages = parseInt(pages);
        pageNum = pageNum ? parseInt(pageNum) : 1;
        console.log("pages:", pages, "pageNum:", pageNum);
        let content = [];
        let url = `${window.location.origin}/dashboard/${tableName}/`;
        if (pageNum != 1)
            content.push(<Pagination.Prev href={url + (pageNum - 1)} />);
        if (pages < 7) {
            for (let i = 1; i <= pages; i++) {
                content.push(<Pagination.Item key={i} href={url + i}>{i}</Pagination.Item>);
            }
        }
        else {
            if (pageNum < 4) {
                for (let i = 1; i <= 4; i++) {
                    content.push(<Pagination.Item key={i} href={url + i}>{i}</Pagination.Item>);
                }
                let mid = Math.floor((4 + pages) / 2);
                content.push(<Pagination.Ellipsis href={url + mid} />);
                content.push(<Pagination.Item href={url + pages}>{pages}</Pagination.Item>);
            }
            else if (pages - pageNum < 3) {
                for (let i = 1; i <= 2; i++) {
                    content.push(<Pagination.Item key={i} href={url + i}>{i}</Pagination.Item>);
                }
                let mid = Math.floor((pages - 1) / 2);
                content.push(<Pagination.Ellipsis href={url + mid} />);
                for (let i = pages - 3; i <= pages; i++) {
                    content.push(<Pagination.Item key={i} href={url + i}>{i}</Pagination.Item>);
                }
            }
            else {
                content.push(<Pagination.Item key={1} href={url + "1"}>{1}</Pagination.Item>);
                let mid1 = Math.floor(pageNum / 2);
                content.push(<Pagination.Ellipsis href={url + mid1} />);
                for (let i = pageNum - 1; i <= pageNum + 1; i++) {
                    content.push(<Pagination.Item key={i} href={url + i}>{i}</Pagination.Item>);
                }
                let mid2 = Math.floor((pageNum + 1 + pages) / 2);
                content.push(<Pagination.Ellipsis href={url + mid2} />);
                content.push(<Pagination.Item key={pages} href={url + pages}>{pages}</Pagination.Item>);
            }
        }
        if (pageNum != pages)
            content.push(<Pagination.Next href={url + (pageNum + 1)} />);
        return (
            <Pagination>
                {content}
            </Pagination>
        )
    }

    const getPopup = () => {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete?
                    <br></br>
                    (This may result in loss of related rows)
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                </Button>
                    <Button variant="danger" data-testid="confirm" onClick={deleteType.current}>
                        Confirm
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    return (
        <Container style={{ marginTop: 40 }}>
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
                deleteType.current = deleteAllRows;
                handleShow();
            }}>
                Delete all rows</Button>
            <Button variant="primary" type="submit" id="delete-selected-button" onClick={e => {
                e.preventDefault();
                deleteType.current = deleteSelectedRows;
                handleShow();
            }}>
                Delete selected rows</Button>

            {getPopup()}

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
