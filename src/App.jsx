import React from 'react';
import ProductTable from './components/ProductTable';

function App() {
  return (
    <>
    <div className="flex flex-col gap-5 ">
    <h1 className="text-4xl font-bold font-TitleFont"> Product Management App </h1>
    <ProductTable />
    </div>
    </>
    
  );
}

export default App;
