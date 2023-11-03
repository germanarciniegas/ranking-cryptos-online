import './ItemCrypto.css';

const ItemCrypto = (props) => {
    return (
        <div className='container-crypto'>
            <div className='header-crypto'>
                <h1>Nombre:<span className='price-crypto'>{props.name}</span></h1>
                <h2>Price:<span className='price-crypto'>${parseFloat(props.price).toFixed(2)}</span></h2>
            </div>
            <div className='body-crypto'>
                <p>{'Ranking: ' +props.rank}</p>
                <p>{'Simbolo: ' +props.symbol}</p>
                <p>{'Capitalizzacion: ' +props.marketCap}</p>
                <p>{'Cantidad: ' +props.quantity}</p>
            </div>
        </div>
    )
};

export default ItemCrypto;