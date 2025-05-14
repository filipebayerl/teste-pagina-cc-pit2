const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Inicializando o aplicativo
const app = express();

// Configurações
app.use(cors());
app.use(bodyParser.json());

// Conectando ao MongoDB
mongoose.connect('mongodb://localhost:27017/minha-plataforma', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado ao MongoDB');
}).catch((err) => {
  console.error('Erro ao conectar ao MongoDB:', err);
});

// Modelo para clientes
const clienteSchema = new mongoose.Schema({
  nome: String,
  email: { type: String, required: true, unique: true },
  telefone: String,
  endereco: String,
});

const Cliente = mongoose.model('Cliente', clienteSchema);

// Rota para adicionar um cliente
app.post('/clientes', async (req, res) => {
  try {
    const novoCliente = new Cliente(req.body);
    const clienteSalvo = await novoCliente.save();
    res.status(201).json(clienteSalvo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Rota para listar todos os clientes
app.get('/clientes', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Iniciando o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get('/clientes', async (req, res) => {
    try {
      const clientes = await Cliente.find();
      res.json(clientes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  