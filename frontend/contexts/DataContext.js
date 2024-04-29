// DataContext.js
import React from 'react';

const DataContext = React.createContext({
  data: null,
  setData: () => {}
});

export default DataContext;
