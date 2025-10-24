import { GoogleGenAI } from "@google/genai";
import rateLimiter from "../../lib/rateLimiter"; // importa el middleware
import { corsApiPokemon } from "@/lib/cors-middleware";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(req, res) {
  await corsApiPokemon(req, res);

  // try {
  //   // Limitar a 3 peticiones por IP por día
  //   await rateLimiter.check(res, 3, 'CACHE_TOKEN');
  // } catch {
  //   return res.status(429).json({ message: 'Has alcanzado el límite de 3 solicitudes por día.' });
  // }

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: "Método no permitido" });
  }

  const { pokemon } = req.body;

  if (!pokemon || typeof pokemon !== "string") {
    return res
      .status(400)
      .json({ message: "Falta el nombre del Pokémon o es inválido" });
  }

  const prompt = `Dame un dato curioso, educativo o entretenido sobre el Pokémon ${pokemon}. Solo debes darme el dato curioso, evita información innecesaria`;

  try {
    const gResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = gResponse.text?.trim();

    if (!text) {
      return res
        .status(500)
        .json({ message: "No se pudo obtener un dato curioso" });
    }

    return res.status(200).json({ datoCurioso: text });
  } catch (error) {
    console.error("Error en POST:", error);
    return res
      .status(500)
      .json({ message: "Error al generar contenido con Gemini" });
  }
}
