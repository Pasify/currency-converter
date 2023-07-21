import { useEffect, useState } from "react";
import "./App.css";
// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
function App() {
  const [currencyValue, setCurrencyValue] = useState(1);
  const [fromValue, setFromValue] = useState("USD");
  const [toValue, setToValue] = useState("EUR");
  const [output, setOutput] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  function onSetCurrencyValue(e) {
    setCurrencyValue(Number(e.target.value));
  }

  function onSetFromValue(e) {
    setFromValue(e.target.value);
  }
  function onSetToValue(e) {
    setToValue(e.target.value);
  }

  useEffect(
    function () {
      async function getRate() {
        setIsLoading(true);
        try {
          let res = await fetch(
            `https://api.frankfurter.app/latest?amount=${currencyValue}&from=${fromValue}&to=${toValue}`
          );
          let data = await res.json();
          let { rates: rate } = data;
          setOutput(rate[toValue].toFixed(2));
          setIsLoading(false);
        } catch (err) {
          console.log(err.message);
        } finally {
        }
      }
      if (fromValue === toValue) {
        alert(`cannot convert from ${fromValue} to ${toValue}`);
        setOutput(currencyValue);
      } else getRate();
    },
    [currencyValue, fromValue, toValue]
  );

  return (
    <>
      <InputValue
        currencyValue={currencyValue}
        onSetCurrencyValue={onSetCurrencyValue}
        isLoading={isLoading}
      />
      <Selection
        fromValue={fromValue}
        onSetFromValue={onSetFromValue}
        toValue={toValue}
        onSetToValue={onSetToValue}
        output={output}
        isLoading={isLoading}
      />
    </>
  );
}

function InputValue({ currencyValue, onSetCurrencyValue, isLoading }) {
  return (
    <input
      type="text"
      value={currencyValue}
      onChange={onSetCurrencyValue}
      disabled={isLoading}
    />
  );
}
function Selection({
  fromValue,
  onSetFromValue,
  toValue,
  onSetToValue,
  output,
  isLoading,
}) {
  return (
    <>
      <select
        name=""
        id=""
        value={fromValue}
        onChange={onSetFromValue}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="GBP">GBP</option>
      </select>
      <select
        name=""
        id=""
        value={toValue}
        onChange={onSetToValue}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="GBP">GBP</option>
      </select>

      <p>
        {output} {toValue}
      </p>
    </>
  );
}
export default App;
