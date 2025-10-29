let cart = [];

function renderCart() {
  const itemsDiv = document.getElementById('cartItems');
  const totalSpan = document.getElementById('cartTotal');
  const countSpan = document.getElementById('cartCount');
  const payAmount = document.getElementById('payAmount');

  if (cart.length === 0) {
    itemsDiv.innerHTML = '<p class="text-center text-gray-500 py-8">Cart is empty</p>';
    totalSpan.textContent = 'HK$0';
    countSpan.textContent = '0';
    if (payAmount) payAmount.textContent = 'HK$0';
    return;
  }

  let html = '';
  let total = 0;
  cart.forEach(item => {
    const lineTotal = item.price * item.qty;
    total += lineTotal;
    html += `
      <div class="bg-gray-50 rounded-xl p-4">
        <div class="flex justify-between mb-2">
          <p class="font-semibold">${item.name}</p>
          <p class="font-bold text-pink-600">HK$${lineTotal}</p>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center bg-white rounded-lg">
            <button data-id="${item.id}" class="decrement px-3 py-1">-</button>
            <span class="px-4 font-mono">${item.qty}</span>
            <button data-id="${item.id}" class="increment px-3 py-1">+</button>
          </div>
          <button data-id="${item.id}" class="remove-item text-red-500 text-sm">Remove</button>
        </div>
      </div>`;
  });

  itemsDiv.innerHTML = html;
  totalSpan.textContent = `HK$${total}`;
  countSpan.textContent = cart.reduce((s, i) => s + i.qty, 0);
  if (payAmount) payAmount.textContent = `HK$${total}`;
}

document.addEventListener('click', e => {
  const id = parseInt(e.target.dataset.id);
  if (!id) return;

  if (e.target.classList.contains('add-to-cart')) {
    const p = PRODUCTS.find(x => x.id === id);
    const existing = cart.find(x => x.id === id);
    if (existing) existing.qty++;
    else cart.push({ ...p, qty: 1 });
    renderCart();
  }
  if (e.target.classList.contains('increment')) {
    cart.find(x => x.id === id).qty++;
    renderCart();
  }
  if (e.target.classList.contains('decrement')) {
    const item = cart.find(x => x.id === id);
    if (item.qty > 1) item.qty--;
    else cart = cart.filter(x => x.id !== id);
    renderCart();
  }
  if (e.target.classList.contains('remove-item')) {
    cart = cart.filter(x => x.id !== id);
    renderCart();
  }
});

document.getElementById('cartBtn').onclick = () => {
  document.getElementById('cartModal').classList.remove('hidden');
  renderCart();
};
document.getElementById('closeCart').onclick = () => document.getElementById('cartModal').classList.add('hidden');
document.getElementById('checkoutBtn').onclick = () => {
  document.getElementById('cartModal').classList.add('hidden');
  document.getElementById('checkoutForm').classList.remove('hidden');
  renderCart();
};