import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const data = ["item 1", "item 2", "item 3"];
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [individualCheck, setIndividualCheck] = useState();

  useEffect(() => {
    let temp = {};
    data.map((item, index) => (temp[index] = false));
    setIndividualCheck({ ...temp });
  }, []);
  useEffect(() => {
    let allCheckboxChecked = true;
    if (individualCheck) {
      let items = Object.values(individualCheck);
      for (let i = 0; i < items.length; i++) {
        if (items[i] === false) {
          allCheckboxChecked = false;
          break;
        }
      }
      setIsAllChecked(allCheckboxChecked);
    }
  }, [individualCheck]);

  const checkncheckAll = () => {
    let checkStatus = isAllChecked;
    setIsAllChecked(!checkStatus);
    if (individualCheck) {
      let items = Object.values(individualCheck);
      let _temp = { ...individualCheck };
      for (let i = 0; i < items.length; i++) {
        _temp[i] = !checkStatus;
      }
      setIndividualCheck(_temp);
    }
  };
  const renderData = () => {
    console.log("visd", individualCheck);
    return data.map((item, index) => {
      return (
        <div>
          <input
            type="checkbox"
            value={item}
            checked={(individualCheck && individualCheck[index]) || false}
            onClick={() => {
              let _temp = { ...individualCheck };
              _temp[index] = !_temp[index];
              setIndividualCheck(_temp);
            }}
          />
          <label>{item}</label>
        </div>
      );
    });
  };
  const allOrNone = () => {
    return (
      <div>
        <input
          type="checkbox"
          checked={isAllChecked}
          onClick={checkncheckAll}
        />
        <label>Select/ DeSelect All</label>
      </div>
    );
  };
  return (
    <div className="App">
      {allOrNone()}
      {renderData()}
    </div>
  );
}
