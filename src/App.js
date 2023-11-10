import React from 'react';
import './App.css';
import ItemCrypto from './components/ItemCrypto/ItemCrypto';

const sample = {
  id	:	"bitcoin",
  rank	:	1,
  symbol	:	"BTC",
  name	:	"Bitcoin",
  supply	:	19531443.0000000000000000,
  maxSupply	:	21000000.0000000000000000,
  marketCapUsd	:	678611740749.6755581391558964,
  volumeUsd24Hr	:	6451297924.8141906819957786,
  priceUsd	:	34744.5777943634557948,
  changePercent24Hr	:	-2.0842473588396722,
  vwap24Hr	:	34986.9198680731071661,
  explorer	:	"https://blockchain.info/"
}

const limit = 5;

function App() {
  const[listCryptos, setListCryptos] = React.useState([]);
  const[displayCryptos, setDisplayCryptos] = React.useState([]);
  const[search, setSearch] = React.useState("");

  const[page, setPage] = React.useState(1);
  const offSet = (page-1)*limit;

  // const[shouldUpdate, setShouldUpdate] = React.useState(false);


  // const myFunction = React.useCallback((parametro1, parametro2) => {

  // },[shouldUpdate]);

  // const myObjeto = React.useMemo({}, [shouldUpdate]);

  // const myObjeto1 = React.useRef(()=> 4+5);
  const miInput = React.useRef(null);

  React.useEffect(()=>{
    if(miInput&& miInput.current){
      miInput.current.addEventListener('keyup', (e)=>{
        console.log(e.target.value);
        setSearch(e.target.value);
      })
    }
  },[])

  React.useEffect(()=>{
    const filteredData = listCryptos.filter((crypto) => {
      console.log(crypto.name, search)
      return crypto.name.toLowerCase().includes(search.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(search.toLowerCase())
    });
    setDisplayCryptos(filteredData);
  },[search])

  // React.useEffect(()=> {
  //   console.log("Render function");
  // },[myFunction, myObjeto])

  ///{} === {} false
  ///()=>{} === ()=>{} false

  const fetchData = () => {
    fetch("https://api.coincap.io/v2/assets?limit="+limit+"&offset="+offSet)
      .then((response) => response.json())
      .then((dataJson) => {
        setListCryptos(dataJson.data);
        setDisplayCryptos(dataJson.data);
      });
  }

  React.useEffect(()=> {
    fetchData();
  },[offSet])

  React.useEffect(()=>{
    console.log("Disparo de Effect");
    // Updating Render, monting render
  })

  React.useEffect(()=>{
    console.log("Disparo de Effect did mounting");
    // Render, monting, did mount
   // componentDidMount()
  },[])


  // React.useEffect(()=>{
  //   console.log("Disparo de Effect updating");
  //   // Render, monting, did monting
  //   setTimeout(() => {
  //     setShouldUpdate(true)
  //   }, 2000);
  // },[shouldUpdate])

  // React.useEffect(()=>{
  //   return () => {return null}
  //   //componentWillUnmount()
  // },[])

  const siguiente = () => {
    setPage(page => page + 1);
  }

  const atras = () => {
    setPage(page => page - 1);
  }

  console.log(page, offSet, limit);

  return (
    <div className="App">
      <h1>Ranking Cryptos Modulo 3</h1>
      <input type="text" ref={miInput}/>
      <p>This is a React App Made in js to Deplot in Vercel credits to CoinCap</p>
      {displayCryptos.map((crypto) => <ItemCrypto 
            symbol={crypto.symbol}
            price={crypto.priceUsd}
            name={crypto.name}
            quantity={crypto.supply}
            marketCap={crypto.marketCapUsd}
            rank={crypto.rank}
            key={crypto.symbol}
          />
        )
      }
      {page !== 1 && <button onClick={atras}>Atras</button>}
     <button onClick={siguiente}>Siguiente</button>
    </div>
  );
}

export default App;
