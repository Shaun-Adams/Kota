import React from 'react';
import CardComponent from '../components/CardComponent';
import TableComponent from '../components/TableComponent';
import FoodItemTable from '../components/FoodItemTable';

const Home: React.FC = () => {
  return (
    <main className="h-screen p-8 grid grid-cols-2 gap-4 items-start min-h-screen">
      <div className="col-span-1 m-4 overflow-auto max-h-[calc(7.5*4rem)] scrollbar-hide">
        <CardComponent backendName="go" />
      </div>
      <div className="col-span-1 m-4">
        <TableComponent/>
      </div>
      <div className="col-span-1 m-4">
        <FoodItemTable/>
      </div>
    </main>
  );
}

export default Home;