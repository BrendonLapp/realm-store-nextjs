import './App.css';
import DataReader from './components/DataReader';
import NavBar from './components/nav/nav-bar';
import ProductDisplay from './components/store/product-display';

const App = () => (
  <div className="App">
    <NavBar />
    <header className="App-header">
      <DataReader />
      <ProductDisplay />
    </header>
  </div>
);

export default App;
