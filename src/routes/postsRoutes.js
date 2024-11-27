// Importa o módulo Express para criar o servidor web
import express from "express";
// Importa o módulo Multer para lidar com upload de arquivos
import multer from "multer";
// Importa as funções do controlador de posts
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configuração do Multer para armazenamento de arquivos (necessário para Windows)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório de destino para os arquivos enviados
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo
    cb(null, file.originalname); 
  }
});

// Cria uma instância do middleware Multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage });

// Em sistemas Linux e Mac, a linha abaixo pode ser utilizada como alternativa:
// const upload = multer({ dest: "./uploads"});

// Função que define as rotas da aplicação
const routes = (app) => {
  // Configura o aplicativo para analisar solicitações com corpo JSON
  app.use(express.json());
  app.use(cors(corsOptions));

  // Define uma rota GET para buscar todos os posts
  app.get("/posts", listarPosts);
  
  // Define uma rota POST para criar um post
  app.post("/posts", postarNovoPost);

  // Define uma rota POST para fazer upload de uma única imagem
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost);
}

// Exporta a função de rotas para ser utilizada em outros arquivos
export default routes;