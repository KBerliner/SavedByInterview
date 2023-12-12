import products from "./data/products.json" assert { type: "json" };

/**
 *
 * @param {import("express").Application} app
 */
export default function cartAPI(app) {
	// GET CART
	app.get("/cart", (req, res) => {
		res.send(cart);
	});

	// UPDATE CART
	/*
    body = {
      [<ID>]: <QUANTITY>
    }
  */
	app.post("/cart/update", (req, res) => {
		try {
			for (const [id, quantity] of Object.entries(req.body)) {
				const product = products.find((p) => p.id === Number(id));
				if (!product) continue;
				const cartProduct = cart.items.find((item) => item.id === id);
				if (cartProduct) {
					cartProduct.quantity = quantity;
				} else {
					cart.items.push({
						id: product.id,
						title: product.title,
						price: product.price,
						quantity,
					});
				}
			}
		} catch (e) {
			return res.sendStatus(400);
		}

		try {
			cart.total = cart.items.reduce((p, c) => p + c.price * c.quantity, 0);
		} catch (e) {
			return res.status(500).send(e.message);
		}
		res.send(cart);
	});
}

// SESSION CART
const cart = {
	items: [],
	total: 0,
};
