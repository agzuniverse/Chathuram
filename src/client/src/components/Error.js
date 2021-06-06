import React, { useContext } from 'react';
import Alert from 'react-bootstrap/Alert'
import { ErrorContext } from '../Contexts';
import "../css/errors.css"

const Error = () => {
    const { errorMessage, setErrorMessage, clearError } = useContext(ErrorContext)

    return (
        errorMessage ?
            <div className='fixedPositionErrorBox'>
                <Alert variant='danger' onClose={() => clearError()} dismissible>
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