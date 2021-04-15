// determine the input type getInputType based on 'type'
// determine placeholder based on default value
// if e.target.value.length == 0, check if nullable else required
// label is name

import React from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import * as ReactBootStrap from 'react-bootstrap';

const getInputType = (type) => {
    console.log("Type is: "+ type)
    console.log("type includes: "+ type.includes("VARCHAR"))

    if (type.includes("VARCHAR")) {
        return "text";
    }
    if (type.includes("Integer") || type.includes("Float")) {
        return "number";
    }
    if (type.includes("Boolean")) {
        return "boolean";
    }
    if (type.includes("DateAndTime")) {
        return "datetime-local";
    }
    if (type.includes("Date")) {
        return "date";
    }
    if (type.includes("Time")) {
        return "time";
    }
    return '';
}

// Form Input Types
const InputTextField = ({ type, name, placeholder, required, _handleChange }) => {
    console.log(type, name, placeholder, required)
    return (<div>
        <input
            type={type}
            name={name}
            required={required}
            autoComplete="off"
            placeholder={placeholder}
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

const AddToDBTable = ({ metadata }) => {
    // const [inputField, setInputField] = useState();

    // const handleChange = (e) => {
    //     setInputField(prevFields => [...prevFields, ])
    // }

    console.log(metadata)
    return (
        <div>
            <Form>
                <Container>
                {metadata.map((column, index) => {
                    const formType = getInputType(column.type)
                    const placeholder = column.default
                    const name = column.name
                    const required = !column.nullable
                    console.log(placeholder)
                    let inputField;
                    if (formType == "text" || formType == "number" || formType == "datetime-local" || formType == "date" || formType == "time") {
                        inputField = <InputTextField 
                                key={name}
                                type={formType}
                                name={name}
                                placeholder={placeholder}
                                required={required}
                                style={{display:"flex", flex: "1", padding: "5px"}}
                                />;}
                    else {
                        inputField = false;
                    }
                    return (
                    <Form.Group key={index} style={{display: "flex", justifyContent: "space-around"}}>
                        <label key={index+1} htmlFor={name} style={{display:"inline-block"}}>{<strong>{name}</strong>}</label>
                        {inputField}                    
                    </Form.Group>);
                })}
                </Container>
            </Form>
        </div>
    );
}


const testData = [{
    type: "VARCHAR(length=255)",
    nullable: false,
    default: "pepper",
    name: "device_id",
    comment: "Source tablet device ID"
}, {
    type: "DateAndTime",
    nullable: true,
    default: null,
    name: "time",
    comment: "Source tablet device ID"
}]

// To test with sample json data
AddToDBTable.defaultProps = {
    metadata: testData
}


export default AddToDBTable;