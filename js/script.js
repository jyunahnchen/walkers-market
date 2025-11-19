// -------------------- 全域狀態 --------------------
let currentPage = 'idle';
let pageStack = [];
let idleTimer;
let warningTimer;
let currentLanguage = 'zh';

// -------------------- 改進的地圖互動 --------------------
function enhancedMapInteraction() {
  const satellites = document.querySelectorAll('.satellite-point');
  
  satellites.forEach(point => {
    point.addEventListener('mouseenter', () => {
      // 暫停旋轉動畫
      const orbit = point.closest('.map-container');
      if (orbit) {
        orbit.style.animationPlayState = 'paused';
      }
    });
    
    point.addEventListener('mouseleave', () => {
      const orbit = point.closest('.map-container');
      if (orbit) {
        orbit.style.animationPlayState = 'running';
      }
    });
  });
}

// -------------------- 語言切換 --------------------
function switchLanguage(lang) {
  currentLanguage = lang;
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.header-btn').forEach(btn => btn.classList.remove('active'));
  if (event && event.target) event.target.classList.add('active');
  console.log(`Language switched to: ${lang}`);
}

// -------------------- 頁面導覽 --------------------
function enterMainScreen() {
  document.getElementById('idleHome').classList.add('hidden');
  setTimeout(() => {
    document.getElementById('mainScreen').classList.add('active');
    currentPage = 'main';
    resetIdleTimer();
  }, 800);
}

function showContent(contentId) {
  hideAllContent();
  const pageEl = document.getElementById(contentId + 'Content');
  if (pageEl) {
    pageEl.classList.add('active');
    if (contentId === 'about') {
      resetAboutSection();
    }
  }
  pageStack.push(currentPage);
  currentPage = contentId;
  document.getElementById('backBtn').style.display = 'block';
  resetIdleTimer();
}

function showLocation(locationId) {
  hideAllContent();
  document.getElementById('locationContent').classList.add('active');
  updateLocationContent(locationId);
  pageStack.push(currentPage);
  currentPage = 'location';
  document.getElementById('backBtn').style.display = 'block';
  resetIdleTimer();
}

function updateLocationContent(locationId) {
  const locations = {
    main: {
      title: '🏛️ 旅人市集培育站',
      subtitle: '創生平台的核心基地',
      intro: '旅人市集培育站是整個創生網絡的核心，提供創業輔導、資源媒合、活動舉辦等多元服務...',
      services: '創業輔導、空間租借、活動策劃、網絡媒合等服務...',
      nearby: '鄰近傳統市場、文化中心、青年活動中心等...',
      contact: '地址：xxx | 電話：xxx | FB：xxx'
    },
    shuilin: {
      title: '🌊 水林・雲林海青據點',
      subtitle: '海線文化的創新基地',
      intro: '位於雲林海線的水林據點，結合海洋文化與農業傳統，發展獨特的地方特色...',
      services: '有機農產品、海鮮加工、文化導覽等...',
      nearby: '水林海岸、傳統漁港、農田體驗區...',
      contact: '地址：雲林縣水林鄉xxx | 電話：xxx'
    },
    dalin: {
      title: '🏔️ 大林・雪香亭據點',
      subtitle: '山林茶香的文化空間',
      intro: '大林雪香亭據點專注於茶文化推廣，結合山林資源與傳統製茶工藝...',
      services: '茶葉販售、茶藝體驗、登山導覽等...',
      nearby: '阿里山茶園、竹林步道、文化古蹟...',
      contact: '地址：嘉義縣大林鎮xxx | 電話：xxx'
    },
    liujiao: {
      title: '☕ 六腳・鉛花咖啡據點',
      subtitle: '咖啡文化的創意聚落',
      intro: '六腳鉛花咖啡據點以咖啡為媒介，創造社區交流平台，推廣在地文化...',
      services: '精品咖啡、烘焙體驗、社區活動等...',
      nearby: '六腳老街、傳統建築、文創小店...',
      contact: '地址：嘉義縣六腳鄉xxx | 電話：xxx'
    },
    kouhu: {
      title: '🐲 口湖・成龍捌貳據點',
      subtitle: '漁村文化的藝術空間',
      intro: '口湖成龍捌貳據點致力於保存漁村文化，結合藝術創作與社區營造...',
      services: '藝術工作坊、文化導覽、海鮮料理等...',
      nearby: '成龍溼地、口湖漁港、藝術村落...',
      contact: '地址：雲林縣口湖鄉xxx | 電話：xxx'
    }
  };

  const location = locations[locationId];
  if (location) {
    document.getElementById('locationTitle').textContent = location.title;
    document.getElementById('locationSubtitle').textContent = location.subtitle;
    document.getElementById('locationIntro').textContent = location.intro;
    document.getElementById('locationServices').textContent = location.services;
    document.getElementById('locationNearby').textContent = location.nearby;
    document.getElementById('locationContact').textContent = location.contact;
  }
}

function hideAllContent() {
  document.querySelectorAll('.content-page').forEach(page => page.classList.remove('active'));
  if (currentPage !== 'map') {
    const menu = document.getElementById('mainMenu');
    if (menu) menu.style.display = 'none';
  }
}

function resetAboutSection() {
  const grid = document.getElementById('aboutCardGrid');
  const detail = document.getElementById('aboutDetail');
  const titleEl = document.getElementById('aboutDetailTitle');
  const bodyEl = document.getElementById('aboutDetailBody');
  if (grid) grid.classList.remove('is-hidden');
  if (detail) detail.classList.remove('active');
  if (titleEl) titleEl.textContent = '';
  if (bodyEl) bodyEl.innerHTML = '';
}

function showAboutDetail(key) {
  const grid = document.getElementById('aboutCardGrid');
  const detail = document.getElementById('aboutDetail');
  const titleEl = document.getElementById('aboutDetailTitle');
  const bodyEl = document.getElementById('aboutDetailBody');
  const template = document.querySelector(`.about-detail-template[data-key="${key}"]`);
  if (!grid || !detail || !titleEl || !bodyEl || !template) return;
  grid.classList.add('is-hidden');
  detail.classList.add('active');
  titleEl.textContent = template.dataset.title || '';
  bodyEl.innerHTML = template.innerHTML;
  resetIdleTimer();
}

function closeAboutDetail() {
  resetAboutSection();
  resetIdleTimer();
}

function goBack() {
  if (currentPage === 'about') {
    const aboutDetail = document.getElementById('aboutDetail');
    if (aboutDetail && aboutDetail.classList.contains('active')) {
      closeAboutDetail();
      return;
    }
  }
  if (pageStack.length > 0) {
    const previousPage = pageStack.pop();
    hideAllContent();
    if (previousPage === 'main') {
      document.getElementById('backBtn').style.display = 'none';
    } else {
      const prevEl = document.getElementById(previousPage + 'Content');
      if (prevEl) prevEl.classList.add('active');
    }
    currentPage = previousPage;
    if (pageStack.length === 0) {
      document.getElementById('backBtn').style.display = 'none';
    }
    resetIdleTimer();
  }
}

function goHome() {
  hideAllContent();
  document.getElementById('backBtn').style.display = 'none';
  pageStack = [];
  currentPage = 'main';
  resetIdleTimer();
}

// -------------------- 閒置控制 --------------------
function resetIdleTimer() {
  clearTimeout(idleTimer);
  clearTimeout(warningTimer);
  document.getElementById('idleWarning').classList.remove('show');
  // 10分鐘 = 600,000ms。警告訊息在 10 分鐘前的 10 秒（590,000ms）跳出
  warningTimer = setTimeout(() => {
    document.getElementById('idleWarning').classList.add('show');
  }, 590000); 
  idleTimer = setTimeout(() => {
    document.getElementById('idleWarning').classList.remove('show');
    returnToIdle();
  }, 600000); 
}

function returnToIdle() {
  document.getElementById('mainScreen').classList.remove('active');
  document.getElementById('idleHome').classList.remove('hidden');
  hideAllContent();
  document.getElementById('backBtn').style.display = 'none';
  pageStack = [];
  currentPage = 'idle';
}

// -------------------- Google Calendar（保持原樣） --------------------
async function loadEvents(calendarId, category) {
  const eventsListDiv = document.getElementById('events-list');
  eventsListDiv.innerHTML = '<div class="loading-spinner">正在載入活動</div>';
  try {
    const response = await fetch(`/.netlify/functions/getCalendarEvents?calendarId=${calendarId}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    eventsListDiv.innerHTML = '';
    if (data.items && data.items.length > 0) {
      eventsListDiv.className = 'events-grid';
      data.items.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.classList.add('event-card');
        const startDate = new Date(event.start.dateTime || event.start.date);
        const formattedDate = startDate.toLocaleDateString('zh-TW', {
          year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'
        });
        const formattedTime = event.start.dateTime
          ? startDate.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })
          : '全天';
        let eventHTML = `
          <div class="event-title">
            <span>${category ? category.icon : '📅'}</span>
            <span>${event.summary || '未命名活動'}</span>
          </div>
          <div class="event-date">
            <span>📅</span>
            <span>${formattedDate} ${formattedTime}</span>
          </div>
          <div class="event-description">${event.description || '暫無活動說明'}</div>
        `;
        if (event.location) {
          eventHTML += `<p><strong>地點：</strong>${event.location}</p>`;
        }
        if (event.hangoutLink) {
          eventHTML += `<a href="${event.hangoutLink}" target="_blank" class="event-meet-link"><span>💻</span><span>線上會議連結</span></a>`;
        }
        eventElement.innerHTML = eventHTML;
        eventsListDiv.appendChild(eventElement);
      });
    } else {
      eventsListDiv.innerHTML = '<div class="no-events">目前沒有即將到來的活動</div>';
    }
  } catch (error) {
    console.error('Error fetching events:', error);
    eventsListDiv.innerHTML = '<div class="no-events">無法載入活動，請稍後再試</div>';
  }
}

const eventCategories = {
  meeting: { title: '青創者聚會', calendarId: 'c_a1db12d0b8abc2e662b87dadb124ffe8e150cc882d6a64ed9fddd83e38290d94@group.calendar.google.com', icon: '👥' },
  workshop:{ title: '青創者工作坊', calendarId: 'c_64edace9f892d2908080bde3aa8ef89a39838e377504d531aa09f1d86e5bcbca@group.calendar.google.com', icon: '🛠️' },
  market:  { title: '市集活動',   calendarId: 'c_6d4e7c09db51abdfa24652ecb4513727a3a79fb966b903e09e6c3d9f66613d22@group.calendar.google.com', icon: '🏪' },
  satellite:{title: '衛星據點活動', calendarId: 'c_74b96bd3be9a2808eb7f4a22d9fc2adcf8e532c863175a0cf3d944c673afd7ac@group.calendar.google.com', icon: '📍' }
};

function showEventCategory(categoryKey) {
  const category = eventCategories[categoryKey];
  if (category) {
    document.getElementById('events-container').style.display = 'block';
    document.getElementById('events-category-title').textContent = category.title;
    document.querySelector('#newsContent .product-grid').style.display = 'none';
    loadEvents(category.calendarId, category);
  }
  resetIdleTimer();
}

function hideEventsList() {
  document.getElementById('events-container').style.display = 'none';
  document.querySelector('#newsContent .product-grid').style.display = 'grid';
  resetIdleTimer();
}

// -------------------- 產品（既有） --------------------
let allProducts = [];
let currentFilters = { location: 'all', searchTerm: '', tag: 'all' };

async function initializeProductsPage() {
  const productContainer = document.getElementById('product-list-container');
  if (allProducts.length === 0) {
    try {
      const response = await fetch('/.netlify/functions/getProducts');
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(`API Error: ${errorData.message || response.statusText}`);
      }
      const records = await response.json();
      allProducts = records;
      renderTags();
      renderProducts();
    } catch (error) {
      console.error("無法從 Airtable 載入產品:", error);
      productContainer.innerHTML = `<div class="no-events">產品載入失敗：${error.message}</div>`;
    }
  } else {
    renderProducts();
  }
}

function renderProducts() {
  const productContainer = document.getElementById('product-list-container');
  let filteredProducts = allProducts.filter(product =>
    currentFilters.location === 'all' || product.fields['所屬據點'] === currentFilters.location
  );
  if (currentFilters.searchTerm) {
    const searchTerm = currentFilters.searchTerm.toLowerCase();
    filteredProducts = filteredProducts.filter(product =>
      (product.fields['產品名稱']?.toLowerCase().includes(searchTerm)) ||
      (product.fields['產品說明']?.toLowerCase().includes(searchTerm))
    );
  }
  if (currentFilters.tag !== 'all') {
    filteredProducts = filteredProducts.filter(product =>
      product.fields['Tags'] && product.fields['Tags'].includes(currentFilters.tag)
    );
  }
  productContainer.innerHTML = '';
  if (filteredProducts.length > 0) {
    filteredProducts.forEach(product => {
      const fields = product.fields;
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      const imageUrl = fields['產品照片'] ? fields['產品照片'][0].thumbnails.large.url : '/images/logo.png';
      const purchaseLink = fields['導購連結'] || '#';
      productCard.innerHTML = `
        <div class="product-image" style="background-image: url('${imageUrl}')"></div>
        <div class="product-info">
          <div class="product-title">${fields['產品名稱'] || '未命名產品'}</div>
          <div class="product-description">${fields['產品說明'] || '暫無說明'}</div>
          <a href="${purchaseLink}" target="_blank" class="event-meet-link" style="background: #fc913a;">前往購買</a>
        </div>`;
      productContainer.appendChild(productCard);
    });
  } else {
    productContainer.innerHTML = '<div class="no-events">找不到符合條件的產品。</div>';
  }
}

function renderTags() {
  const tagsContainer = document.getElementById('product-tags-container');
  const tags = new Set();
  allProducts.forEach(p => (p.fields.Tags || []).forEach(tag => tags.add(tag)));
  tagsContainer.innerHTML = '<button class="filter-btn active" data-tag="all">全部標籤</button>';
  tags.forEach(tag => {
    const tagButton = document.createElement('button');
    tagButton.className = 'filter-btn';
    tagButton.dataset.tag = tag;
    tagButton.textContent = tag;
    tagsContainer.appendChild(tagButton);
  });
}

// -------------------- 服務（新：場地 + 導覽） --------------------
let servicesCache = { venues: [], tours: [] };
let serviceFilters = { type: 'all', location: 'all', tag: 'all', searchTerm: '' };

async function initializeServicesPage() {
  const listEl = document.getElementById('services-list-container');
  const filtersEl = document.getElementById('services-filters');
  if (!listEl) return;
  listEl.innerHTML = '<div class="loading-spinner">正在載入服務…</div>';
  try {
    if (servicesCache.venues.length === 0) {
      const vRes = await fetch('/.netlify/functions/getVenues');
      servicesCache.venues = await vRes.json();
    }
    if (servicesCache.tours.length === 0) {
      const tRes = await fetch('/.netlify/functions/getTours');
      servicesCache.tours = await tRes.json();
    }
    renderServiceFilters(filtersEl);
    renderServices();
  } catch (err) {
    listEl.innerHTML = `<div class="no-events">載入失敗：${err.message}</div>`;
  }
}

function renderServiceFilters(container) {
  const allRecords = [...servicesCache.venues, ...servicesCache.tours];
  const locations = new Set(['全部據點']);
  allRecords.forEach(r => locations.add((r.fields['所屬據點'] || '').trim()));
  const tags = new Set(['全部標籤']);
  allRecords.forEach(r => (r.fields['Tags'] || []).forEach(t => tags.add(t)));

  container.innerHTML = `
    <div class="filter-group">
      <span class="filter-label">類型：</span>
      <div class="filter-options" id="service-type-options">
        <button class="filter-btn ${serviceFilters.type==='all'?'active':''}" data-type="all">全部</button>
        <button class="filter-btn ${serviceFilters.type==='venue'?'active':''}" data-type="venue">場地租借</button>
        <button class="filter-btn ${serviceFilters.type==='tour'?'active':''}" data-type="tour">導覽服務</button>
      </div>
    </div>
    <div class="filter-group">
      <span class="filter-label">據點：</span>
      <div class="filter-options" id="service-location-options">
        ${[...locations].map(loc => `
          <button class="filter-btn ${serviceFilters.location===(loc==='全部據點'?'all':loc)?'active':''}" data-location="${loc==='全部據點'?'all':loc}">${loc}</button>
        `).join('')}
      </div>
    </div>
    <div class="filter-group">
      <span class="filter-label">搜尋：</span>
      <input type="search" id="service-search" class="search-bar" placeholder="輸入服務名稱、描述…" value="${serviceFilters.searchTerm}">
    </div>
    <div class="filter-group">
      <span class="filter-label">標籤：</span>
      <div class="filter-options" id="service-tag-options">
        ${[...tags].map(tag => `
          <button class="filter-btn ${serviceFilters.tag===(tag==='全部標籤'?'all':tag)?'active':''}" data-tag="${tag==='全部標籤'?'all':tag}">${tag}</button>
        `).join('')}
      </div>
    </div>
  `;

  container.querySelectorAll('#service-type-options .filter-btn').forEach(btn=>{
    btn.onclick = (e)=>{ serviceFilters.type = e.target.dataset.type; renderServiceFilters(container); renderServices(); };
  });
  container.querySelectorAll('#service-location-options .filter-btn').forEach(btn=>{
    btn.onclick = (e)=>{ serviceFilters.location = e.target.dataset.location; renderServiceFilters(container); renderServices(); };
  });
  container.querySelectorAll('#service-tag-options .filter-btn').forEach(btn=>{
    btn.onclick = (e)=>{ serviceFilters.tag = e.target.dataset.tag; renderServiceFilters(container); renderServices(); };
  });
  const searchEl = container.querySelector('#service-search');
  if (searchEl) searchEl.oninput = (e)=>{ serviceFilters.searchTerm = e.target.value.toLowerCase(); renderServices(); };
}

function renderServices() {
  const listEl = document.getElementById('services-list-container');
  const all = [
    ...servicesCache.venues.map(v => ({type:'venue', data:v})),
    ...servicesCache.tours.map(t => ({type:'tour', data:t}))
  ];
  let filtered = all.filter(item => {
    const f = item.data.fields;
    if (serviceFilters.type!=='all' && item.type!==serviceFilters.type) return false;
    if (serviceFilters.location!=='all' && f['所屬據點']!==serviceFilters.location) return false;
    if (serviceFilters.tag!=='all') {
      const tags = f['Tags'] || [];
      if (!tags.includes(serviceFilters.tag)) return false;
    }
    if (serviceFilters.searchTerm) {
      const name = (f['場地名稱'] || f['導覽名稱'] || '').toLowerCase();
      const intro = (f['簡介'] || '').toLowerCase();
      if (!(name.includes(serviceFilters.searchTerm) || intro.includes(serviceFilters.searchTerm))) return false;
    }
    return true;
  });

  if (!filtered.length) {
    listEl.innerHTML = '<div class="no-events">找不到符合條件的服務。</div>';
    return;
  }
  listEl.innerHTML = '';
  filtered.forEach(item => listEl.appendChild(buildServiceCard(item)));
}

function buildServiceCard(item) {
  const f = item.data.fields;
  const card = document.createElement('div');
  card.className = 'product-card';
  const title = item.type==='venue' ? (f['場地名稱']||'未命名場地') : (f['導覽名稱']||'未命名導覽');
  const subtitle = f['所屬據點'] || '';
  const photo = f['照片'] && f['照片'][0] && f['照片'][0].thumbnails && f['照片'][0].thumbnails.large && f['照片'][0].thumbnails.large.url;
  const img = photo || '/images/logo.png';
  const intro = f['簡介'] || '';
  const price = (typeof f['參考價格']!=='undefined' && f['參考價格']!==null) ? `NT$${Number(f['參考價格']).toLocaleString()}` : '';
  const tags = f['Tags'] || [];
  const link = f['導向連結'] || f['Google Map 連結'] || '';
  const extraA = item.type==='venue' ? (f['可容納人數']?`可容納 ${f['可容納人數']} 人`:'') : (f['導覽時長（小時）']?`時長 ${f['導覽時長（小時）']} 小時`:'');
  const extraB = item.type==='venue' ? (f['定價方式']||'') : ((f['語言']||[]).join('、'));

  card.innerHTML = `
    <div class="product-image" style="background-image:url('${img}')"></div>
    <div class="product-info">
      <div class="product-title">${title}</div>
      <div class="product-description">
        <div style="margin-bottom:6px; color:#999;">${subtitle}</div>
        <div style="margin-bottom:8px;">${intro}</div>
        <div style="font-size:.9rem; opacity:.9;">${[extraA, extraB, price].filter(Boolean).join('・')}</div>
      </div>
      ${link ? `<a href="${link}" target="_blank" rel="noopener" class="event-meet-link" style="background:#2E8B57;">了解更多</a>` : ''}
      <div class="product-tags" style="margin-top:10px;">
        ${(tags||[]).map(t=>`<span class="tag">${t}</span>`).join('')}
      </div>
    </div>`;
  return card;
}

// -------------------- 事件監聽 --------------------
document.addEventListener('click', function(e) {
  // 產品篩選按鈕
  if (e.target.classList.contains('filter-btn') && (e.target.dataset.location || e.target.dataset.tag) && e.target.closest('#productsContent')) {
    const filterType = e.target.dataset.location ? 'location' : 'tag';
    const filterValue = e.target.dataset.location || e.target.dataset.tag;
    currentFilters[filterType] = filterValue;
    const parentContainer = e.target.parentElement;
    parentContainer.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    renderProducts();
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const searchBar = document.getElementById('product-search-bar');
  if (searchBar) {
    searchBar.addEventListener('input', function(e) {
      currentFilters.searchTerm = e.target.value;
      renderProducts();
    });
  }
  
  // 添加按鈕點擊回饋與漣漪效果
  addButtonFeedback();
  
  // 初始化地圖互動
  enhancedMapInteraction();
  
  // 改進無障礙性
  improveAccessibility();
  
  // 初始化圖片懶加載
  implementLazyLoading();
  
  resetIdleTimer();
});

// 按鈕點擊回饋
function addButtonFeedback() {
  document.querySelectorAll('button, .clickable, .bottom-menu-item').forEach(btn => {
    btn.addEventListener('click', function(e) {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 100);
      
      // 添加漣漪效果
      createRipple(e, this);
    });
  });
}

function createRipple(event, element) {
  const ripple = document.createElement('span');
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    background: rgba(255,255,255,0.5);
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 0.6s ease-out;
    pointer-events: none;
  `;
  
  element.style.position = 'relative';
  element.style.overflow = 'hidden';
  element.appendChild(ripple);
  
  setTimeout(() => ripple.remove(), 600);
}

document.addEventListener('click', resetIdleTimer);
document.addEventListener('touchstart', resetIdleTimer);
document.getElementById('idleWarning').addEventListener('click', resetIdleTimer);

// -------------------- 鍵盤導航支援 --------------------
document.addEventListener('keydown', (e) => {
  switch(e.key) {
    case 'Escape':
      goBack();
      break;
    case 'h':
    case 'H':
      if (e.ctrlKey || e.metaKey) {
        goHome();
        e.preventDefault();
      }
      break;
  }
});

// 增加 ARIA 標籤以改進無障礙性
function improveAccessibility() {
  document.querySelectorAll('.bottom-menu-item').forEach((item, index) => {
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    const title = item.querySelector('.bottom-menu-title');
    if (title) {
      item.setAttribute('aria-label', title.textContent);
    }
  });
}

// -------------------- Hook：根據 contentId 初始化頁面 --------------------
const __origShowContent = showContent;
showContent = function(contentId) {
  __origShowContent(contentId);
  if (contentId === 'products') initializeProductsPage();
  if (contentId === 'services') initializeServicesPage();
};

// -------------------- 使用者行為分析 --------------------
const analytics = {
  track(event, data) {
    console.log('Event:', event, data);
    // 可整合 Google Analytics 或其他分析工具
  },
  
  trackPageView(page) {
    this.track('page_view', { page, timestamp: Date.now() });
  },
  
  trackInteraction(element, action) {
    this.track('interaction', { element, action, timestamp: Date.now() });
  }
};

// -------------------- 資料快取策略 --------------------
const cacheManager = {
  cache: new Map(),
  maxAge: 5 * 60 * 1000, // 5分鐘
  
  async get(key, fetcher) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.maxAge) {
      return cached.data;
    }
    
    const data = await fetcher();
    this.cache.set(key, { data, timestamp: Date.now() });
    return data;
  }
};

// -------------------- 圖片懶加載 --------------------
function implementLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// -------------------- 多媒體專區 --------------------
function switchVideo(videoId, btnElement) {
  const iframe = document.getElementById('media-video-player');
  iframe.src = `https://www.youtube.com/embed/${videoId}`;
  
  // 處理按鈕的 'active' 狀態
  const buttons = document.querySelectorAll('.video-tag-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  btnElement.classList.add('active');
  
  resetIdleTimer(); // 點擊按鈕時重設計時器
}
