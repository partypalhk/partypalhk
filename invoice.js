const { jsPDF } = window.jspdf;

document.getElementById('orderForm').onsubmit = e => {
  e.preventDefault();

  const form = e.target;
  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const email = form.email.value.trim();
  const address = form.address.value.trim();

  if (cart.length === 0) return alert('Cart is empty!');

  // === UPDATE THESE LATER ===
  const SHOP_NAME = document.getElementById('headerTitle').textContent;
  const WHATSAPP_NUMBER = "85291234567";  // ← CHANGE ME
  const PAYME_QR_URL = document.getElementById('paymeQR').src;
  // =========================

  const doc = new jsPDF();
  let y = 20;
  const now = new Date().toLocaleString('en-HK');

  doc.setFontSize(20);
  doc.text(`${SHOP_NAME} - Invoice`, 105, y, { align: 'center' });
  y += 15;

  doc.setFontSize(12);
  doc.text(`Date: ${now}`, 20, y); y += 8;
  doc.text(`Customer: ${name}`, 20, y); y += 8;
  if (email) { doc.text(`Email: ${email}`, 20, y); y += 8; }
  doc.text(`Phone: ${phone}`, 20, y); y += 12;

  let total = 0;
  cart.forEach(item => {
    const lineTotal = item.price * item.qty;
    total += lineTotal;
    doc.text(`${item.name} × ${item.qty} @ HK$${item.price}`, 20, y);
    doc.text(`HK$${lineTotal}`, 170, y);
    y += 7;
  });

  doc.setFontSize(14);
  doc.text(`TOTAL: HK$${total}`, 170, y); y += 20;

  doc.addImage(PAYME_QR_URL, 'PNG', 20, y, 50, 50);
  doc.text('Scan to pay', 80, y + 30);

  const pdfBlob = doc.output('blob');
  const url = URL.createObjectURL(pdfBlob);

  const waText = encodeURIComponent(
    `*New Order - ${SHOP_NAME}*\nCustomer: ${name}\nPhone: ${phone}\nTotal: HK$${total}\nAddress: ${address}\n\nPlease reply with payment screenshot!`
  );
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`, '_blank');

  const a = document.createElement('a');
  a.href = url;
  a.download = `Invoice_${Date.now()}.pdf`;
  a.click();

  alert('Invoice sent! Check WhatsApp.');
  cart = []; renderCart(); form.reset();
  document.getElementById('checkoutForm').classList.add('hidden');
};