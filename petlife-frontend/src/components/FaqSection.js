import React from 'react';
import DudaItem from './DudaItem';

const FaqSection = () => {
  const perguntas = [
    {
      pergunta: "Quais serviços são oferecidos pela clínica da PetLife?",
      resposta: "A clínica da PetLife oferece uma ampla gama de serviços, incluindo consultas de rotina, vacinação, cirurgias, tratamento de doenças, cuidados odontológicos, atendimento de emergência 24 horas, programas de prevenção de pulgas, carrapatos e vermes, entre outros. Nosso objetivo é fornecer cuidados abrangentes e personalizados para garantir a saúde e o bem-estar do seu pet."
    },
    {
      pergunta: "Quais espécies de animais a clínica veterinária atende?",
      resposta: "A clínica veterinária da PetLife atende animais de estimação de todas as espécies, incluindo cães, gatos, pássaros, roedores e répteis. Nossos profissionais possuem conhecimento e experiência para cuidar de diferentes tipos de animais, oferecendo um atendimento especializado e dedicado a cada um deles."
    },
    {
      pergunta: "A clínica da PetLife possui serviços de emergência?",
      resposta: "Sim, a clínica veterinária da PetLife oferece serviços de emergência 24 horas. Se o seu animal de estimação precisar de atendimento veterinário imediato fora do horário de expediente, nossa equipe está pronta para ajudar, fornecendo cuidados urgentes e tratamento adequado para garantir o bem-estar do seu pet."
    },
    {
      pergunta: "A clínica oferece serviços de banho e tosa?",
      resposta: "Sim, a clínica veterinária da PetLife oferece serviços profissionais de banho e tosa. Nossa equipe de profissionais experientes garante que seu pet receba cuidados adequados, com produtos de alta qualidade e técnicas que respeitam o conforto e a segurança do seu animal. Entre em contato para agendar um horário."
    }
  ];

  return (
    <section id="duvidas">
      <h2>Dúvidas Frequentes</h2>
      {perguntas.map((item, index) => (
        <DudaItem key={index} pergunta={item.pergunta} resposta={item.resposta} />
      ))}
    </section>
  );
};

export default FaqSection;
