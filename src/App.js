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

function App() {
  const[listCryptos, setListCryptos] = React.useState([]);

  React.useEffect(()=> {
    fetch("https://api.coincap.io/v2/assets")
      .then((response) => response.json())
      .then((dataJson) => {setListCryptos(dataJson.data)});
  },[])

  return (
    <div className="App">
      <h1>Ranking Cryptos</h1>
      {listCryptos.map((crypto) => <ItemCrypto 
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
     
    </div>
  );
}

export default App;
