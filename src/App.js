/* istanbul ignore file */
import { BrowserRouter } from 'react-router-dom';

import './styles/globals.css';

import { makeServer } from "./miragejs/server";

import Routes from './routes';
import Header from './components/header';
import Footer from './components/footer';

if (process.env.NODE_ENV === "development") {
  // Mirage JS code will ever reach your production build.
  makeServer({ environment: "development" })
}

function App() {
  return (
    <div className="bg-white">
      <Header />

      <BrowserRouter>
        <Routes />
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
