import { useState } from 'react';
import AppointmentForm from './AppointmentForm'; // Importa o componente

const ClinicSection = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <section id="clinica" className="section-container">
      <div className="text-content">
        <h1>Conheça Nossa Clínica</h1>
        <p className="paragrafo">
          Na PetLife, a clínica é equipada com a mais alta tecnologia e com uma equipe especializada. Cuidamos
          da saúde do seu pet de forma completa, desde consultas rotineiras até tratamentos mais avançados.
        </p>
        <button className="botao" onClick={() => setShowForm(true)}>Veja nossos serviços</button>
      </div>
      <img src="/assets/img/clinic-img.svg" alt="Imagem da clínica" width="580" height="580" className="section-image" />
      {showForm && <AppointmentForm />} {/* Exibe o formulário quando showForm é true */}
    </section>
  );
};

export default ClinicSection;
