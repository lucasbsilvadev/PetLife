import React, { useState } from 'react';

const DudaItem = ({ pergunta, resposta }) => {
  const [aberto, setAberto] = useState(false);

  return (
    <div>
      <h3 onClick={() => setAberto(!aberto)}>{pergunta}</h3>
      {aberto && <p>{resposta}</p>}
    </div>
  );
};

export default DudaItem;
