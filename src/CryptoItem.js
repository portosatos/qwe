import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function CryptoItem({ crypto }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={styles.card}>
      <div style={styles.header} onClick={() => setIsOpen(!isOpen)}>
        <h3 style={styles.name}>{crypto.name}</h3>
        <span style={styles.symbol}>{crypto.symbol}</span>
      </div>
      {isOpen && (
        <div style={styles.details}>
          <p>Price USD: ${crypto.price_usd}</p>
          <p>Price BTC: {crypto.price_btc}</p>
          <Tooltip
            title={
              <Box
                sx={{
                  backgroundColor: "#007bff",
                  color: "#fff",
                  padding: "10px",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                  maxWidth: "130px",
                  textAlign: "center",
                }}
              >
                The market capitalization of a cryptocurrency is calculated by
                multiplying the number of coins in circulation by the current
                price.
              </Box>
            }
            placement="top-start"
            PopperProps={{
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [-10, -10],
                  },
                },
              ],
            }}
            componentsProps={{
              tooltip: {
                sx: {
                  backgroundColor: "#007bff",
                  color: "#fff",
                  boxShadow: "none",
                  borderRadius: "8px",
                },
              },
            }}
          >
            <Typography>
              <strong>Market Cap:</strong> ${crypto.market_cap_usd}
            </Typography>
          </Tooltip>
          <p>
            Change 24h:{" "}
            <span
              style={{
                color: crypto.percent_change_24h > 0 ? "green" : "red",
              }}
            >
              {crypto.percent_change_24h}%
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "5px",
    margin: "10px 0",
    padding: "10px",
    cursor: "pointer",
    textAlign: "left",
    backgroundColor: "#fff", // Белый фон
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)", // Легкая тень для контраста
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    margin: 0,
  },
  symbol: {
    fontWeight: "bold",
    fontSize: "14px",
    color: "#555",
  },
  details: {
    marginTop: "10px",
  },
};

export default CryptoItem;
