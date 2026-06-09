const { ComposioToolSet } = require('composio-core');
const c = new ComposioToolSet({ apiKey: process.env.COMPOSIO_API_KEY });
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(c)));
