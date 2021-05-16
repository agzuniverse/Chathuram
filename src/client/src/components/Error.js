import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert'
import "../css/errors.css"

const Error = (props) => {
    const [show, setShow] = useState(false);

    return (
        show ? (
            <div className='fixedPositionErrorBox'>
                <Alert variant='danger' onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>Error</Alert.Heading>
                    <p>
                        {props.errorMessage}
                    </p>
                </Alert>
            </div>
        ) : null
    )
}

export default Error;