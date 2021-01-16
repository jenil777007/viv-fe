import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import WeatherComponent from "./components/WeatherComponent";

function App() {
  return (
    <div className="App">
      <Header />
      <WeatherComponent />
    </div>
  );
}

export default App;
