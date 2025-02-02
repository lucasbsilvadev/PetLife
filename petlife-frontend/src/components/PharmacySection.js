import React, { useState } from 'react';
import '../styles/PharmacySection.css';

const PharmacySection = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatLog, setChatLog] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleToggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = (message) => {
    const input = message || userInput;
    if (input.trim()) {
      const newChatLog = [...chatLog, { sender: 'user', message: input }];
      setChatLog(newChatLog);
      setUserInput('');

      // Simulação de resposta automática
      const botResponse = getBotResponse(input);
      setChatLog([...newChatLog, { sender: 'bot', message: botResponse }]);
    }
  };

  const getBotResponse = (message) => {
    const responses = {
      'quais produtos vocês têm?': 'Temos antipulgas, vitaminas, shampoos e outros medicamentos para pets.',
      'como posso comprar?': 'Você pode clicar no botão "Confira nossos produtos" ou conversar diretamente via WhatsApp.',
      'horário de funcionamento': 'Estamos abertos de segunda a sábado, das 8h às 20h.',
    };
    return responses[message.toLowerCase()] || 'Desculpe, não entendi sua pergunta. Entre em contato pelo WhatsApp para mais informações.';
  };

  const predefinedMessages = [
    'Quais produtos vocês têm?',
    'Como posso comprar?',
    'Horário de funcionamento',
  ];

  return (
    <section id="farmacia" className="section-container">
      <div className="text-content">
        <h1>Farmácia PetLife</h1>
        <p className="paragrafo">
          Além de cuidados médicos, oferecemos uma farmácia especializada para pets. Temos medicamentos
          aprovados pelos melhores profissionais para garantir a saúde e bem-estar do seu animal.
        </p>
        <a className="botao" href="https://wa.me/5522987654321" target="_blank" rel="noreferrer">Confira nossos produtos</a>
      </div>
      <img src="/assets/img/shop-img.svg" alt="Imagem da farmácia" width="580" height="580" className="section-image" />

      {/* Botão para abrir o chatbot */}
      <button className="chatbot-toggle" onClick={handleToggleChatbot}>
        {showChatbot ? 'Fechar Chatbot' : 'Abrir Chatbot'}
      </button>

      {/* Chatbot Interface */}
      {showChatbot && (
        <div className="chatbot">
          <div className="chatbot-header">Assistente Virtual</div>
          <div className="chatbot-messages">
            {chatLog.map((chat, index) => (
              <div key={index} className={`chat-message ${chat.sender}`}>
                <span>{chat.message}</span>
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={userInput}
              onChange={handleUserInput}
              placeholder="Digite sua pergunta..."
            />
            <button onClick={() => handleSendMessage()}>Enviar</button>
          </div>
          <div className="predefined-messages">
            <p>Ou escolha uma pergunta:</p>
            {predefinedMessages.map((msg, index) => (
              <button key={index} onClick={() => handleSendMessage(msg)}>
                {msg}
              </button>
            ))}
          </div>
          <a className="botao-whatsapp" href="https://wa.me/5522987654321" target="_blank" rel="noreferrer">
            Atendimento pelo WhatsApp
          </a>
        </div>
      )}
    </section>
  );
};

export default PharmacySection;
