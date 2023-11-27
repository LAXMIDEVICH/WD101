import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import "./styles.css";
const Found = () => {
  const [items, setItems] = useState([]);

  const getData = async () => {
    const data = await axios.get(
      "http://localhost:5000/api/found/getFoundItems"
    );
    setItems(data.data.items);
    const tempItem = await Promise.all(
      data.data.items.map(async (item) => {
        if (item.imagePath === undefined) return { ...item };
        const itemImg = await axios.get(
          `http://localhost:5000/image/${item.imagePath}`,
          { responseType: "blob" }
        );
        // console.log(itemImg);
        item.image = itemImg.data;
        item.imageURL = URL.createObjectURL(itemImg.data);
        return { ...item };
      })
    );
    // setItems( tempItem);

    setItems([...tempItem]);
  };
  useEffect(() => {
    getData();
  }, []);
  const navigate = useNavigate();
  return (
    <div className="table-container">
      <div className="table-header-container">
        <h1>Found Items</h1>
        <button onClick={() => navigate("/addFoundItem")}>
          Add Found Item
        </button>
      </div>
      <table className="lost-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Date</th>
            <th>Location</th>
            <th>Contact</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{new Date(item.date).toDateString()}</td>
              <td>{item.location}</td>
              <td>{item.phone}</td>
              <td>
                {item.imageURL === undefined ? null : (
                  <img
                    width="100"
                    height="100"
                    src={item.imageURL}
                    alt="lost item"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Found;
