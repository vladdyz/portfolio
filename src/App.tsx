import Header from './components/Header';
import About from './components/About';
import Work from './components/Work';
import Contact from './components/Contact';
import CursorTrail from './components/CursorTrail';

function App() {
  return (
    <div id="top">
      <CursorTrail />
      <Header />
      <main>
        <About />
        <Work />
        <Contact />
      </main>
    </div>
  );
}

export default App;
