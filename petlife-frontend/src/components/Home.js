import React from 'react';
import StartSection from '../components/StartSection';
import ClinicaSection from '../components/ClinicSection'; 

const Home = () => {
  return (
    <div>
      <StartSection />
      <ClinicaSection />
      {/* Adicione outras seções aqui */}
    </div>
  );
};

export default Home;
