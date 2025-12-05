const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({ apiKey: `${process.env.GEMINI_API_KEY}` });

const generateCaption = async (file) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        text: "Give only one line caption for this image in English.",
      },
      {
        inlineData: {
          data: file.buffer.toString("base64"),
          mimeType: file.mimetype,
        },
      },
    ],
    config: {
      systemInstruction: "You are an expert for generating image captions.",
    },
  });
  return response.text;
};

module.exports = generateCaption;
