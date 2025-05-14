// Importar o Mongoose
const mongoose = require('mongoose');

// Conexão com o MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/meuProjeto', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Definir o esquema do cliente
const clienteSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'O nome completo é obrigatório.'],
  },
  email: {
    type: String,
    required: [true, 'O e-mail é obrigatório.'],
    unique: true,
  },
  telefone: {
    type: String,
    required: [true, 'O telefone é obrigatório.'],
  },
  endereco: {
    type: String,
    default: '', // Endereço é opcional
  },
}, {
  timestamps: true, // Cria campos "createdAt" e "updatedAt" automaticamente
});

// Criar o modelo do cliente
const Cliente = mongoose.model('Cliente', clienteSchema);

// Função para cadastrar um cliente
async function cadastrarCliente(nome, email, telefone, endereco = '') {
  try {
    const novoCliente = new Cliente({ nome, email, telefone, endereco });
    await novoCliente.save();
    console.log('Cliente cadastrado com sucesso:', novoCliente);
  } catch (err) {
    console.error('Erro ao cadastrar cliente:', err.message);
  }
}

// Função para listar todos os clientes
async function listarClientes() {
  try {
    const clientes = await Cliente.find();
    console.log('Lista de clientes:', clientes);
  } catch (err) {
    console.error('Erro ao listar clientes:', err.message);
  }
}

// Função para editar um cliente pelo ID
async function editarCliente(id, novosDados) {
  try {
    const clienteAtualizado = await Cliente.findByIdAndUpdate(
      id,
      { $set: novosDados },
      { new: true, runValidators: true } // Retorna o documento atualizado e valida os dados
    );
    console.log('Cliente atualizado com sucesso:', clienteAtualizado);
  } catch (err) {
    console.error('Erro ao editar cliente:', err.message);
  }
}

// Função para deletar um cliente pelo ID
async function deletarCliente(id) {
  try {
    await Cliente.findByIdAndDelete(id);
    console.log('Cliente deletado com sucesso.');
  } catch (err) {
    console.error('Erro ao deletar cliente:', err.message);
  }
}

// Testando as funções (Exemplo de uso)
// cadastrarCliente('João Silva', 'joao@email.com', '11987654321', 'Rua A, 123');
// listarClientes();
// editarCliente('ID_DO_CLIENTE', { nome: 'Novo Nome', telefone: '1122334455' });
// deletarCliente('ID_DO_CLIENTE');

module.exports = { cadastrarCliente, listarClientes, editarCliente, deletarCliente };
