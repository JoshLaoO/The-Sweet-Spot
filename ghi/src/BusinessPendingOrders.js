import React, { useEffect, useState } from "react";


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

    async function changeOrderStatus(order_id) {
        const url = `http://localhost:8000/orders/${order_id}`;
        // const config = {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         complete: true,
        //     }),
        // };
        console.log({ "message": "order " + order_id + " complete" })

        await fetch(
            url,
            // config
        );
        await getOrders();
    };

    useEffect(() => {
        const fetchData = async () => {
            await getOrders();
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="mb-3 mt-3 d-grid gap-2 d-md-flex justify-content-md-end">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Order</th>
                            <th>Customer Information</th>
                            <th>Candy Name</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Ship</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map((order) => {
                                const total = calculateTotal(order.candy_id.price, order.quantity)
                                return (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>Needs update to model</td>
                                        <td>{order.candy_id.name}</td>
                                        <td>{order.quantity}</td>
                                        <td>{total}</td>
                                        <td>
                                            <button
                                                type="button"
                                                onClick={(() => changeOrderStatus(order.id))}
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
        </>
    );
}
export default BusinessPendingOrders;
