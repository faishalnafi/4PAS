// js/script.js

// File ini disiapkan untuk interaktivitas di masa depan.
// Misalnya:
// - Logika untuk menambahkan item ke wishlist
// - Memuat lebih banyak produk saat scroll (infinite scroll)
// - Fungsi filter atau pencarian produk

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM telah dimuat sepenuhnya. Website siap.');
  
  // Contoh inisialisasi manual komponen Bootstrap (jika diperlukan)
  // const carouselElement = document.querySelector('#heroCarousel');
  // if (carouselElement) {
  //   const carousel = new bootstrap.Carousel(carouselElement, {
  //     interval: 5000,
  //     wrap: true
  //   });
  // }
});

// js/script.js

document.addEventListener('DOMContentLoaded', () => {
  // Jalankan skrip HANYA jika kita berada di halaman chat.
  // Ini mencegah error di halaman lain (index, wishlist, dll).
  const chatContainer = document.getElementById('chat-app-container');
  if (chatContainer) {
    setupChatPage();
  }
});

function setupChatPage() {
  // DATA DUMMY UNTUK CHAT
  const chatListData = [
    {
      id: 1,
      storeName: 'Gramedia Official',
      avatar: 'source/img/avatar2.jpg',
      lastMessage: 'Ready kak, dijamin ori 100% dari...',
      timestamp: '15:34',
      isActive: true,
    },
    {
      id: 2,
      storeName: 'BookstoreID',
      avatar: 'source/img/avatar1.jpg',
      lastMessage: 'Baik, terima kasih sudah memesan.',
      timestamp: 'Kemarin',
      isActive: false,
    },
    {
      id: 3,
      storeName: 'Pustaka Ilmu',
      avatar: 'source/img/avatar.jpg',
      lastMessage: 'Iya kak, untuk edisi hardcover...',
      timestamp: '21 Jul',
      isActive: false,
    },
  ];

  const activeConversationData = {
    storeName: 'Gramedia Official',
    avatar: 'source/img/AvatarHero.jpg',
    messages: [
      {
        type: 'product',
        sender: 'seller',
        product: {
          image: 'source/img/buku_2.jpg',
          title: 'Atomic Habits: Perubahan Kecil yang Memberikan Hasil Luar Biasa',
          price: 'Rp108.000',
          originalPrice: 'Rp125.000',
        },
      },
      {
        type: 'text',
        sender: 'customer',
        content: 'Halo kak, buku Atomic Habits ini ready? Ori kan?',
        timestamp: '15:26',
      },
      {
        type: 'text',
        sender: 'seller',
        content: 'Halo kak, ready stock. Dijamin 100% original dari penerbit langsung kak.',
        timestamp: '15:27',
      },
       {
        type: 'text',
        sender: 'customer',
        content: 'Oke sip, ada promo gratis ongkir?',
        timestamp: '15:28',
      },
      {
        type: 'text',
        sender: 'seller',
        content: 'Ada kak, setiap pembelian di atas Rp50.000 otomatis dapat gratis ongkir. Silakan diorder kak. 😊',
        timestamp: '15:34',
      },
    ],
  };

  // FUNGSI UNTUK MENAMPILKAN KONTEN
  displayChatList(chatListData);
  displayChatWindow(activeConversationData);
}

function displayChatList(chats) {
  const chatListContainer = document.getElementById('chat-list-container');
  if (!chatListContainer) return;

  chatListContainer.innerHTML = chats.map(chat => `
    <a href="#" class="list-group-item list-group-item-action ${chat.isActive ? 'active' : ''}">
      <div class="d-flex w-100 align-items-center">
        <img src="${chat.avatar}" class="chat-list-img me-3" alt="${chat.storeName}">
        <div class="flex-grow-1 overflow-hidden">
          <div class="d-flex justify-content-between">
            <p class="mb-1">${chat.storeName}</p>
            <small class="${chat.isActive ? '' : 'text-muted'}">${chat.timestamp}</small>
          </div>
          <p class="mb-0 chat-list-preview">${chat.lastMessage}</p>
        </div>
      </div>
    </a>
  `).join('');
}

function displayChatWindow(conversation) {
  const chatHeaderContainer = document.getElementById('chat-header-container');
  const chatBodyContainer = document.getElementById('chat-body-container');
  if (!chatHeaderContainer || !chatBodyContainer) return;

  // Render Header
  chatHeaderContainer.innerHTML = `
    <div class="d-flex align-items-center">
        <img src="${conversation.avatar}" class="chat-list-img me-2" alt="${conversation.storeName}">
        <div>
            <h6 class="mb-0">${conversation.storeName} <span class="badge bg-success small">Penjual</span></h6>
            <small class="text-muted">Online</small>
        </div>
    </div>
    <button class="btn btn-light"><i class="fa-solid fa-ellipsis-vertical"></i></button>
  `;

  // Render Body (Messages)
  chatBodyContainer.innerHTML = `
    <div class="text-center my-3"><span class="badge bg-light text-dark">Hari Ini</span></div>
    ${conversation.messages.map(msg => {
      if (msg.type === 'product') {
        return `
          <div class="d-flex justify-content-start chat-bubble-wrapper">
            <div class="card chat-product-card">
                <div class="row g-0">
                    <div class="col-4">
                        <img src="${msg.product.image}" class="img-fluid rounded-start h-100 object-fit-cover" alt="Produk" onerror="this.onerror=null;this.src='source/img/avatar.jpg';">
                    </div>
                    <div class="col-8">
                        <div class="card-body p-2">
                            <p class="card-text small mb-1">${msg.product.title}</p>
                            <p class="card-title fw-bold text-primary mb-1">${msg.product.price}</p>
                            <s class="text-muted small">${msg.product.originalPrice}</s>
                            <div class="d-flex gap-2 mt-2">
                                <button class="btn btn-sm btn-outline-primary flex-grow-1">Keranjang</button>
                                <button class="btn btn-sm btn-success flex-grow-1">Beli</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        `;
      }
      
      if (msg.type === 'text') {
        if (msg.sender === 'customer') {
          return `
            <div class="d-flex justify-content-end chat-bubble-wrapper">
              <div class="text-end">
                  <div class="chat-bubble chat-bubble-sent">
                      ${msg.content}
                  </div>
                  <span class="chat-timestamp">${msg.timestamp}</span>
              </div>
            </div>
          `;
        } else { // sender === 'seller'
          return `
            <div class="d-flex justify-content-start chat-bubble-wrapper">
              <div>
                  <div class="chat-bubble chat-bubble-received">
                      ${msg.content}
                  </div>
                  <span class="chat-timestamp">${msg.timestamp}</span>
              </div>
            </div>
          `;
        }
      }
      return '';
    }).join('')}
  `;
}

// js/script.js (Tambahkan di bagian bawah)

// Fungsi ini akan berjalan setelah seluruh halaman dimuat
document.addEventListener('DOMContentLoaded', () => {

  // Cek apakah kita berada di halaman chat, jika iya jalankan setup-nya
  const chatContainer = document.getElementById('chat-app-container');
  if (chatContainer) {
    setupChatPage();
  }

  // Cek apakah kita di halaman detail, jika iya aktifkan tombol kuantitas
  const quantityInput = document.getElementById('quantityInput');
  const btnMinus = document.getElementById('btnMinus');
  const btnPlus = document.getElementById('btnPlus');

  if (quantityInput && btnMinus && btnPlus) {
    btnMinus.addEventListener('click', () => {
      let currentValue = parseInt(quantityInput.value, 10);
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });

    btnPlus.addEventListener('click', () => {
      let currentValue = parseInt(quantityInput.value, 10);
      // Ganti 374 dengan stok maksimum jika perlu
      if (currentValue < 374) {
        quantityInput.value = currentValue + 1;
      }
    });
  }
});


// Note: Fungsi setupChatPage() dari tugas sebelumnya tetap ada di atas kode ini
// ... (kode setupChatPage dari sebelumnya)
function setupChatPage() {
  // DATA DUMMY UNTUK CHAT
  const chatListData = [
    {
      id: 1,
      storeName: 'Gramedia Official',
      avatar: 'source/img/avatar.jpg',
      lastMessage: 'Ready kak, dijamin ori 100% dari...',
      timestamp: '15:34',
      isActive: true,
    },
    {
      id: 2,
      storeName: 'BookstoreID',
      avatar: 'source/img/avatar1.jpg',
      lastMessage: 'Baik, terima kasih sudah memesan.',
      timestamp: 'Kemarin',
      isActive: false,
    },
    {
      id: 3,
      storeName: 'Pustaka Ilmu',
      avatar: 'source/img/avatar2.jpg',
      lastMessage: 'Iya kak, untuk edisi hardcover...',
      timestamp: '21 Jul',
      isActive: false,
    },
  ];

  const activeConversationData = {
    storeName: 'Gramedia Official',
    avatar: 'source/img/AvatarHero.jpg',
    messages: [
      {
        type: 'product',
        sender: 'seller',
        product: {
          image: 'source/img/buku_2.jpg',
          title: 'Atomic Habits: Perubahan Kecil yang Memberikan Hasil Luar Biasa',
          price: 'Rp108.000',
          originalPrice: 'Rp125.000',
        },
      },
      {
        type: 'text',
        sender: 'customer',
        content: 'Halo kak, buku Atomic Habits ini ready? Ori kan?',
        timestamp: '15:26',
      },
      {
        type: 'text',
        sender: 'seller',
        content: 'Halo kak, ready stock. Dijamin 100% original dari penerbit langsung kak.',
        timestamp: '15:27',
      },
       {
        type: 'text',
        sender: 'customer',
        content: 'Oke sip, ada promo gratis ongkir?',
        timestamp: '15:28',
      },
      {
        type: 'text',
        sender: 'seller',
        content: 'Ada kak, setiap pembelian di atas Rp50.000 otomatis dapat gratis ongkir. Silakan diorder kak. 😊',
        timestamp: '15:34',
      },
    ],
  };

  // FUNGSI UNTUK MENAMPILKAN KONTEN
  displayChatList(chatListData);
  displayChatWindow(activeConversationData);
}

function displayChatList(chats) {
  const chatListContainer = document.getElementById('chat-list-container');
  if (!chatListContainer) return;

  chatListContainer.innerHTML = chats.map(chat => `
    <a href="#" class="list-group-item list-group-item-action ${chat.isActive ? 'active' : ''}">
      <div class="d-flex w-100 align-items-center">
        <img src="${chat.avatar}" class="chat-list-img me-3" alt="${chat.storeName}">
        <div class="flex-grow-1 overflow-hidden">
          <div class="d-flex justify-content-between">
            <p class="mb-1">${chat.storeName}</p>
            <small class="${chat.isActive ? '' : 'text-muted'}">${chat.timestamp}</small>
          </div>
          <p class="mb-0 chat-list-preview">${chat.lastMessage}</p>
        </div>
      </div>
    </a>
  `).join('');
}

function displayChatWindow(conversation) {
  const chatHeaderContainer = document.getElementById('chat-header-container');
  const chatBodyContainer = document.getElementById('chat-body-container');
  if (!chatHeaderContainer || !chatBodyContainer) return;

  // Render Header
  chatHeaderContainer.innerHTML = `
    <div class="d-flex align-items-center">
        <img src="${conversation.avatar}" class="chat-list-img me-2" alt="${conversation.storeName}">
        <div>
            <h6 class="mb-0">${conversation.storeName} <span class="badge bg-success small">Penjual</span></h6>
            <small class="text-muted">Online</small>
        </div>
    </div>
    <button class="btn btn-light"><i class="fa-solid fa-ellipsis-vertical"></i></button>
  `;

  // Render Body (Messages)
  chatBodyContainer.innerHTML = `
    <div class="text-center my-3"><span class="badge bg-light text-dark">Hari Ini</span></div>
    ${conversation.messages.map(msg => {
      if (msg.type === 'product') {
        return `
          <div class="d-flex justify-content-start chat-bubble-wrapper">
            <div class="card chat-product-card">
                <div class="row g-0">
                    <div class="col-4">
                        <img src="${msg.product.image}" class="img-fluid rounded-start h-100 object-fit-cover" alt="Produk" onerror="this.onerror=null;this.src='source/img/avatar.jpg';">
                    </div>
                    <div class="col-8">
                        <div class="card-body p-2">
                            <p class="card-text small mb-1">${msg.product.title}</p>
                            <p class="card-title fw-bold text-primary mb-1">${msg.product.price}</p>
                            <s class="text-muted small">${msg.product.originalPrice}</s>
                            <div class="d-flex gap-2 mt-2">
                                <button class="btn btn-sm btn-outline-primary flex-grow-1">Keranjang</button>
                                <button class="btn btn-sm btn-success flex-grow-1">Beli</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        `;
      }
      
      if (msg.type === 'text') {
        if (msg.sender === 'customer') {
          return `
            <div class="d-flex justify-content-end chat-bubble-wrapper">
              <div class="text-end">
                  <div class="chat-bubble chat-bubble-sent">
                      ${msg.content}
                  </div>
                  <span class="chat-timestamp">${msg.timestamp}</span>
              </div>
            </div>
          `;
        } else { // sender === 'seller'
          return `
            <div class="d-flex justify-content-start chat-bubble-wrapper">
              <div>
                  <div class="chat-bubble chat-bubble-received">
                      ${msg.content}
                  </div>
                  <span class="chat-timestamp">${msg.timestamp}</span>
              </div>
            </div>
          `;
        }
      }
      return '';
    }).join('')}
  `;
}