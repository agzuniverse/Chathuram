import React from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { addData } from '../api';
import '../css/forms.css';

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
    const regex = /\(([^)]*)\)[^(]*$/;
    const maxLength = type.match(regex);
    console.log(maxLength);
    return maxLength != null ? maxLength[1] : maxLength;
}

// Form Input Types
const InputTextField = ({ type, name, maxLength, placeholder, required, _handleChange }) => {
    console.log(type, name, placeholder, required)
    return (<div>
        <input
            type={type}
            name={name}
            required={required}
            maxLength={maxLength}
            size={maxLength}
            autoComplete="off"
            placeholder={placeholder}
            onChange={_handleChange}
        />
    </div>);
}

const Checkbox = ({ type, name, checked, required, _handleChange }) => {
    console.log(type, name, checked, required)
    return (<div>
        <input
            type={type}
            name={name}
            required={required}
            autoComplete="off"
            checked={checked}
            onChange={_handleChange}
        />
    </div>);
}


const TextAreaField = ({ name, placeholder, required, _handleChange }) => {
    return (<div>
        <textarea
            type="text"
            name={name}
            required={required}
            style={{ height: "80px" }}
            autoComplete="off"
            value={placeholder}
            onChange={_handleChange}
        />
    </div>);
}

const fetchMetadata = () => {
    const test = addData({
        "table": "users"
    });
    console.log(test);
}

const AddToDBTable = ({ metadata }) => {

    const handleSave = () => {
        // TODO
    };

    // fetch api
    fetchMetadata();
    return (
        <div>
            <Form>
                <Container>
                    {metadata.map((column, index) => {
                        const formType = getInputType(column.type.toLowerCase())
                        const maxLength = getMaxLength(column.type);
                        const placeholder = column.default
                        const name = column.name
                        const required = !column.nullable
                        let inputField;
                        if (formType == "text" || formType == "number" || formType == "datetime-local" || formType == "date" || formType == "time") {
                            inputField = <InputTextField
                                key={name}
                                type={formType}
                                name={name}
                                maxLength={maxLength}
                                placeholder={placeholder}
                                required={required}
                            />;
                        }

                        else if (formType == "checkbox") {
                            inputField = <Checkbox
                                key={name}
                                type={formType}
                                name={name}
                                checked={column.default}
                                required={required}
                            />;
                        }
                        return (
                            <Form.Group key={index} style={{ display: "flex", justifyContent: "space-around" }}>
                                <label key={index + 1} htmlFor={name} style={{ display: "inline-block" }}>{<strong>{name}</strong>}</label>
                                {inputField}
                            </Form.Group>);
                    })}
                    <Button variant="light" type="submit" onClick={handleSave}>
                        S A V E
                    </Button>
                </Container>
            </Form>
        </div>
    );
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