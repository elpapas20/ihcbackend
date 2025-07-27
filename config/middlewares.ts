module.exports = [
  'strapi::errors',
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:3000'], // permite Next.js
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      headers: ['Content-Type', 'Authorization'],
      credentials: true,
    },
  },
  'strapi::security',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',     // ✅ obligatorio
  'strapi::body',      // ✅ obligatorio
  'strapi::session',   // ✅ obligatorio
  'strapi::favicon',   // ✅ obligatorio
  'strapi::public',    // ✅ obligatorio
]
