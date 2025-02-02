import React from 'react';
import '../styles/StartSection.css'; 

const StartSection = () => {
  return (
    <section id="inicio" className="section-container">
      <div className="text-content">
        <h1>Garanta uma vida longa e cheia de alegria para o seu melhor amigo</h1>
        <p className="paragrafo">
          A PetLife é o seu refúgio de confiança para o cuidado completo do seu pet. Com profissionais
          dedicados e serviços abrangentes, oferecemos uma experiência acolhedora e personalizada, garantindo
          o bem-estar, a saúde e a felicidade dos seus animais de estimação.
        </p>
        <a className="botao" href="https://wa.me/5522987654321" target="_blank" rel="noreferrer">Entre em contato conosco!</a>
      </div>
      <img src="/assets/img/start-img.svg" alt="Imagem de um pet" width="580" height="580" className="section-image"/>
    </section>
  );
};

export default StartSection;
