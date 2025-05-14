document.getElementById('form-cliente').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const cliente = {
      nome: document.getElementById('nome').value,
      email: document.getElementById('email').value,
      telefone: document.getElementById('telefone').value,
      endereco: document.getElementById('endereco').value,
    };
  
    try {
      const response = await fetch('http://localhost:3000/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente),
      });
  
      if (response.ok) {
        alert('Cliente cadastrado com sucesso!');
        document.getElementById('form-cliente').reset();
      } else {
        const error = await response.json();
        alert(`Erro: ${error.error}`);
      }
    } catch (err) {
      alert('Erro ao conectar ao servidor.');
    }
  });
  