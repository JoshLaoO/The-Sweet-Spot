import React, { useState, useEffect } from 'react';

function CandyForm() {
    const [name, setName] = useState('')
    const [businesses, setBusinesses] = useState([])
    const [business, setBusiness] = useState(0)
    const [picture_url, setPictureUrl] = useState('')
    const[description,setDescription] = useState('')
    const [price, setPrice]= useState(0)
    const [stock, setStock]= useState(0)
    const[submitted,setSubmitted] = useState(false)
    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
    }
    const handleBusinessChange = (e) => {
        const value = e.target.value;
        console.log(value)
        setBusiness(value)
    }
    const handlePictureURLChange = (e) => {
        const value = e.target.value;
        setPictureUrl(value);
    }
    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        setDescription(value);
    }
    const handlePriceChange = (e) => {
        const value = e.target.value;
        setPrice(value);
    }
    const handleStockChange = (e) => {
        const value = e.target.value;
        setStock(value);
    }
    const getBusinesses = async () => {
        const URL = 'http://localhost:8000/businesses'
        const response = await fetch(URL)
        if(response.ok){
            const data = await response.json();
            console.log(data)
            setBusinesses(data)
        }
    }
    useEffect(() => {
        getBusinesses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            name,
            business,
            picture_url,
            description,
            price,
            stock,
        }

        console.log(data)

        const candyURL = 'http://localhost:8000/candy'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const candyResponse = await fetch(candyURL, fetchConfig)
        if (candyResponse.ok) {
            const candy = await candyResponse.json()
            console.log(candy)
            setName('')
            setBusiness(0)
            setPictureUrl('')
            setDescription('')
            setSubmitted(true)
        }
    }
    const messageClasses = (!submitted) ? 'alert alert-success d-none mb-0' : 'alert alert-success mb-0';
    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a candy</h1>
                    <form onSubmit={handleSubmit} id="create-hat-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleNameChange} value={name} placeholder="Candy Name" required type="text" name="name" id="name" className="form-control" />
                            <label htmlFor="name">Candy Name</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleBusinessChange} value={business} required name="business" id="business" className="form-select">
                                <option value="">Business</option>
                                {businesses.map(b => {
                                    return (
                                        <option key={b.business_id} value={b.business_id}>{b.business_name}</option>
                                    )
                                })};
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePictureURLChange} value={picture_url} placeholder="Picture URL" required type="text" name="picture_url" id="picture_url" className="form-control" />
                            <label htmlFor="picture_url">Picture URL</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleDescriptionChange} value={description} placeholder="Description" required type="text" name="description" id="description" className="form-control" />
                            <label htmlFor="description">Description</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePriceChange} value={price} placeholder="Price" required type="text" name="price" id="price" className="form-control" />
                            <label htmlFor="price">Price</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleStockChange} value={stock} placeholder="Stock" required type="text" name="stock" id="stock" className="form-control" />
                            <label htmlFor="stock">Stock</label>
                        </div>
                        <button className="btn btn-primary">Add Candy</button>
                    </form>
                </div>
                <div className={messageClasses} role="alert">
            Candy Created!
          </div>
            </div>
        </div>
    )

}

export default CandyForm;