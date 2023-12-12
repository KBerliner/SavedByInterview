import express from "express";
import path from "path";
import products from "./data/products.json" assert { type: "json" };
import cartAPI from "./cartAPI.js";
const app = express();

app.use((req, res, next) => {
	console.log(req.path);
	next();
});

// SERVE STATIC PAGES
app.use(express.static(path.join(process.cwd(), "/src/static")));

// ~~~~~ API ~~~~~ //
app.get("/products", (req, res) => {
	res.send(products);
});

// CART
cartAPI(app);

app.listen(3000, (...e) => console.log("Server Started", e));
