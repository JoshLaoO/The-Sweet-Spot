import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BusinessPendingOrders() {
    const [orders, setOrders] = useState([]);

    async function getOrders() {
        const url = "http://localhost:8000/orders"
        const data = await fetch(url).then(response => response.json());
        setOrders(data)
    }

    function calculateTotal(price, quantity) {
        return price * quantity;
    };

    async function changeOrderStatus(order_id, candy_id, quantity) {
        const url = `http://localhost:8000/orders/${order_id}`;
        const config = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                candy_id: candy_id,
                quantity: quantity,
                sold: true,
            }),
        };

        await fetch(
            url,
            config
        );
        await getOrders();
    };

    useEffect(() => {
        const fetchData = async () => {
            await getOrders();
        };

        fetchData();
    }, []);

    const not_sold = orders.filter(order => !order.sold);

    return (
        <>
        <h1>Pending Orders</h1>
            <div className="mb-3 mt-3 d-grid gap-2 d-md-flex justify-content-md-end">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Candy Name</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Ship</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            not_sold?.map((order) => {
                                const total = calculateTotal(order.candy_id.price, order.quantity)
                                return (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.candy_id.name}</td>
                                        <td>{order.quantity}</td>
                                        <td>{total}</td>
                                        <td>
                                            <button
                                                className="btn btn-info text-white"
                                                onClick={(() => changeOrderStatus(order.id, order.candy_id.id, order.quantity))}
                                            >
                                                Ship
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <Link to="/history" className="btn btn-info text-white m-2">Transaction History</Link>
        </>
    );
}
export default BusinessPendingOrders;
