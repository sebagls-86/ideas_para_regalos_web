import React from 'react';

const ErrorPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>¡Oops! Algo salió mal</h1>
      <p>Lo sentimos, parece que hubo un problema al procesar su solicitud.</p>
      <p>Por favor, inténtelo de nuevo más tarde.</p>
      <img src="https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif" alt="Error gif" style={{ maxWidth: '100%' }} />
    </div>
  );
};

export default ErrorPage;
