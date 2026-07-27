// "import './App.css'" loads the CSS file that styles this component — things like colors, layout, fonts
import "./App.css";
// "import Confetti from './Confetti'" loads the Confetti component so we can display falling confetti on the page
import Confetti from "./Confetti";

// "shareMessage" stores the text that will appear when someone shares this page on social media
const shareMessage = "I just ran my first container using Docker";
// "shareLink" is the URL that gets shared along with the message
const shareLink = "https://docker.com/";

// "const App = () =>" defines a React functional component called App — it's the main component of the entire page
// React components are reusable pieces of UI that return HTML-like code (called JSX)
const App = () => {
  // "return" sends back the JSX that React will render into the actual HTML page
  return (
    // "className='App'" applies the CSS class "App" for styling — React uses className instead of class because class is a reserved word in JavaScript
    <div className="App">
      {/* "Confetti" renders the confetti animation component — it makes colorful particles fall from the top of the screen */}
      <Confetti />
      {/* "header" is an HTML5 semantic element — "App-header" is a CSS class for styling it as a full-screen centered header */}
      <header className="App-header">
        {/* "style={{ marginBottom: '0px' }}" applies inline CSS — the double braces are because it's a JavaScript object inside JSX */}
        <h1 style={{ marginBottom: "0px" }}>Congratulations!!!</h1>
        {/* "style={{ marginTop: '10px', marginBottom: '50px' }}" adds spacing above and below this paragraph */}
        <p style={{ marginTop: "10px", marginBottom: "50px" }}>
          You ran your first container.
        </p>
        <div>
          {/* This is a Twitter/X share link — clicking it opens Twitter with a pre-filled post about running your first container */}
          {/* "target='_blank'" opens the link in a new tab so the user doesn't leave the current page */}
          {/* "rel='noopener noreferrer'" is a security measure — prevents the new page from accessing your page's JavaScript */}
          <a
            target="_blank"
            href={
              // "+" concatenates (joins) strings together to build the full Twitter share URL
              "https://twitter.com/intent/tweet?text=" +
              shareMessage +
              "&url=" +
              shareLink
            }
            // "class='fa-brands fa-x-twitter'" applies Font Awesome icon styling for the X (Twitter) logo
            class="fa-brands fa-x-twitter"
            rel="noopener noreferrer"
          >
            {" "}
          </a>
          {/* This is a LinkedIn share link — opens LinkedIn's share dialog with the Docker URL */}
          <a
            target="_blank"
            href={
              // Builds the LinkedIn share URL — LinkedIn uses "url=" as the parameter
              "https://www.linkedin.com/sharing/share-offsite/?url=" + shareLink
            }
            // "fa-brands fa-linkedin" shows the LinkedIn icon from Font Awesome
            class="fa-brands fa-linkedin"
            rel="noopener noreferrer"
          >
            {" "}
          </a>
          {/* This is a Reddit share link — opens Reddit's submit page with a pre-filled title and URL */}
          <a
            target="_blank"
            href={
              // Builds the Reddit share URL — Reddit uses "title=" and "url=" parameters
              "https://reddit.com/submit?title=" +
              shareMessage +
              "&url=" +
              shareLink
            }
            // "fa-brands fa-reddit" shows the Reddit icon from Font Awesome
            class="fa-brands fa-reddit"
            rel="noopener noreferrer"
          >
            {" "}
          </a>
        </div>
      </header>
    </div>
  );
};

// "export default App" makes this component available to import in other files — specifically index.js which renders the entire app
export default App;
