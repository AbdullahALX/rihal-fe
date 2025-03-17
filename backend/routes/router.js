import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const router = express.Router();
const token = process.env.OPEN_AI;
const geoapifyApiKey = process.env.GEO_API;
const endpoint = 'https://models.inference.ai.azure.com';
const modelName = 'gpt-4o-mini';

router.post('/ask', async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log('Received request body:', req.body); // Debugging

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt input is required' });
    }

    const userInput = 'pleaseee get me all things you havees Duqma';
    const formattedPrompt = `
    Scan the given text for any grammatical errors and correct them. 
    Then, extract the name of a city in Oman mentioned in the text.

    - If the extracted city is in Oman, return the top matching name in JSON format:  
      { "city_name": "<city_name>" }  

    - If the extracted city is not in Oman, return:  
      { "city_name": "This city is not in Oman" }  

    Reference List of Cities in Oman:  
    Adam, As Sib, Al Ashkharah, Al Buraimi, Al Hamra, Al Jazer, Al Madina A'Zarqa (formerly known as Blue City), 
    Al Suwaiq, Bahla, Barka, Bidbid, Bidiya, Duqm, Haima, Ibra, Ibri, Izki, Jabrin, Jalan Bani Bu Hassan, 
    Khasab, Manah, Masirah, Mudhaybi, Mudhaireb, Muscat, Muttrah, Nizwa, Quriyat, Raysut, Rustaq, Ruwi, 
    Saham, Shinas, Saiq, Salalah, Samail, Sohar, Sur, Tan am, Thumrait, Liwa.

    Given text: "${prompt}"
  `;

    const client = new OpenAI({ baseURL: endpoint, apiKey: token });

    const response = await client.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: formattedPrompt },
      ],
      temperature: 1.0,
      max_tokens: 1000,
      model: modelName,
    });
    // Parse the response
    const match = response.choices[0].message.content.match(/{.*}/s);

    let cityName = 'No city found'; // Default response

    if (match) {
      const cityJson = JSON.parse(match[0]); // Parse JSON string

      console.log(cityJson);
      if (!cityName || cityName === 'This city is not in Oman') {
        return res.json({ message: 'No valid city found in Oman' });
      }

      cityName = `${cityJson.city_name}, Oman`; // Extract city name

      console.log(cityName);
      const requestOptions = {
        method: 'GET',
      };
      const geoapiURL = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
        cityName
      )}&apiKey=${geoapifyApiKey}`;

      const getResponse = await fetch(geoapiURL, requestOptions);
      const geoData = await getResponse.json();
      console.log(geoData.features?.[0]?.properties?.lon);
      res.json({
        city_name: cityName,
        lon: geoData.features?.[0]?.properties?.lon,
        lat: geoData.features?.[0]?.properties?.lat,
        address: geoData.features?.[0]?.properties?.formatted,
      });
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/test', async (req, res) => {
  res.send('test');
});

export default router;
