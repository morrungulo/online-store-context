import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Layout from './components/Layout';
import OnlineStoreCartContext from './contexts/OnlineStoreCartContext';
import OnlineStoreProductContext from './contexts/OnlineStoreProductContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <OnlineStoreProductContext>
      <OnlineStoreCartContext>
        <Layout>
          <App />
        </Layout>
      </OnlineStoreCartContext>
    </OnlineStoreProductContext>
  </React.StrictMode>
);
