/** @type {import("prettier").Config} */
const config = {
  printWidth: 100,
  tabWidth: 2,
  trailingComma: "all",
  singleQuote: false,
  semi: true,
  bracketSpacing: true,
  arrowParens: "always",
  endOfLine: "lf",
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
