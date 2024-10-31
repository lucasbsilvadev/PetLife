import React from 'react';
import StartSection from '../components/StartSection';
import ClinicaSection from '../components/ClinicSection';  // Adicione outras seções conforme necessário

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
