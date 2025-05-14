// Função para manipular o envio do formulário
document.getElementById('product-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário
  
    // Coleta os dados do formulário
    const productName = document.getElementById('product-name').value;
    const productDescription = document.getElementById('product-description').value;
    const productPrice = document.getElementById('product-price').value;
    const productImage = document.getElementById('product-image').files[0]; // Imagem do produto
  
    // Cria um FormData para enviar a imagem junto com os dados do formulário
    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', productDescription);
    formData.append('price', productPrice);
    formData.append('image', productImage);
  
    // Envia os dados para o backend usando Fetch
    fetch('/api/products', {
      method: 'POST',
      body: formData, // Envia o FormData com os dados
    })
    .then(response => response.json())  // Converte a resposta para JSON
    .then(data => {
      if (data.success) {
        alert('Produto cadastrado com sucesso!');
        document.getElementById('product-form').reset();  // Reseta o formulário
      } else {
        alert('Erro ao cadastrar produto: ' + data.message);
      }
    })
    .catch(error => {
      console.error('Erro:', error);
      alert('Erro ao cadastrar produto. Tente novamente mais tarde.');
    });
  });
  