import React from 'react';
// Import your main website component – adjust the path!
// Example: if your web app exports a component called "WebApp"
import { WebApp } from './web/App';   // or './mobile/App'

function App() {
  return (
    <>
      {/* Your real website content */}
      <WebApp />
    </>
  );
}

export default App;
