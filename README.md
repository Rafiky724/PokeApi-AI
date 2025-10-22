# ⚡ PokeAPI-AI

**PokeAPI-AI** es una aplicación web que combina la **PokeAPI** con **Inteligencia Artificial (Gemini)** para ofrecer una experiencia única:  
Consultar todos los Pokémon y obtener **datos curiosos generados por IA** sobre cada uno.

---

## 🧠 Funcionalidad Principal

1. 🔍 **Explora Pokémon**: la app obtiene información de la [PokeAPI](https://pokeapi.co/), mostrando una lista con nombres, imágenes y tipos.  
2. 💡 **Dato Curioso con IA (Gemini)**: usando la API de **Gemini AI**, la aplicación genera un hecho curioso o interesante sobre el Pokémon seleccionado.

---

## ⚙️ 1. Configuración del Entorno

Clona el repositorio y entra en el directorio del proyecto:

```bash
git clone https://github.com/tuusuario/pokeapi-ai.git
cd pokeapi-ai
```

---

## 🧩 2. Instalación de Dependencias

### Frontend

```bash
cd frontend
npm install
```

### Backend

```bash
cd ../backend
npm install
```

---

## 🧠 3. Configuración del Entorno de Gemini

Crea un archivo `.env.local` en la carpeta del **backend** con la clave de la API de Gemini:

```bash
GEMINI_API_KEY=tu_clave_aqui
```

Asegúrate de **no subir este archivo al repositorio público**.

---

## 🚀 4. Ejecución del Proyecto

Ejecuta tanto el backend como el frontend en paralelo (en diferentes terminales):

### Backend (Next.js)

```bash
cd backend
npm run dev
```

Por defecto, se ejecutará en `http://localhost:3000`.

### Frontend (Vite + React)

```bash
cd frontend
npm run dev
```

Por defecto, se ejecutará en `http://localhost:5173`.

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**.  
Puedes usarlo, modificarlo y distribuirlo libremente con atribución.

---
