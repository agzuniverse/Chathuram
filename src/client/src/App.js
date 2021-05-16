import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import ConfigForm from './components/ConfigForm';
import useToken from './hooks/useToken';
import useDBConfig from './hooks/useDBConfig';
import { Header } from './components/Header';
import Dashboard from './components/Dashboard';
import RowEditor from './components/RowEditor'
import RowCreator from './components/RowCreator'
import Error from './components/Error';
import { ErrorContext } from './Contexts';

const App = () => {
  const { token, setToken } = useToken();
  const { dbConfig, setDBConfig } = useDBConfig();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!token) {
    return (
      <>
        <ErrorContext.Provider value={{ showError, setShowError, errorMessage, setErrorMessage }}>
          <Login setToken={setToken} />
          <Error />
        </ErrorContext.Provider>
      </>
    )
  }

  if (!dbConfig) {
    return <ConfigForm setDBConfig={setDBConfig} />
  }

  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard/:tableName" component={Dashboard} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/edit" component={RowEditor} />
          <Route path="/create" component={RowCreator} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
