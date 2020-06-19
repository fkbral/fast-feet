import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap');

*{
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

body {
  font: 400 16px Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  background-color: #F5F5F5;
  /* background-color: #7d40e7; */
  color:#666;
}

button{
  border:none;
  cursor: pointer;
}

input, textarea, svg {
  color: #444;
}

input::placeholder, textarea::placeholder {
  color:#999;
}

input, button, textarea {
  font: 400 18px Roboto, sans-serif;
}

form {
  width:100%;
}

form > div + div {
  margin-top: 15px;
}

h1 {
  display:flex;
  justify-content:space-between;
}

header + div {
  max-width: 1200px;
  margin:auto;
}

`;
