import React, { useContext, useEffect, useState, useMemo } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { fetchMetaData, createData, updateData } from '../api';
import '../css/forms.css';
import { FormContext, ErrorContext } from '../Contexts';
import { metaData } from './testData';

const getInputType = (type) => {
    if (type.includes("char") || type.includes("text") || type.includes("binary") || type.includes("blob")) {
        return "text";
    }
    if (type.includes("integer") || type.includes("float") || type.includes("decimal") || type.includes("bit") || type.includes("int") || type.includes("double") || type.includes("year")) {
        return "number";
    }
    if (type.includes("boolean")) {
        return "checkbox";
    }
    if (type.includes("dateandtime") || type.includes("timestamp")) {
        return "datetime-local";
    }
    if (type.includes("date")) {
        return "date";
    }
    if (type.includes("time")) {
        return "time";
    }
    if (type.includes("json")) {
        return "json";
    }
    return '';
}

// When a data type has length greater than this, a textarea is shown instead of a single line text input.
const MIN_LENGTH_FOR_TEXTAREA = 21

const getMaxLength = (type) => {
    // Special cases
    if (type.includes("year")) {
        // Year inputs can be at most YYYY (4 characters)
        return 4
    }
    if (type.includes("blob")) {
        // Blob types should always be shown in a textarea
        return MIN_LENGTH_FOR_TEXTAREA
    }
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
            checked={value == "1" ? true : false}
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

    const { errorMessage, setErrorMessage, clearError } = useContext(ErrorContext)

    useEffect(() => {
        if (props.table) {
            clearError()
            fetchMetaData({ "table": props.table }).then(data => {
                if (data.error) {
                    setErrorMessage(data.error)
                } else {
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
                }
            })
        }
    }, [props.table]);

    const handleSave = (event) => {
        event.preventDefault();
        let newRow = {}
        elements.forEach(e => {
            // Special cases
            // Default value for checkbox should be false unless specified
            if (e.type == "BOOLEAN" && e.value == "") {
                e.value = false
            }
            // If it is an autoincrement column, there is no need to send it's value to backend
            // for new row creation.
            if (e.autoincrement)
                return
            newRow[e.name] = e.value
        })
        // An existing row is being updated
        if (props.oldRow) {
            let oldRow = {}
            elements.forEach((e, index) => {
                oldRow[e.name] = props.oldRow[index]
                // For autoicrement columns the new value should be the same as the old value
                // Since the user cannot manually change this value.
                if (e.autoincrement)
                    newRow[e.name] = props.oldRow[index]
            })
            clearError()
            updateData({ tableName: props.table, oldRow, newRow }).then(data => {
                if (data.error) {
                    setErrorMessage(data.error)
                }
                else if (data.message === "Successfully Updated")
                    // Go back to the page displaying the table on successfully updating a row
                    window.location.replace(`${window.location.origin}/dashboard/${props.table}`)
            })
        }
        // A new row is being added
        else {
            clearError()
            createData({ tableName: props.table, newRow }).then(data => {
                if (data.error) {
                    setErrorMessage(data.error)
                }
                else if (data.message === "Successfully Created")
                    window.location.replace(`${window.location.origin}/dashboard/${props.table}`)
            })
        }
    }

    const handleChange = (elementToChange, event) => {
        const newElements = [...elements]
        newElements.forEach(element => {
            const { type, name } = element
            if (elementToChange === name) {
                switch (type) {
                    case "BOOLEAN":
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
            <Container style={{ marginTop: 40 }}>
                <Card>
                    <Card.Body>
                        <FormContext.Provider value={{ handleChange }}>
                            <Form>
                                {elements ? elements.map((column, index) => {
                                    const formType = getInputType(column.type.toLowerCase())
                                    const maxLength = getMaxLength(column.type.toLowerCase());
                                    const value = column.value ? column.value : null
                                    const name = column.name
                                    const required = !column.nullable
                                    let inputField;

                                    // field is not displayed if autoincrement is set true 
                                    const disabled = column.autoincrement ? column.autoincrement : false

                                    if (maxLength != null && maxLength >= MIN_LENGTH_FOR_TEXTAREA) {
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
                                    // TODO: When type is JSON, use an input field that supports JSON formatting
                                    else if (formType == "json") {
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
                                            {!disabled && <label key={index + 1} htmlFor={name}>{<strong>{name}</strong>}</label>}
                                            {!disabled && <span>{inputField}</span>}
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

// To test with sample json data
AddToDBTable.defaultProps = {
    metadata: metaData
}


export default AddToDBTable;
