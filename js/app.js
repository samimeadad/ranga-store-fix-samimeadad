const loadProducts = () => {
  // Programming-Hero provided API URL
  const url = `https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json`;

  // Original API URL provided in the assignment. Sometimes it's getting problem fetching data from this API. So, I have used the above URL provided by Programming-Hero. Thanks.
  // const url = `https://fakestoreapi.com/products`;

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
    div.classList.add( "col" );
    div.innerHTML = `
      <div class="card single-product p-3 h-100 rounded">
        <div>
          <img class="product-image p-1 rounded-3 mx-auto" src=${ product.image }></img>
        </div>
        <div class="mt-2 card-body">
          <h4>${ product.title }</h4>
          <p><b>Category:</b> ${ product.category }</p>
          <span class="text-danger"><b>Avg. Rating:</b> ${ product.rating.rate }</span><br>
          <span class="text-danger"><b>Rate Count:</b> ${ product.rating.count }</span>
          <h2 class="text-primary fw-bold">Price: $ ${ product.price }</h2>
        </div>
        <div>
          <button onclick="addToCart(${ product.price })" id="addToCart-btn" class="buy-now btn btn-success w-50">add to cart</button>
          <button id="details-btn" class="btn btn-danger w-25">Details</button>
        </div>
      </div>
    `;
    document.getElementById( "all-products" ).appendChild( div );
  }
};

//function definition of addToCart, when add to cart button is clicked the function is called.
let count = 0;
const addToCart = ( price ) => {
  count = count + 1;
  document.getElementById( "total-Products" ).innerText = count;
  updatePrice( "price", price );
  updateTaxAndCharge();
  updateTotal();

};

//get the different field value of the cart through field id
const getCartFieldValue = ( id ) => {
  const fieldText = document.getElementById( id ).innerText;
  const fieldValue = parseFloat( fieldText );
  return fieldValue;
};

// main price update function
const updatePrice = ( id, value ) => {
  const convertedOldPrice = getCartFieldValue( id );
  const convertNewPrice = parseFloat( value );
  const total = convertedOldPrice + convertNewPrice;
  document.getElementById( id ).innerText = total.toFixed( 2 );
};

// set innerText function
const setInnerText = ( id, value ) => {
  document.getElementById( id ).innerText = value.toFixed( 2 );
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getCartFieldValue( "price" );
  //Condition for delivery charge and tax calculation. There was a small bug and due to that delivery charge and tax calculation was wrong. Now the bug has been fixed. Tax calculation is now OK.

  //Condition for the product price above 500 USD
  if ( priceConverted > 500 ) {
    setInnerText( "delivery-charge", 60 );
    setInnerText( "total-tax", priceConverted * 0.4 );
  }
  //Condition for the product price above 400 USD
  else if ( priceConverted > 400 && priceConverted < 500 ) {
    setInnerText( "delivery-charge", 50 );
    setInnerText( "total-tax", priceConverted * 0.3 );
  }
  //Condition for the product price above 200 USD
  else if ( priceConverted > 200 && priceConverted < 400 ) {
    setInnerText( "delivery-charge", 30 );
    setInnerText( "total-tax", priceConverted * 0.2 );
  }
  else {
    setInnerText( "delivery-charge", 20 );
    setInnerText( "total-tax", priceConverted * 0 );
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getCartFieldValue( "price" ) +
    getCartFieldValue( "delivery-charge" ) +
    getCartFieldValue( "total-tax" );
  document.getElementById( "total" ).innerText = grandTotal.toFixed( 2 );
};

loadProducts();