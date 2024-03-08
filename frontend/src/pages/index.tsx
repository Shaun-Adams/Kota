// pages/index.js or pages/index.tsx

import React from 'react';
import CardComponent from '../components/CardComponent';
import TableComponent from '../components/TableComponent';
import FoodItemTable from '../components/FoodItemTable';

const Home: React.FC = () => {
  return (
    <main className="h-screen p-12 grid grid-cols-2 grid-rows-auto gap-4 items-start min-h-screen">
      <div className="col-span-1 m-4 overflow-auto max-h-[calc(4*4rem)] scrollbar-hide">
        <CardComponent backendName="go" />
      </div>
      <div className="col-span-1 m-4 overflow-auto max-h-[calc(4*4rem)] scrollbar-hide">
        <FoodItemTable/>
      </div>
      <div className="col-span-2 m-4 overflow-auto flex justify-center scrollbar-hide w-full">
        <TableComponent/>
      </div>
    </main>
  );
}

export default Home;
