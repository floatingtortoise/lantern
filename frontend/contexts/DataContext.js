// contexts/DataContext.js


import React, { createContext, useState } from 'react';

const DataContext = createContext({
    data: {}, // default value for data
    setData: () => {}, // default empty function
    initialMessage: '', // default value for initialMessage
    setInitialMessage: () => {} // default empty function
});

export const DataProvider = ({ children }) => {
    const [data, setData] = useState({});
    const [initialMessage, setInitialMessage] = useState('');

    const value = {
        data,
        setData,
        initialMessage,
        setInitialMessage
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
