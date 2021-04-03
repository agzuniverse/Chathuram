import { useState } from 'react';

export default function useDBConfig() {
    const getDBConfig = () => {
        const dbConfigString = localStorage.getItem('dbConfig')
        const dbConfig = JSON.parse(dbConfigString);
        if (dbConfig) {
            return dbConfig;
        }
        return null;
    };

    const [dbConfig, setDBConfig] = useState(getDBConfig());

    const saveDBConfig = dbConfig => {
        localStorage.setItem('dbConfig', JSON.stringify(dbConfig));
        setDBConfig(dbConfig);
    };

    return {
        setDBConfig: setDBConfig,
        dbConfig
    }
}