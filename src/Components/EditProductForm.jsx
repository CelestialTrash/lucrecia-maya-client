import "./EditProductForm.css"
import axios from "axios"
import { useState } from "react"

const API_URL = import.meta.env.VITE_API_URL
const authToken = localStorage.getItem("Authorization")

function EditProductForm({id, title, price, image, cancelEdit,getProducts}) {
    const [newTitle, setNewTitle] = useState(title)
    const [newPrice, setNewPrice] = useState(price)
    const [newImage, setNewImage] = useState(image)
    const [errorMessage, setErrorMessage] = useState()

    const handleEditProduct = (e) => {
        e.preventDefault()

        const updatedProduct = {
            title: newTitle,
            price: newPrice,
            image: newImage,
        }

        if(authToken) {
            axios.put(`${API_URL}/api/products/${id}`, updatedProduct, { headers: { Authorization: `Bearer ${authToken}`} })
            .then((response) => {
                console.log("Product updated", response);
            })
            .then(() => getProducts())
            .then(() => cancelEdit()) 
            .catch((error) => {
                console.error(error);
                setErrorMessage(error.response.data.message);
        
                setTimeout(() => {
                    setErrorMessage(null);
                }, 10000);
            });
        }
        
    }

    return(
        <section className="form-section">
            <form onSubmit={handleEditProduct}>
            <h1>Edit Product</h1>
                <label htmlFor="title">Title</label>
                <input onChange={(e) => setNewTitle(e.target.value)} type="text" name="title" id="title" value={newTitle} />
                <label htmlFor="price">Price</label>
                <input onChange={(e) => setNewPrice(e.target.value)} type="Number" name="price" id="price" value={newPrice} />
                <label htmlFor="image">Image</label>
                <input onChange={(e) => setNewImage(e.target.value)} type="text" name="image" id="image" value={newImage} />

                <button type="submit">Save</button>
                <button type="button" onClick={cancelEdit}>Cancel</button>
                <p className="error">{errorMessage}</p>
            </form>
        </section>
    )
}

export default EditProductForm