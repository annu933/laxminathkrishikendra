import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../context/ApiContext";

const React = require("react");

function UpdateProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState([
        {
            name: "",
            price: "",
            stock: "",
            type: ""
        }
    ])
    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const formData = new FormData(e.target); // auto-collects all input values
    //     const data = Object.fromEntries(new FormData(e.target).entries());

    //     try {
    //         const response = await axiosInstance.post("/product/create", data);
    //         console.log("response-data", response.data)
    //         navigate("/product")
    //         return response.data;
    //     } catch (error) {
    //         console.log(error)
    //     }


    //     console.log("formData", formData);
    // };

    React.useEffect(() => {
        fetch(`/product/view/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setFormData({
                    name: data.name || "",
                    price: data.price || "",
                    stock: data.stock || "",
                    type: data.type || ""
                })
            })
    }, [id])

    function handleChange(e) {
        console.log("eeeeeeeeee", e)
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("onsubmit", formData)
        const res = await fetch(`/product/edit/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            alert("Successfully updated Product");
            navigate("/product"); // update to correct path
        } else {
            alert("Failed to update Product")
        }
    }

    return (
        <div>
            <h1>Add Fertilizer</h1>
            <form
                onSubmit={handleSubmit}
            >
                <label>
                    Name: <input type="text" name="name" required value={formData.name} onChange={handleChange} />
                </label>
                <br />
                {/* <label>Type: <input type="text" name="type" required /></label><br /> */}
                <label>
                    Type:
                    <select name="type" required value={formData.type}>
                        <option value="">--Select Type--</option>
                        <option value="organic">Organic</option>
                        <option value="chemical">Chemical</option>
                        <option value="bio">Bio</option>
                    </select>
                </label>
                <br />
                <label>
                    Price: <input type="number" name="price" required value={formData.price} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Stock: <input type="number" name="stock" required value={formData.stock} onChange={handleChange} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default UpdateProduct;
