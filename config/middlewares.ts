// archivo: config/middlewares.js

module.exports = [
  // ... otros middlewares
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: [
        'http://localhost:3000', // Tu entorno local
        'http://localhost:1337', // El admin de Strapi local
        'https://ihcbackend.onrender.com', // Tu backend
        'https://ihcfrondend-gskv.vercel.app' // ¡AÑADE TU URL DE VERCEL AQUÍ!
      ],
    },
  },
  // ... otros middlewares
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];