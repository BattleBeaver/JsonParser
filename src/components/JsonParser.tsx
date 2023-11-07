import { useState } from "react";
import styles from "./JsonParser.module.css";

type Field = {
  id: string;
  prop: string;
  value: string;
  hasError: boolean;
};

interface JsonData {
  [key: string]: string | boolean | Array<Field>;
}

const JsonParser = ({ jsonData }: { jsonData: JsonData }) => {
  console.log("rendering");
  const [keyText, setKeyText] = useState("");
  const [valueText, setValueText] = useState("");

  const hanleClick = (key: string, value: string | boolean, idx = -1) => {
    if (idx !== -1) {
      setKeyText(`res.fields[${idx}].${key}`);
    } else {
      setKeyText(`res.${key}`);
    }
    setValueText(`${value}`);
  };

  const convertValue = (value: string | boolean) => {
    if (typeof value === "string") {
      return `'${value}'`;
    }
    return `${value}`;
  };
  const renderTree = (data: JsonData, isNested = false) => {
    return (
      <ul className={styles.ul}>
        {Object.keys(data).map((dataKey: string, index) => {
          return (
            <li key={index}>
              {Array.isArray(data[dataKey]) ? (
                <>
                  <span>{dataKey}</span>:&nbsp; &#91;
                  {(data[dataKey] as Array<Field>).map((nested: Field, idx) => (
                    <div className={styles.nested} key={idx}>
                      &#123;{renderTree(nested, true)} &#125;&#44;
                    </div>
                  ))}
                  &#93;,
                </>
              ) : (
                <>
                  <span
                    onClick={() => {
                      if (isNested) {
                        const idx = (jsonData.fields as Array<Field>).findIndex(
                          (field: Field) => field.id === data.id
                        );
                        hanleClick(
                          dataKey,
                          data[dataKey] as string | boolean,
                          idx
                        );
                      } else {
                        hanleClick(dataKey, data[dataKey] as string | boolean);
                      }
                    }}
                    className={styles.clickable}
                  >
                    {dataKey}
                  </span>{" "}
                  :&nbsp;
                  <span>
                    {convertValue(data[dataKey] as string | boolean)},
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.input}>{keyText}</div>
      <span className={styles.valueText}>{valueText}</span>
      <span>Response</span>
      <div className={styles.result}>{renderTree(jsonData)}</div>
    </div>
  );
};

export default JsonParser;
