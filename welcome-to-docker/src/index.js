// "import React" loads the React library, needed for JSX syntax to work
import React from 'react';
// "import ReactDOM from 'react-dom/client'" loads the React DOM renderer for React 18+, it connects React to the actual HTML page
import ReactDOM from 'react-dom/client';
// "import './index.css'" loads global CSS styles that apply to the entire app
import './index.css';
// "import App from './App'" loads our main App component, it contains all the page content
import App from './App';

// "document.getElementById('root')" finds the <div id="root"> element in index.html, that's where React takes over
// "ReactDOM.createRoot" creates a React root, this is the new React 18 way to start a React app
const root = ReactDOM.createRoot(document.getElementById('root'));
// "root.render()" tells React what to display inside the root element
root.render(
  // "<React.StrictMode>" is a development tool that highlights potential problems in your code
  // It runs components twice to catch bugs, it has no effect in production
  <React.StrictMode>
    {/* "<App />" renders our main App component, everything in the app starts from here */}
    <App />
  </React.StrictMode>
);
