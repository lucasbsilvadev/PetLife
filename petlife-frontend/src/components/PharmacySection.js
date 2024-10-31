import React from 'react';
import '../styles/PharmacySection.css';

const PharmacySection = () => {
  return (
    <section id="farmacia" className="section-container">
      <div className="text-content">
        <h1>Farmácia PetLife</h1>
        <p className="paragrafo">
          Além de cuidados médicos, oferecemos uma farmácia especializada para pets. Temos medicamentos
          aprovados pelos melhores profissionais para garantir a saúde e bem-estar do seu animal.
        </p>
        <a className="botao" href="#produtos">Confira nossos produtos</a>
      </div>
      <img src="/assets/img/shop-img.svg" alt="Imagem da farmácia" width="580" height="580" className="section-image" />
    </section>
  );
};

export default PharmacySection;
