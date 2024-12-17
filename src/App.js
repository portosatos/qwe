import React, { useState, useEffect } from "react";
import axios from "axios";
import CryptoItem from "./CryptoItem";

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCryptoData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://api.coinlore.net/api/tickers/");
      setCryptoData(response.data.data);
      setFilteredData(response.data.data);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCryptoData();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = cryptoData.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(term.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div style={styles.container}>
      <h1>Cryptocurrency Prices</h1>
      <button onClick={fetchCryptoData} style={styles.button}>
        {loading ? "Loading..." : "Update"}
      </button>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        style={styles.input}
      />
      <div>
        {filteredData.map((crypto) => (
          <CryptoItem key={crypto.id} crypto={crypto} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    margin: "10px",
    cursor: "pointer",
    border: "1px solid lightblue",
    background: "#ffff",
  },
  input: {
    padding: "10px",
    width: "100%",
    maxWidth: "400px",
    margin: "10px 0",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
};

export default App;