import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./components/store";

export const CategoryList = () => {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleCheckout = () => {
    navigate("../CheckoutPage");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const category = await axios.get(
          "https://fakestoreapi.com/products/categories"
        );
        setCategory(category.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    fetchAllProduct();
  }, []);

  const fetchProduct = async (product) => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/category/${product}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product }));
  };

  const fetchAllProduct = async () => {
    try {
      const allProduct = await axios.get("https://fakestoreapi.com/products");

      setProducts(allProduct.data);
    } catch (error) {
      console.error(error);
    }
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
          <div
            style={{
              display: "flex",
              margin: "auto",
            }}
          >
            <ShoppingCart fontSize="large" onClick={handleCheckout} />
            {cartItems && (
              <span
                style={{
                  backgroundColor: "#ff3366",
                  color: "#fff",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "5px",
                }}
              >
                {cartItems.length}
              </span>
            )}
          </div>
        </div>
      </div>
      <Button
        variant="outlined"
        onClick={() => fetchAllProduct()}
        sx={{
          mx: "10px",
        }}
      >
        All
      </Button>
      {category.map((category) => (
        <Button
          variant="outlined"
          onClick={() => fetchProduct(category)}
          sx={{
            mx: "10px",
          }}
        >
          {category}
        </Button>
      ))}
      <div>
        <div style={{ textAlign: "left", margin: "50px 20px" }}>
          {products.map((product) => (
            <Card
              sx={{
                maxWidth: 345,
                mx: "25px",
                my: "20px",
                display: "inline-block",
                maxHeight: "380px",
                minWidth: "345px",
                height: "380px",
              }}
            >
              <CardMedia
                sx={{
                  height: 140,
                  media: {
                    backgroundSize: "content",
                  },
                }}
                image={product.image}
                title={product.title}
              />
              <CardContent>
                <Typography variant="h7" component="div">
                  {product.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: "10px",
                  }}
                >
                  {product.rating.rate} ⭐
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    my: "10px",
                  }}
                >
                  Price : $ {product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.rating.count} people purched the product.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
