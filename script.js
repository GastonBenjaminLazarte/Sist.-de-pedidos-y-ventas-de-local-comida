const STATUS_FLOW = ['NUEVO', 'CONFIRMADO', 'EN PREPARACIÓN', 'LISTO', 'EN CAMINO', 'ENTREGADO'];
const STORAGE_KEY = 'comanda-local-state-v1';

const defaultState = {
  products: [
    { id: 1, name: 'Hamburguesa completa', category: 'hamburguesas', price: 5500, description: 'Carne, queso, tomate, lechuga y salsa casera.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80', available: true, stock: 18 },
    { id: 2, name: 'Pizza muzzarella', category: 'pizzas', price: 7000, description: 'Pizza clásica con salsa, muzzarella y albahaca.', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80', available: true, stock: 12 },
    { id: 3, name: 'Ensalada de estación', category: 'frescos', price: 4800, description: 'Mix de hojas frescas, tomate, cebolla y aderezo.', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=900&q=80', available: true, stock: 3 },
    { id: 4, name: 'Limonada casera', category: 'bebidas', price: 1800, description: 'Bebida fresca natural con limón.', image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=900&q=80', available: true, stock: 20 },
    { id: 5, name: 'Papas fritas', category: 'frescos', price: 2600, description: 'Porción crocante para acompañar.', image: 'https://images.unsplash.com/photo-1576100406425-022a92b659f3?auto=format&fit=crop&w=900&q=80', available: true, stock: 14 },
    { id: 6, name: 'Milanesa con papas', category: 'hamburguesas', price: 6300, description: 'Plato completo con papas y guarnición.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80', available: true, stock: 8 }
  ],
  categories: ['hamburguesas', 'pizzas', 'frescos', 'bebidas'],
  users: {
    empleado: { username: 'empleado', password: '1234', role: 'empleado' },
    repartidor: { username: 'repartidor', password: '1234', role: 'repartidor' },
    admin: { username: 'admin', password: '1234', role: 'admin' }
  },
  orders: [
    {
      number: 25,
      client: 'Juan Pérez',
      phone: '1122334455',
      address: 'Av. Rivadavia 1234',
      zone: 'Centro',
      reference: 'Portón azul',
      tipo: 'domicilio',
      payment: 'transferencia',
      status: 'EN PREPARACIÓN',
      note: 'Sin cebolla',
      items: [
        { id: 1, name: 'Hamburguesa completa', quantity: 2, price: 5500 },
        { id: 4, name: 'Limonada casera', quantity: 2, price: 1800 }
      ],
      total: 14600,
      deliveryUser: 'Repartidor 1'
    },
    {
      number: 26,
      client: 'Lucía Fernández',
      phone: '1199887766',
      address: 'Calle 9 de Julio 456',
      zone: 'Almagro',
      reference: 'Frente a farmacia',
      tipo: 'retiro',
      payment: 'efectivo',
      status: 'LISTO',
      note: '',
      items: [
        { id: 2, name: 'Pizza muzzarella', quantity: 1, price: 7000 }
      ],
      total: 7000,
      deliveryUser: null
    }
  ],
  nextOrderNumber: 27,
  activeFilter: 'todos',
  cart: []
};

const formatMoney = (value) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value);

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultState));
      return structuredClone(defaultState);
    }

    const parsed = JSON.parse(saved);
    return {
      ...structuredClone(defaultState),
      ...parsed,
      products: Array.isArray(parsed.products) && parsed.products.length ? parsed.products : structuredClone(defaultState.products),
      orders: Array.isArray(parsed.orders) ? parsed.orders : structuredClone(defaultState.orders),
      cart: Array.isArray(parsed.cart) ? parsed.cart : []
    };
  } catch (error) {
    console.warn('No se pudo cargar el estado guardado, usando estado por defecto.', error);
    return structuredClone(defaultState);
  }
}

const state = loadState();

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn('No se pudo guardar la sesión actual.', error);
  }
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getCartSubtotal() {
  return state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function getCartShipping(deliveryType = document.getElementById('deliveryType')?.value || 'domicilio') {
  if (!state.cart.length) return 0;
  return deliveryType === 'domicilio' ? 1200 : 0;
}

function renderProducts() {
  const products = state.products.filter((product) => {
    if (state.activeFilter === 'todos') return product.available !== false;
    return product.category === state.activeFilter && product.available !== false;
  });

  const grid = document.getElementById('productGrid');
  if (!grid) return;

  grid.innerHTML = products.map((product) => {
    const badge = product.stock > 5 ? '<span class="badge badge-status bg-success">Disponible</span>' : '<span class="badge badge-status bg-warning text-dark">Stock bajo</span>';

    return `
      <div class="col-md-6 col-xl-4">
        <div class="product-card card h-100 shadow-sm border-0">
          <img class="card-img-top" src="${product.image}" alt="${product.name}">
          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-start gap-2">
              <h3 class="h6 mb-0">${escapeHtml(product.name)}</h3>
              ${badge}
            </div>
            <p class="product-categories mt-2">${escapeHtml(product.category)}</p>
            <p class="text-muted small flex-grow-1">${escapeHtml(product.description)}</p>
            <div class="product-meta">
              <strong>${formatMoney(product.price)}</strong>
              <button type="button" class="btn btn-sm btn-primary btn-add-product" data-id="${product.id}">Agregar</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  document.querySelectorAll('.btn-add-product').forEach((button) => {
    button.addEventListener('click', () => addToCart(Number(button.dataset.id)));
  });
}

function addToCart(productId) {
  const product = state.products.find((item) => item.id === productId);
  if (!product || product.available === false) return;

  const existing = state.cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
  }

  saveState();
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById('cartItems');
  const cartBadge = document.getElementById('cartBadge');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const cartShipping = document.getElementById('cartShipping');
  const cartTotal = document.getElementById('cartTotal');

  const selectedDelivery = document.getElementById('deliveryType')?.value || 'domicilio';
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = getCartSubtotal();
  const shipping = getCartShipping(selectedDelivery);
  const total = subtotal + shipping;

  cartBadge.textContent = `${totalItems} items`;
  cartSubtotal.textContent = formatMoney(subtotal);
  cartShipping.textContent = formatMoney(shipping);
  cartTotal.textContent = formatMoney(total);

  if (!state.cart.length) {
    cartItems.innerHTML = '<div class="text-muted small">Todavía no agregaste productos.</div>';
    return;
  }

  cartItems.innerHTML = state.cart.map((item) => `
    <div class="cart-item">
      <div>
        <strong>${escapeHtml(item.name)}</strong>
        <div class="qty-controls">
          <button type="button" data-action="decrease" data-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button type="button" data-action="increase" data-id="${item.id}">+</button>
        </div>
      </div>
      <div class="text-end">
        <strong>${formatMoney(item.price * item.quantity)}</strong>
        <div>
          <button type="button" class="btn btn-link btn-sm p-0 text-danger" data-action="remove" data-id="${item.id}">Eliminar</button>
        </div>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.action;
      const id = Number(button.dataset.id);
      const item = state.cart.find((entry) => entry.id === id);
      if (!item) return;

      if (action === 'increase') item.quantity += 1;
      if (action === 'decrease') {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.cart = state.cart.filter((entry) => entry.id !== id);
        }
      }
      if (action === 'remove') {
        state.cart = state.cart.filter((entry) => entry.id !== id);
      }

      saveState();
      renderCart();
    });
  });
}

function renderOrderStatus(orderNumber) {
  const result = document.getElementById('statusResult');
  const order = state.orders.find((entry) => entry.number === Number(orderNumber));

  if (!order) {
    result.innerHTML = '<div class="alert alert-danger mt-3">Pedido no encontrado.</div>';
    return;
  }

  const currentIndex = STATUS_FLOW.indexOf(order.status);
  const timeline = STATUS_FLOW.map((status, index) => {
    const className = index < currentIndex ? 'status-step done' : index === currentIndex ? 'status-step active' : 'status-step';
    return `<span class="${className}">${status}</span>`;
  }).join('');

  result.innerHTML = `
    <div class="panel-card p-3">
      <h4 class="h6 mb-2">Pedido #${order.number}</h4>
      <p class="mb-2"><strong>Cliente:</strong> ${escapeHtml(order.client)}</p>
      <div class="status-stepper">${timeline}</div>
    </div>
  `;
}

function generateOrderNumber() {
  const next = state.nextOrderNumber;
  state.nextOrderNumber += 1;
  return next;
}

function checkoutOrder(event) {
  event.preventDefault();

  if (!state.cart.length) {
    document.getElementById('checkoutMessage').textContent = 'Debes agregar al menos un producto.';
    return;
  }

  const deliveryType = document.getElementById('deliveryType').value;
  const paymentMethod = document.getElementById('paymentMethod').value;
  const clientName = document.getElementById('clientName').value.trim();
  const clientPhone = document.getElementById('clientPhone').value.trim();
  const clientAddress = document.getElementById('clientAddress').value.trim();
  const clientZone = document.getElementById('clientZone').value.trim();
  const clientReference = document.getElementById('clientReference').value.trim();
  const orderNote = document.getElementById('orderNote').value.trim();

  if (deliveryType === 'domicilio' && (!clientName || !clientPhone || !clientAddress || !clientZone)) {
    document.getElementById('checkoutMessage').textContent = 'Completa nombre, teléfono, dirección y barrio para el envío.';
    return;
  }

  if (!clientName && deliveryType === 'retiro') {
    document.getElementById('checkoutMessage').textContent = 'Ingresá el nombre del cliente.';
    return;
  }

  const orderNumber = generateOrderNumber();
  const shipping = getCartShipping(deliveryType);
  const order = {
    number: orderNumber,
    client: clientName || 'Cliente local',
    phone: clientPhone || 'Sin datos',
    address: clientAddress || 'Retiro en local',
    zone: clientZone || 'Local',
    reference: clientReference || 'Sin referencia',
    tipo: deliveryType,
    payment: paymentMethod,
    status: 'NUEVO',
    note: orderNote,
    items: state.cart.map((item) => ({ ...item })),
    total: getCartSubtotal() + shipping
  };

  state.orders.unshift(order);
  state.cart = [];
  saveState();
  renderCart();
  document.getElementById('checkoutForm').reset();
  document.getElementById('checkoutMessage').className = 'text-success small fw-bold';
  document.getElementById('checkoutMessage').textContent = `Pedido realizado correctamente. Tu número de pedido es #${order.number}.`;
  renderStatusLookup(order.number);
}

function renderStatusLookup(value = '') {
  const statusInput = document.getElementById('statusInput');
  if (statusInput && value) statusInput.value = `PEDIDO #${value}`;
  if (value) renderOrderStatus(value);
}

function loginUser(username, password, role) {
  const user = state.users[role];
  return user && user.username === username && user.password === password ? true : false;
}

function renderEmployeePanel() {
  const panel = document.getElementById('employeePanel');
  const orders = state.orders;
  panel.classList.remove('d-none');
  panel.innerHTML = `
    <div class="card">
      <div class="card-body p-4">
        <h3 class="h5 mb-3">Pedidos pendientes</h3>
        <div class="row g-3">
          ${orders.length ? orders.map((order) => `
            <div class="col-lg-6">
              <div class="panel-card p-3">
                <div class="d-flex justify-content-between align-items-center">
                  <strong>PEDIDO #${order.number}</strong>
                  <span class="badge bg-warning text-dark">${order.status}</span>
                </div>
                <p class="mt-3 mb-1"><strong>Cliente:</strong> ${escapeHtml(order.client)}</p>
                <p class="mb-1"><strong>Tipo:</strong> ${order.tipo === 'domicilio' ? 'Delivery' : 'Retiro local'}</p>
                <p class="mb-1"><strong>Total:</strong> ${formatMoney(order.total)}</p>
                <p class="mb-2"><strong>Pago:</strong> ${escapeHtml(order.payment)}</p>
                <ul class="mb-3 small">
                  ${order.items.map((item) => `<li>${item.quantity} ${escapeHtml(item.name)}</li>`).join('')}
                </ul>
                <div class="d-flex gap-2 flex-wrap">
                  <select class="form-select form-select-sm status-select" data-order-number="${order.number}">
                    ${STATUS_FLOW.map((status) => `<option value="${status}" ${status === order.status ? 'selected' : ''}>${status}</option>`).join('')}
                  </select>
                  <button class="btn btn-sm btn-danger btn-cancel-order" data-order-number="${order.number}">Cancelar</button>
                </div>
              </div>
            </div>
          `).join('') : '<div class="col-12"><div class="alert alert-info mb-0">No hay pedidos para mostrar.</div></div>'}
        </div>
      </div>
    </div>
  `;

  document.querySelectorAll('.status-select').forEach((select) => {
    select.addEventListener('change', (event) => {
      const orderNumber = Number(event.target.dataset.orderNumber);
      const order = state.orders.find((entry) => entry.number === orderNumber);
      if (order) {
        order.status = event.target.value;
        saveState();
      }
      renderEmployeePanel();
    });
  });

  document.querySelectorAll('.btn-cancel-order').forEach((button) => {
    button.addEventListener('click', () => {
      const orderNumber = Number(button.dataset.orderNumber);
      const order = state.orders.find((entry) => entry.number === orderNumber);
      if (order) {
        order.status = 'CANCELADO';
        saveState();
      }
      renderEmployeePanel();
    });
  });
}

function renderDeliveryPanel() {
  const panel = document.getElementById('deliveryPanel');
  const deliveries = state.orders.filter((order) => order.tipo === 'domicilio' && ['NUEVO', 'CONFIRMADO', 'EN PREPARACIÓN', 'LISTO', 'EN CAMINO'].includes(order.status));
  panel.classList.remove('d-none');
  panel.innerHTML = `
    <div class="card">
      <div class="card-body p-4">
        <h3 class="h5 mb-3">Pedidos asignados</h3>
        <div class="row g-3">
          ${deliveries.length ? deliveries.map((order) => `
            <div class="col-lg-6">
              <div class="panel-card p-3">
                <div class="d-flex justify-content-between align-items-center">
                  <strong>PEDIDO #${order.number}</strong>
                  <span class="badge bg-info text-dark">${order.status}</span>
                </div>
                <p class="mt-3 mb-1"><strong>Cliente:</strong> ${escapeHtml(order.client)}</p>
                <p class="mb-1"><strong>Tel:</strong> ${escapeHtml(order.phone)}</p>
                <p class="mb-1"><strong>Dirección:</strong> ${escapeHtml(order.address)}</p>
                <p class="mb-1"><strong>Barrio:</strong> ${escapeHtml(order.zone)}</p>
                <p class="mb-2"><strong>Referencia:</strong> ${escapeHtml(order.reference)}</p>
                <p class="mb-3"><strong>Total:</strong> ${formatMoney(order.total)}</p>
                <select class="form-select form-select-sm delivery-status" data-order-number="${order.number}">
                  <option value="EN CAMINO" ${order.status === 'EN CAMINO' ? 'selected' : ''}>EN CAMINO</option>
                  <option value="ENTREGADO" ${order.status === 'ENTREGADO' ? 'selected' : ''}>ENTREGADO</option>
                </select>
              </div>
            </div>
          `).join('') : '<div class="col-12"><div class="alert alert-info mb-0">No tienes pedidos asignados.</div></div>'}
        </div>
      </div>
    </div>
  `;

  document.querySelectorAll('.delivery-status').forEach((select) => {
    select.addEventListener('change', (event) => {
      const orderNumber = Number(event.target.dataset.orderNumber);
      const order = state.orders.find((entry) => entry.number === orderNumber);
      if (order) {
        order.status = event.target.value;
        saveState();
      }
      renderDeliveryPanel();
    });
  });
}

function renderAdminPanel() {
  const panel = document.getElementById('adminPanel');
  const totalToday = state.orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
  const pendingOrders = state.orders.filter((order) => ['NUEVO', 'CONFIRMADO', 'EN PREPARACIÓN', 'LISTO'].includes(order.status)).length;
  const bestProduct = state.orders.reduce((acc, order) => {
    order.items.forEach((item) => {
      acc[item.name] = (acc[item.name] || 0) + item.quantity;
    });
    return acc;
  }, {});
  const mostSoldName = Object.entries(bestProduct).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Ninguno';

  panel.classList.remove('d-none');
  panel.innerHTML = `
    <div class="card">
      <div class="card-body p-4">
        <h3 class="h5 mb-4">Dashboard del administrador</h3>
        <div class="admin-grid mb-4">
          <div class="admin-metric"><small>Ventas de hoy</small><strong>${formatMoney(totalToday)}</strong></div>
          <div class="admin-metric"><small>Pedidos de hoy</small><strong>${state.orders.length}</strong></div>
          <div class="admin-metric"><small>Pedidos pendientes</small><strong>${pendingOrders}</strong></div>
          <div class="admin-metric"><small>Producto más vendido</small><strong>${escapeHtml(mostSoldName)}</strong></div>
        </div>

        <div class="row g-4 mb-4">
          <div class="col-lg-6">
            <div class="panel-card p-3">
              <h4 class="h6 mb-3">Ventas por día</h4>
              <div class="sales-bars">
                <span style="height:45%"></span>
                <span style="height:60%"></span>
                <span style="height:55%"></span>
                <span style="height:80%"></span>
                <span style="height:70%"></span>
                <span style="height:90%"></span>
                <span style="height:85%"></span>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="panel-card p-3">
              <h4 class="h6 mb-3">Productos</h4>
              <ul class="list-group list-group-flush">
                ${state.products.map((product) => `
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span>${escapeHtml(product.name)}</span>
                    <span class="badge ${product.available !== false ? 'bg-success' : 'bg-secondary'}">${product.available !== false ? 'Activo' : 'Inactivo'}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>
        </div>

        <div class="panel-card p-3">
          <h4 class="h6 mb-3">Gestión de productos</h4>
          <form id="adminProductForm" class="row g-2 mb-3">
            <div class="col-md-3"><input type="text" class="form-control" id="newProductName" placeholder="Nombre" required></div>
            <div class="col-md-2"><select class="form-select" id="newProductCategory">
              ${state.categories.map((category) => `<option value="${category}">${category}</option>`).join('')}
            </select></div>
            <div class="col-md-2"><input type="number" class="form-control" id="newProductPrice" placeholder="Precio" min="1" required></div>
            <div class="col-md-2"><input type="number" class="form-control" id="newProductStock" placeholder="Stock" min="0" required></div>
            <div class="col-md-3"><button type="submit" class="btn btn-primary w-100">Agregar producto</button></div>
          </form>

          <div class="table-responsive">
            <table class="table table-sm align-middle">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Activo</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                ${state.products.map((product) => `
                  <tr>
                    <td><input type="text" class="form-control form-control-sm" data-field="name" data-id="${product.id}" value="${escapeHtml(product.name)}"></td>
                    <td>
                      <select class="form-select form-select-sm" data-field="category" data-id="${product.id}">
                        ${state.categories.map((category) => `<option value="${category}" ${category === product.category ? 'selected' : ''}>${category}</option>`).join('')}
                      </select>
                    </td>
                    <td><input type="number" class="form-control form-control-sm" data-field="price" data-id="${product.id}" value="${product.price}"></td>
                    <td><input type="number" class="form-control form-control-sm" data-field="stock" data-id="${product.id}" value="${product.stock}"></td>
                    <td><input type="checkbox" data-field="available" data-id="${product.id}" ${product.available !== false ? 'checked' : ''}></td>
                    <td>
                      <button class="btn btn-sm btn-success save-product-btn" data-id="${product.id}">Guardar</button>
                      <button class="btn btn-sm btn-outline-danger delete-product-btn" data-id="${product.id}">Eliminar</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('adminProductForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('newProductName').value.trim();
    const category = document.getElementById('newProductCategory').value;
    const price = Number(document.getElementById('newProductPrice').value);
    const stock = Number(document.getElementById('newProductStock').value);

    if (!name || !category || !price || Number.isNaN(price) || Number.isNaN(stock)) {
      return;
    }

    state.products.push({
      id: Date.now(),
      name,
      category,
      price,
      description: 'Producto agregado por el administrador.',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80',
      available: true,
      stock
    });

    saveState();
    renderProducts();
    renderAdminPanel();
    event.target.reset();
  });

  document.querySelectorAll('.save-product-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const id = Number(button.dataset.id);
      const product = state.products.find((item) => item.id === id);
      if (!product) return;

      const nameInput = document.querySelector(`[data-field="name"][data-id="${id}"]`);
      const categoryInput = document.querySelector(`[data-field="category"][data-id="${id}"]`);
      const priceInput = document.querySelector(`[data-field="price"][data-id="${id}"]`);
      const stockInput = document.querySelector(`[data-field="stock"][data-id="${id}"]`);
      const availableInput = document.querySelector(`[data-field="available"][data-id="${id}"]`);

      product.name = nameInput.value.trim() || product.name;
      product.category = categoryInput.value || product.category;
      product.price = Number(priceInput.value) || product.price;
      product.stock = Number(stockInput.value) || product.stock;
      product.available = availableInput.checked;

      saveState();
      renderProducts();
      renderAdminPanel();
    });
  });

  document.querySelectorAll('.delete-product-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const id = Number(button.dataset.id);
      state.products = state.products.filter((product) => product.id !== id);
      saveState();
      renderProducts();
      renderAdminPanel();
    });
  });
}

function bindButtons() {
  document.getElementById('btnNuevoPedido').addEventListener('click', () => {
    document.getElementById('cliente').scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('productFilters').addEventListener('click', (event) => {
    const button = event.target.closest('.filter-btn');
    if (!button) return;
    state.activeFilter = button.dataset.filter;
    document.querySelectorAll('.filter-btn').forEach((element) => {
      element.classList.toggle('active', element === button);
      element.classList.toggle('btn-primary', element === button);
      element.classList.toggle('btn-outline-secondary', element !== button);
    });
    renderProducts();
  });

  document.getElementById('checkoutForm').addEventListener('submit', checkoutOrder);
  document.getElementById('deliveryType').addEventListener('change', renderCart);
  document.getElementById('btnCheckStatus').addEventListener('click', () => renderOrderStatus(document.getElementById('statusInput').value.replace(/[^0-9]/g, '')));
  document.getElementById('btnEmployeeLogin').addEventListener('click', () => {
    const user = document.getElementById('employeeUser').value.trim();
    const pass = document.getElementById('employeePass').value.trim();
    if (loginUser(user, pass, 'empleado')) {
      renderEmployeePanel();
    } else {
      document.getElementById('employeePanel').classList.remove('d-none');
      document.getElementById('employeePanel').innerHTML = '<div class="alert alert-danger">Credenciales incorrectas.</div>';
    }
  });

  document.getElementById('btnDeliveryLogin').addEventListener('click', () => {
    const user = document.getElementById('deliveryUser').value.trim();
    const pass = document.getElementById('deliveryPass').value.trim();
    if (loginUser(user, pass, 'repartidor')) {
      renderDeliveryPanel();
    } else {
      document.getElementById('deliveryPanel').classList.remove('d-none');
      document.getElementById('deliveryPanel').innerHTML = '<div class="alert alert-danger">Credenciales incorrectas.</div>';
    }
  });

  document.getElementById('btnAdminLogin').addEventListener('click', () => {
    const user = document.getElementById('adminUser').value.trim();
    const pass = document.getElementById('adminPass').value.trim();
    if (loginUser(user, pass, 'admin')) {
      renderAdminPanel();
    } else {
      document.getElementById('adminPanel').classList.remove('d-none');
      document.getElementById('adminPanel').innerHTML = '<div class="alert alert-danger">Credenciales incorrectas.</div>';
    }
  });
}

function init() {
  renderProducts();
  renderCart();
  bindButtons();
}

init();
