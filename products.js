const PRODUCTS = [
  { id: 1, name: "Dino Party Digital Planner", price: 99, type: "digital", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400" },
  { id: 2, name: "Unicorn Toothpick Flags (20pcs)", price: 68, type: "physical", img: "https://images.unsplash.com/photo-1571115764598-8a7f9e2c21d8?w=400" },
  { id: 3, name: "Paw-ty Starter Bundle", price: 199, type: "bundle", img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400" }
];

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('products');
  PRODUCTS.forEach(p => {
    container.innerHTML += `
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
        <img src="${p.img}" alt="${p.name}" class="w-full h-48 object-cover"/>
        <div class="p-6">
          <h3 class="font-bold text-lg mb-2">${p.name}</h3>
          <p class="text-pink-600 font-bold text-2xl">HK$${p.price}</p>
          <button data-id="${p.id}" class="add-to-cart w-full mt-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-xl font-bold">
            Add to Cart
          </button>
        </div>
      </div>`;
  });
});