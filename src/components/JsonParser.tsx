import { memo } from "react";
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

const JsonParser = ({
  jsonData,
  handleClick,
}: {
  jsonData: JsonData;
  handleClick: (key: string, value: string | boolean, idx?: number) => void;
}) => {
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
                        handleClick(
                          dataKey,
                          data[dataKey] as string | boolean,
                          idx
                        );
                      } else {
                        handleClick(dataKey, data[dataKey] as string | boolean);
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
    <div className={styles.mainTreeContainer}>
      <span>Response</span>
      <div className={styles.result}>{renderTree(jsonData)}</div>
    </div>
  );
};

const Parser = memo(JsonParser);

export default Parser;
