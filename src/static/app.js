window.addEventListener("DOMContentLoaded", setup);

async function setup() {
	
	// Assigning necessary variables

	let products = [];
	
	const searchInput = document.getElementsByClassName('search--input')[0];
	
	// Search Bar Functionality

	searchInput.addEventListener('input', ({ target }) => {
		const value = target.value;
		products.forEach(product => {
			const isVisible = product.title.includes(value);
			const element = document.getElementById(product.id);
			if (!isVisible) {
				element.style.display = 'none';
			} else {
				element.style.display = 'inline';
			}
			
		})
	})

	// Creating an HTML Framework for the product element

	function productFramework(imageSrc, price, title, id) {
		// Creating and accessing all the necessary elements

		
		const product = document.createElement('li');
		const productImage = document.createElement('img');
		const productTitle = document.createElement('h3');
		const productPrice = document.createElement('p');

		// Adding the correct attributes and classes

		product.classList.add('product');
		product.id = id;
		productImage.classList.add('product--image');
		productImage.setAttribute('src', imageSrc);
		productTitle.classList.add('product--title');
		productPrice.classList.add('product--price');

		// Adding and formatting the correct data

		productTitle.innerHTML = title;

		const USD = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD'
		}).format(price / 100);

		let displayPrice = USD;

		productPrice.textContent = displayPrice;

		// Nesting

		
		product.appendChild(productImage);
		product.appendChild(productTitle);
		product.appendChild(productPrice);

		// Return Product Element

		console.log(product);

		return product;
	}

	function renderProducts(products) {
		// Looping through the API results and appending them to the DOM
	
		for (let product in products) {
			const productElement = productFramework(products[product].images[0].src, products[product].price, products[product].title, products[product].id);
			const container = document.getElementsByClassName('products--grid')[0];

			container.appendChild(productElement);
		}
	}

	function getProducts() {
		// Fetching the products

		fetch('http://localhost:3000/products')
			.then((response) => {
				if (!response.ok) {
					throw new Error('Error in the response');
				}
				return response.json();
		}).then(data => {
			console.log(data);
			products = data.map(product => {
				return { title: product.title, price: product.price, id: product.id };
			})
			renderProducts(data);
		})
		.catch((error) => {
			console.log(error);
		});
	}

	// Calling the getProducts() function right on load

	getProducts();
}