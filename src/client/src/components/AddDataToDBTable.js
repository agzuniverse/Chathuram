import React, { useContext, useEffect, useState, useMemo } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { addData } from '../api';
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
    // console.log("props(db)", props)
    const [elements, setElements] = useState(null);

    useEffect(() => {
        if (props.table) {
            addData({ "table": props.table }).then(data => {
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
        console.log(elements)
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
            <FormContext.Provider value={{ handleChange }}>
                <Form>
                    <Container>
                        {elements ? elements.map((column, index) => {
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
                                <Form.Group key={index} style={{ display: "flex", justifyContent: "space-between" }}>
                                    <label key={index + 1} htmlFor={name} style={{ display: "inline-block" }}>{<strong>{name}</strong>}</label>
                                    {inputField}
                                </Form.Group>);
                        }) : null}
                        <Button variant="light" type="submit" onClick={event => handleSave(event)}>
                            S A V E
                        </Button>
                    </Container>
                </Form>
            </FormContext.Provider>
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