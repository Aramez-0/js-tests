import { useState } from "react";
import './index.css'

function CreateUpgrade({name, desc, cost, setD, setM, money, setPD, passive}) {
    
    const [price, setPrice] = useState(cost)

    function buy() {
        passive ? 
        setPD((initial) => {
            return initial + (cost / 2)
        }) :
        setD((intitial) => {
            return intitial + cost
        })
        
        setM((initial) => {
            return initial - price
        })

        setPrice((initial) => {
            return initial + (cost * cost)
        })
    }

    return (
        <div className={`upgrade`}>
            <h3>{name}</h3>
            <p>{desc}</p>
            <p>${price}</p>
            <button type="button" onClick={money >= price ? buy : null} disabled={money < price}>Buy</button>
        </div>
    )
}

export default CreateUpgrade