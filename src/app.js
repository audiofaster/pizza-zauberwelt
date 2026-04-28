const toppingsEl = document.getElementById('toppings');
const pizzaPreview = document.getElementById('pizzaPreview');
const priceEl = document.getElementById('price');
const orderBtn = document.getElementById('orderBtn');
const toast = document.getElementById('toast');

let selected = new Set();
let size = 'mittel';
const prices = { mittel: 8.9, groß: 11.9, familie: 15.9 };
const toppingPrice = 0.8;

const positions = [
  {x:30,y:35},{x:70,y:25},{x:50,y:60},{x:25,y:70},
  {x:75,y:65},{x:45,y:30},{x:60,y:80},{x:35,y:50}
];

toppingsEl.addEventListener('click', e => {
  if (e.target.tagName !== 'BUTTON') return;
  const topping = e.target.dataset.topping;
  e.target.classList.toggle('active');
  
  if (selected.has(topping)) {
    selected.delete(topping);
    document.querySelectorAll(`.topping[data-type="${topping}"]`).forEach(el => el.remove());
  } else {
    selected.add(topping);
    addToppingVisual(topping);
  }
  updatePrice();
});

function addToppingVisual(type) {
  const emoji = {salami:'🍖',pilze:'🍄',paprika:'🫑',zwiebel:'🧅',oliven:'🫒',mais:'🌽',ananas:'🍍',chili:'🌶️'};
  positions.slice(0,5).forEach((pos,i) => {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'topping';
      el.dataset.type = type;
      el.textContent = emoji[type];
      el.style.left = pos.x + '%';
      el.style.top = pos.y + '%';
      el.style.transform = 'translate(-50%,-50%)';
      pizzaPreview.appendChild(el);
    }, i*80);
  });
  document.querySelector('.pizza-base').style.transform = 'scale(1.05)';
  setTimeout(()=> document.querySelector('.pizza-base').style.transform = 'scale(1)', 200);
}

document.querySelectorAll('.size-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.size-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    size = btn.dataset.size;
    updatePrice();
  });
});

function updatePrice() {
  const total = prices[size] + selected.size * toppingPrice;
  priceEl.textContent = total.toFixed(2).replace('.',',') + ' €';
}

orderBtn.addEventListener('click', () => {
  if (selected.size === 0) {
    showToast('Wähle mindestens eine Zutat! 🍕');
    return;
  }
  orderBtn.textContent = '✨ Wird gezaubert...';
  orderBtn.disabled = true;
  
  setTimeout(() => {
    showToast(`Deine ${size}e Pizza ist unterwegs! 🚀`);
    orderBtn.textContent = '✨ Pizza zaubern!';
    orderBtn.disabled = false;
    
    // Magischer Effekt
    pizzaPreview.style.animation = 'spin 1s ease';
    setTimeout(()=> pizzaPreview.style.animation = '', 1000);
  }, 1500);
});

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(()=> toast.classList.remove('show'), 3000);
}

// Add spin animation
const style = document.createElement('style');
style.textContent = '@keyframes spin { from{transform:rotate(0)} to{transform:rotate(360deg)} }';
document.head.appendChild(style);
