/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.jsx"], // Asegúrate de incluir todos los archivos donde usas Tailwind CSS
  theme: {
    extend: {
      colors: {
        primary: '#39a900',//verde 
        secondary: '#98fe58',//verde claro
        tertiary: '#f2ffe5',//verde mas claro
        alternate: '#29690b',//verde oscuro
        primarytext: '#000000',//negro
        secondarytext: '#5d5d5d',//gris
        alternatetext: '#919191',//gris claro
        primarybackground: '#ffffff',//blanco
        secondarybackground: '#E6E6E6',//medio blanco
        azuloscuro : '#04324d',//azul oscuro
        colorsuccess: '#52d726',//verde fosforecente
        colorerror: '#e74c3c',//rojo
        colorwarning: '#f1c40f',//amarillo
      },
    },
  },
  plugins: [],
}