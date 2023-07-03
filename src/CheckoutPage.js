import React from "react";
import { Button, Paper, Grid, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { removeFromCart } from "./components/store";

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };
  const backToHome = () => {
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: "4",
            alignItems: "flex-start",
            paddingLeft: "50px",
          }}
        >
          <h1>Find Here !</h1>
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
          <Button
            variant="contained"
            onClick={() => backToHome()}
            sx={{ margin: "auto" }}
          >
            Back
          </Button>
        </div>
      </div>
      <div style={{ textAlign: "left" }}></div>

      <div>
        <h2>Shopping Cart</h2>
        {cartItems && cartItems.length ? (
          <div>
            {cartItems.map((item) => (
              <Paper
                sx={{
                  p: 2,
                  margin: "auto",
                  maxWidth: 600,
                  flexGrow: 1,
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography gutterBottom variant="h7" component="div">
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Quantity : {item.quantity}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography sx={{ cursor: "pointer" }} variant="body2">
                          <Button
                            size="small"
                            onClick={() => handleRemoveFromCart(item.id)}
                          >
                            Remove
                          </Button>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" component="div">
                        Price : {item.price * item.quantity}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};
