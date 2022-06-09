import names from "./names.json";
import adjectives from "./adjectives.json";

export function capitalizeFirstLetter(str: string) {
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
  return capitalized;
}

export function randomName() {
  const name = `${names[Math.floor(Math.random() * names.length)]}`;
  const adjective = `${
    adjectives[Math.floor(Math.random() * adjectives.length)]
  }`;
  return `${capitalizeFirstLetter(adjective)}${capitalizeFirstLetter(
    name
  )}${Math.floor(Math.random() * 20)}`;
}
