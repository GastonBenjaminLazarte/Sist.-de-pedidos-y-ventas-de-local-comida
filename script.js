const cart = [];

const cartCount = document.getElementById('cart-count');
const cartItemsList = document.getElementById('cart-items');
const cartSummary = document.getElementById('cart-summary');
const cartTotal = document.getElementById('cart-total');
const productFilters = document.querySelectorAll('.product-filter');
const addButtons = document.querySelectorAll('.btn-add-product');
const loginForm = document.getElementById('loginForm');
const loginStatus = document.getElementById('loginStatus');

function renderCart() {
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  cartCount.textContent = itemCount;
  cartSummary.textContent = `${itemCount} item${itemCount === 1 ? '' : 's'}`;
  cartTotal.textContent = `$ ${totalPrice.toLocaleString('es-AR')}`;

  if (cart.length === 0) {
    cartItemsList.innerHTML = '<li class="list-group-item px-0 text-muted">Todavía no agregaste productos.</li>';
    return;
  }

  cartItemsList.innerHTML = cart
    .map(
      (item) => `
        <li class="list-group-item d-flex justify-content-between align-items-center px-0">
          <div>
            <strong>${item.name}</strong>
            <div class="text-muted small">Cantidad: ${item.quantity}</div>
          </div>
          <span>$ ${(item.price * item.quantity).toLocaleString('es-AR')}</span>
        </li>
      `
    )
    .join('');
}

function addToCart(productName, productPrice) {
  const existingItem = cart.find(item => item.name === productName);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name: productName, price: productPrice, quantity: 1 });
  }

  renderCart();
}

addButtons.forEach(button => {
  button.addEventListener('click', () => {
    const row = button.closest('tr');
    const productName = row.dataset.name;
    const productPrice = Number(row.dataset.price);

    addToCart(productName, productPrice);
  });
});

productFilters.forEach(button => {
  button.addEventListener('click', () => {
    const selectedFilter = button.dataset.filter;

    productFilters.forEach(filterButton => {
      filterButton.classList.toggle('active', filterButton === button);
      filterButton.classList.toggle('btn-primary', filterButton === button);
      filterButton.classList.toggle('btn-outline-secondary', filterButton !== button);
    });

    const rows = document.querySelectorAll('#productos tbody tr');

    rows.forEach(row => {
      const category = row.dataset.category;
      const shouldShow = selectedFilter === 'all' || category === selectedFilter;
      row.style.display = shouldShow ? '' : 'none';
    });
  });
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const usuario = document.getElementById('usuario').value.trim();
  const contrasena = document.getElementById('contrasena').value.trim();

  if (!usuario || !contrasena) {
    loginStatus.textContent = 'Debe completar usuario y contraseña.';
    loginStatus.className = 'form-status error';
    return;
  }

  if (contrasena.length < 4) {
    loginStatus.textContent = 'La contraseña debe tener al menos 4 caracteres.';
    loginStatus.className = 'form-status error';
    return;
  }

  loginStatus.textContent = `Bienvenido/a, ${usuario}. Acceso autorizado.`;
  loginStatus.className = 'form-status success';
  loginForm.reset();
});

const cartToggle = document.getElementById('cart-toggle');
if (cartToggle) {
  cartToggle.addEventListener('click', () => {
    const cartSection = document.getElementById('productos');
    cartSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

renderCart();
