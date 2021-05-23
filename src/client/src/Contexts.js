import { createContext } from 'react';
export const FormContext = createContext(null);
export const ErrorContext = createContext({
    errorMessage: '',
    setErrorMessage: () => { }
});