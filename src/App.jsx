import { useEffect, useState } from 'react'
import './App.css'
import img from "./assets/images/exchange.png"
import axios from "axios";

function App() {

  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    const getExchangeRate = async () => {
      try{
        let url = `https://open.er-api.com/v6/latest/${fromCurrency}`;
        let response = await axios.get(url);
        console.log(response)
        setExchangeRate(response.data.rates[toCurrency]);
      }
      catch(error){
        console.log("Error fetching Exchange rate: ", error);
      }
    }
    getExchangeRate();
  },[fromCurrency, toCurrency])

  useEffect(() => {
    if(exchangeRate !== null){
      setConvertedAmount((amount * exchangeRate).toFixed(2))
    }
  }, [amount, exchangeRate])

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  }

  const handleFromCurrencyChange  = (e) => {
    setFromCurrency(e.target.value);
  }

  const handleToCurrencyChange  = (e) => {
    setToCurrency(e.target.value)
  }
   


  return (
    <>
      <div className="container">
        <div className="image">
          <img src={img} alt="" />
        </div>
        <div className="heading"><h2>CURRENCY CONVERTER</h2></div>
        <div className="input-box">
          <label htmlFor="">Amount</label>
          <input type="number" value={amount} onChange={handleAmountChange}/>
        </div>
        <div className="input-box">
          <label htmlFor="">From Currency</label>
          <select name="" id="" value={fromCurrency} onChange={handleFromCurrencyChange}>
            <option value="USD">USD - United States Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound Sterling</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="CNY">CNY - Chinese yuan</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="USD">BRL - Brazilian Real</option>
            <option value="USD">ZAR - South African Rand</option>
          </select>
          <div className="input-box">
            <label htmlFor="">To Currency</label>
          <select name="" id="" value={toCurrency} onChange={handleToCurrencyChange}>
            <option value="USD">USD - United States Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound Sterling</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="CNY">CNY - Chinese yuan</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="USD">BRL - Brazilian Real</option>
            <option value="USD">ZAR - South African Rand</option>
          </select>
          </div>
          <div className="result">
            <p>{amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
