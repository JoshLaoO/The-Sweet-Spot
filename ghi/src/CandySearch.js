import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "./features/cart/cartSlice";
function CandySearch() {
    const { search } = useParams()
    const [candies, setCandies] = useState([])
    const [candyQuantities, setCandyQuantities] = useState({});
    const dispatch = useDispatch()
    const getCandy = async () => {
        const candyURL = `${process.env.REACT_APP_API_HOST}/candy`;
        const candyResponse = await fetch(candyURL);
        if (candyResponse.ok) {
            const data = await candyResponse.json();
            setCandies(data);
        }
    }
    const handleQuantityChange = (candyId, change) => {
        setCandyQuantities(prevQuantities => ({
            ...prevQuantities,
            [candyId]: Math.max(1, (prevQuantities[candyId] || 1) + change)
        }));
    };

    const handleAddToCart = (candyId) => {
        const quantity = candyQuantities[candyId] || 1;
        dispatch(addToCart({ candyId, quantity }));
    };
    useEffect(() => {
        getCandy();
    }, [])
    return (
        <div className="product-container">
            {candies.filter((candy) => candy.name.toLowerCase().includes(search.toLowerCase())).map((candy) => (
                <div key={candy.id} className="product-item">
                    <img src={candy.picture_url} alt={candy.name} />
                    <h3><Link to={`/candy/${candy.id}`}>{candy.name}</Link></h3>
                    <p>Price: ${candy.price}</p>
                    <div className="quantity-controls">
                        <button className="shoppingCartWarp_content_list_actionNumChangeButton" onClick={() => handleQuantityChange(candy.id, -1)}>-</button>
                        <span>{candyQuantities[candy.id]}</span>
                        <button className="shoppingCartWarp_content_list_actionNumChangeButton" onClick={() => handleQuantityChange(candy.id, 1)}>+</button>
                    </div>
                    <button onClick={() => handleAddToCart(candy.id)} className="add-to-cart-button">
                        Add To Cart
                    </button>
                </div>
            ))}
        </div>
    )
}
export default CandySearch