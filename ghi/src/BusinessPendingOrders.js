import React, { useEffect, useState } from "react";


function BusinessPendingOrders() {
    const [orders, setOrders] = useState([]);
    async function getOrders() {
        const url = "http://localhost:8000/orders"
        const response = await fetch(url)
        if (response.ok){
            const data = await response.json();
            setOrders(data.orders)
            // console.log(orders)
            console.log(response.json())
        }
    }


useEffect(() => {
    getOrders()
}
)

return (
    <>
        <div className="mb-3 mt-3 d-grid gap-2 d-md-flex justify-content-md-end">
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Order</th>
                    <th>Customer Information</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Ship</th>
                </tr>
            </thead>
            <tbody>
                {/* {
                    orders?.map((order) => {
                        return (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                            </tr>
                        )
                    })
                } */}
                <tr>
                    <td>1</td>
                    <td>Customer 1</td>
                    <td>10</td>
                    <td>25</td>
                    <td>
                        <button

                            type="button"

                        >
                            Ship
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
    </>
    );
}
export default BusinessPendingOrders;
