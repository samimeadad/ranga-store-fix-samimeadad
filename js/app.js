const loadProducts = () => {
  // Programming-Hero provided API URL
  // const url = `https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json`;

  // Original API URL provided in the assignment
  const url = `https://fakestoreapi.com/products`;

  //Fetch the data from the server through API call
  fetch( url )
    .then( response => response.json() )
    .then( data => showProducts( data ) );
};

// show all product in UI
const showProducts = ( products ) => {
  const allProducts = products.map( ( pd ) => pd );
  for ( const product of allProducts ) {
    const div = document.createElement( "div" );
    div.classList.add( "product" );
    div.innerHTML = `
      <div class="single-product p-3 h-100 bg-light rounded">
        <div>
          <img class="product-image" src=${ product.image }></img>
        </div>
        <div>
          <h4>${ product.title }</h4>
          <p><b>Category:</b> ${ product.category }</p>
          <span class="text-danger"><b>Rating:</b> ${ product.rating.rate }</span><br>
          <span class="text-danger"><b>Rate Count:</b> ${ product.rating.count }</span>
          <h2 class="text-primary fw-bold">Price: $ ${ product.price }</h2>
          <button onclick="addToCart(${ product.price })" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
          <button id="details-btn" class="btn btn-danger">Details</button>
        </div>
      </div>
    `;
    document.getElementById( "all-products" ).appendChild( div );
  }
};

//function call when add to cart button is clicked
let count = 0;
const addToCart = ( price ) => {
  count = count + 1;
  updatePrice( "price", price );
  updateTaxAndCharge();
  updateTotal();
  document.getElementById( "total-Products" ).innerText = count;
};

//get the different field value of the cart through field id
const getInputValue = ( id ) => {
  const element = document.getElementById( id ).innerText;
  const converted = parseFloat( element );
  return converted;
};

// main price update function
const updatePrice = ( id, value ) => {
  const convertedOldPrice = getInputValue( id );
  const convertPrice = parseFloat( value );
  const total = convertedOldPrice + convertPrice;
  document.getElementById( id ).innerText = total.toFixed( 2 );
};

// set innerText function
const setInnerText = ( id, value ) => {
  document.getElementById( id ).innerText = value.toFixed( 2 );
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue( "price" );
  if ( priceConverted > 500 ) {
    setInnerText( "delivery-charge", 60 );
    setInnerText( "total-tax", priceConverted * 0.4 );
  }
  else if ( priceConverted > 400 ) {
    setInnerText( "delivery-charge", 50 );
    setInnerText( "total-tax", priceConverted * 0.3 );
  }
  else if ( priceConverted > 200 ) {
    setInnerText( "delivery-charge", 30 );
    setInnerText( "total-tax", priceConverted * 0.2 );
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue( "price" ) + getInputValue( "delivery-charge" ) +
    getInputValue( "total-tax" );
  document.getElementById( "total" ).innerText = grandTotal.toFixed( 2 );
};

loadProducts();