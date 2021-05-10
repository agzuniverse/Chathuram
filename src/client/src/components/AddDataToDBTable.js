import React, { useContext, useEffect, useState, useMemo } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { fetchMetaData, createData, updateData } from '../api';
import '../css/forms.css';
import { FormContext } from '../FormContext';

const getInputType = (type) => {
    if (type.includes("varchar")) {
        return "text";
    }
    if (type.includes("integer") || type.includes("float")) {
        return "number";
    }
    if (type.includes("tinyint")) {
        return "checkbox";
    }
    if (type.includes("dateandtime")) {
        return "datetime-local";
    }
    if (type.includes("date")) {
        return "date";
    }
    if (type.includes("time")) {
        return "time";
    }
    return '';
}

const getMaxLength = (type) => {
    const regex = /\(([^)]*)\)$/;
    const maxLength = type.match(regex);
    return maxLength != null ? maxLength[1] : maxLength;
}

// Form Input Types
const InputTextField = ({ id, type, name, maxLength, value, required }) => {
    const { handleChange } = useContext(FormContext)
    return (
        <input
            id={id}
            type={type}
            name={name}
            required={required}
            maxLength={maxLength}
            size={maxLength}
            value={value ?? ""}
            onChange={event => handleChange(id, event)}
        />);
}

const Checkbox = ({ id, type, name, value }) => {
    const { handleChange } = useContext(FormContext)
    return (
        <input
            id={id}
            type={type}
            name={name}
            checked={value ?? false}
            onChange={event => handleChange(id, event)}
        />);
}


const TextAreaField = ({ id, type, name, maxLength, value, required }) => {
    const { handleChange } = useContext(FormContext)
    return (
        <textarea
            id={id}
            type={type}
            name={name}
            required={required}
            maxLength={maxLength}
            size={maxLength}
            value={value ?? ""}
            onChange={event => handleChange(id, event)}
        />);
}


const AddToDBTable = (props) => {
    const [elements, setElements] = useState(null);

    useEffect(() => {
        if (props.table) {
            fetchMetaData({ "table": props.table }).then(data => {
                // If oldRow is passed as a prop, the form is being used for editing a row and
                // the values of the old row must be used to populate the form initially.
                if (props.oldRow) {
                    setElements(data.metadata.map((e, index) => {
                        e.value = props.oldRow[index]
                        return e
                    }))
                }
                else {
                    setElements(data.metadata)
                }
            })
        }
    }, [props.table]);

    const handleSave = (event) => {
        event.preventDefault();
        let newRow = {}
        elements.forEach(e => newRow[e.name] = e.value)
        // An existing row is being updated
        if (props.oldRow) {
            let oldRow = {}
            elements.forEach((e, index) => oldRow[e.name] = props.oldRow[index])
            updateData({ tableName: props.table, oldRow, newRow }).then(data => {
                console.log(data)
                if (data.message === "Successfully Updated")
                    // Go back to the page displaying the table on successfully updating a row
                    window.location.replace(`${window.location.origin}/dashboard/${props.table}`)
            })
        }
        createData({ tableName: props.table, newRow }).then(data => {
            console.log(data)
            if (data.message === "Successfully Created")
                location.reload();
        })
    }

    const handleChange = (elementToChange, event) => {
        const newElements = [...elements]
        newElements.forEach(element => {
            const { type, name } = element
            if (elementToChange === name) {
                switch (type) {
                    case "TINYINT":
                        element["value"] = event.target.checked;
                        break;
                    default:
                        element["value"] = event.target.value;
                }
            }
            setElements(newElements)
        });
    };

    return useMemo(() => {
        return (
            <Container style={{marginTop: 40}}>
                <Card>
                    <Card.Body>
                        <FormContext.Provider value={{ handleChange }}>
                            <Form>
                                {elements ? elements.map((column, index) => {
                                    console.log("Elements", elements)
                                    const formType = getInputType(column.type.toLowerCase())
                                    const maxLength = getMaxLength(column.type);
                                    const value = column.value ? column.value : null
                                    const name = column.name
                                    const required = !column.nullable
                                    let inputField;
                                    if (maxLength != null && maxLength > 20) {
                                        inputField = <TextAreaField
                                            key={name}
                                            id={name}
                                            type={formType}
                                            name={name}
                                            maxLength={maxLength}
                                            value={value}
                                            required={required}
                                        />;
                                    }
                                    else if (formType == "text" || formType == "number" || formType == "datetime-local" || formType == "date" || formType == "time") {
                                        inputField = <InputTextField
                                            key={name}
                                            id={name}
                                            type={formType}
                                            name={name}
                                            maxLength={maxLength}
                                            value={value}
                                            required={required}
                                        />;
                                    }

                                    else if (formType == "checkbox") {
                                        inputField = <Checkbox
                                            key={name}
                                            id={name}
                                            type={formType}
                                            name={name}
                                            value={value}
                                        />;
                                    }
                                    return (
                                        <Form.Group key={index} className="table-form">
                                            <span></span>
                                            <label key={index + 1} htmlFor={name}>{<strong>{name}</strong>}</label>
                                            <span>{inputField}</span>
                                        </Form.Group>);
                                }) : null}
                                <Button variant="dark" type="submit" onClick={event => handleSave(event)}>
                                    S A V E
                                </Button>
                            </Form>
                        </FormContext.Provider>
                    </Card.Body>
                </Card>
            </Container>
        );
    }, [elements])
}


const testData = [{
    type: "VARCHAR(30)",
    nullable: false,
    default: "testing",
    name: "device_id",
    comment: "Source tablet device ID"
}, {
    type: "DateAndTime",
    nullable: true,
    default: null,
    name: "time",
    comment: "Source tablet device ID"
}, {
    type: "tinyint",
    nullable: false,
    default: false,
    name: "isSet",
    comment: "Testing checkbox"
}, {
    type: "integer",
    nullable: false,
    default: "10",
    name: "Number",
    comment: "Testing checkbox"
}]

// To test with sample json data
AddToDBTable.defaultProps = {
    metadata: testData
}


export default AddToDBTable;