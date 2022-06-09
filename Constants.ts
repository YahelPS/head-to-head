export const Hostnames = {
  DEVELOPMENT: "localhost:3000",
  PRODUCTION: "https://www.example.com",
  DEVELOPMENT_API: "localhost:9090",
  PRODUCTION_API: "https://api.example.com",
};

export const HOSTNAME = process.env.DEV
  ? Hostnames.DEVELOPMENT
  : Hostnames.PRODUCTION;
export const HOSTNAME_API = process.env.DEV
  ? Hostnames.DEVELOPMENT_API
  : Hostnames.PRODUCTION_API;
