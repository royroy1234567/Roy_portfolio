// ListModels.js

// 1️⃣ Load environment variables
import 'dotenv/config';  // this loads process.env.GEMINI_API_KEY

// 2️⃣ Import fetch (if you are using node-fetch)
import fetch from "node-fetch";  // <-- add this line here

// 3️⃣ Your function
async function listModels() {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("Available models:", data.models);
  } catch (err) {
    console.error("Error listing models:", err);
  }
}

// 4️⃣ Run the function
listModels();