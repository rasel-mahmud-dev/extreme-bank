import type { Component } from 'solid-js';
import Navigation from "./components/Navigation/Navigation"
import HomePage from "./pages/HomePage/HomePage";

const App: Component = () => {
  return (
    <div >
     <Navigation />
        <HomePage />
    </div>
  );
};

export default App;
