import React, { useContext } from 'react';
import Alert from 'react-bootstrap/Alert'
import { ErrorContext } from '../Contexts';
import "../css/errors.css"

const Error = () => {
    const { showError, setShowError, errorMessage, setErrorMessage } = useContext(ErrorContext)

    return (
        showError ?
            <div className='fixedPositionErrorBox'>
                <Alert variant='danger' onClose={() => setShowError(false)} dismissible>
                    <Alert.Heading>Error</Alert.Heading>
                    <p>
                        {errorMessage}
                    </p>
                </Alert>
            </div>
            : null
    )
}

export default Error;