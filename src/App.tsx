import { useCallback, useState } from "react";
import JsonParser from "./components/JsonParser";
import { data } from "./data";
import styles from "./App.module.css";

function App() {
  const [keyText, setKeyText] = useState("");
  const [valueText, setValueText] = useState("");

  const handleClick = useCallback(
    (key: string, value: string | boolean, idx = -1) => {
      if (idx !== -1) {
        setKeyText(`res.fields[${idx}].${key}`);
      } else {
        setKeyText(`res.${key}`);
      }
      setValueText(`${value}`);
    },
    []
  );
  return (
    <main className={styles.mainContainer}>
      <div className={styles.input}>{keyText}</div>
      <span className={styles.valueText}>{valueText}</span>
      <JsonParser jsonData={data} handleClick={handleClick} />
    </main>
  );
}

export default App;
