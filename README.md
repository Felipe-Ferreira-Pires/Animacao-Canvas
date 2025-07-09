# 🎮 Animacao-Canvas com Firebase

Este projeto é um **mini game interativo** feito com **HTML5 Canvas**, **JavaScript Puro** e integração com **Firebase Realtime Database**.  
Aqui, você vai controlar um círculo branco com o mouse, ganhar pontos ao coletar quadrados verdes, perder pontos ao bater em quadrados vermelhos e inimigos amarelos, ouvir sons a cada evento e salvar tudo em um **ranking online**.

---

## 📌 Visão Geral

- **Tecnologias usadas**: HTML5, CSS3, JavaScript Vanilla, Firebase Realtime Database.
- **Funcionalidades principais**:
  - Desenho dinâmico usando `<canvas>`.
  - Animações suaves com `requestAnimationFrame`.
  - Controle total via **mouse**.
  - Colisões com obstáculos que afetam a pontuação.
  - Efeitos de **explosão de partículas**.
  - Sons de pontuação, colisão e game over.
  - Ranking **online** salvo na nuvem com Firebase.

---

## 📂 Estrutura do Projeto

Animacao-Canvas/
├── index.html # Página principal
├── animacao.js # Código de toda a lógica do jogo
├── End.wav # Som de game over
├── Lose.wav # Som de colisão com inimigos
├── Win.wav # Som de ponto ganho


---

## 🚀 Como Executar o Projeto

1️⃣ **Clone o repositório:**

```bash
git clone https://github.com/Felipe-Ferreira-Pires/Animacao-Canvas.git


MIT License

Copyright (c) 2025 Felipe Ferreira Pires

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


# Ignorar arquivos do sistema operacional
.DS_Store
Thumbs.db

# Ignorar arquivos de log
*.log

# Ignorar arquivos de build temporários
*.tmp

# Ignorar configurações de IDE/editor
.vscode/
.idea/
*.sublime-workspace
*.sublime-project

# Ignorar arquivos de áudio grandes se não quiser versionar
*.wav

# Ignorar node_modules caso use no futuro
node_modules/
