import "../../css/MyDesign.css";
import search from "../../assest/search.png";
import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  image: string;
  current: boolean;
}

const MyDesign = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [design, setDesign] = useState<Product[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    fetch("/design.json")
      .then((res) => res.json())
      .then((data) => setDesign(data));
  }, []);

  return (
    <div className="my-design-container">
      <h3 className="history-title">Thiết kế của tôi</h3>
      <div>
        <form className="my-design-form">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="my-design-input"
          />
          <button type="submit" className="my-design-button">
            <img className="icon-search-bnt" src={search} />
          </button>
        </form>
      </div>

      <div className="my-design-content">
        <h5 className="history-work-title">Thiết kế của tôi</h5>
        <div className="my-design-list">
          {design.map((item) => (
            <div className="my-design-item" key={item.id}>
              <img className="my-design-image" src={item.image} />
              <p className="my-design-name">{item.name}</p>
              <button className="my-design-button-use">Edit</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyDesign;
