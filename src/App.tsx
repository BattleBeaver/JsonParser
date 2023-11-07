import "./App.css";
import JsonParser from "./components/JsonParser";
import { data } from "./data";

function App() {
  return (
    <main>
      <JsonParser jsonData={data} />
    </main>
  );
}

export default App;
