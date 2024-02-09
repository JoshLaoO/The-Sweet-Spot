import React, { useEffect, useState } from "react";

function TransactionHistory() {
    const [orders, setOrders] = useState([]);

    async function getOrders() {
        const url = "http://localhost:8000/orders"
        const data = await fetch(url).then(response => response.json());
        setOrders(data);
    }

    function calculateTotal(price, quantity) {
        return price * quantity;
    };

    useEffect(() => {
        const fetchData = async () => {
            await getOrders();
        };

        fetchData();
    }, []);

    const sold = orders.filter(order => order.sold);

return (
    <>
        <h1>Transaction History</h1>
        <div className="mb-3 mt-3 d-grid gap-2 d-md-flex justify-content-md-end">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Candy Name</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Shipped Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sold?.map((order) => {
                            const total = calculateTotal(order.candy_id.price, order.quantity)
                            return (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.candy_id.name}</td>
                                    <td>{order.quantity}</td>
                                    <td>{total}</td>
                                    <td>Shipped Date</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    </>
);
}


export default TransactionHistory;
