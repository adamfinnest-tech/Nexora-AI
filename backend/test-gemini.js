const { GoogleGenerativeAI } = require('@google/generative-ai');

async function run() {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=YOUR_API_KEY_HERE`);
    const data = await response.json();
    console.log(data.models.map(m => m.name).filter(n => n.includes('flash')));
  } catch (e) {
    console.error(e);
  }
}
run();
