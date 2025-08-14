let currentPage = 'idle';
let pageStack = [];
let idleTimer;
let warningTimer;
let currentLanguage = 'zh';

// 語言切換
function switchLanguage(lang) {
    currentLanguage = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.header-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // 這裡可以實現多語言內容切換
    console.log(`Language switched to: ${lang}`);
}

// 進入主畫面
function enterMainScreen() {
    document.getElementById('idleHome').classList.add('hidden');
    setTimeout(() => {
        document.getElementById('mainScreen').classList.add('active');
        currentPage = 'main';
        resetIdleTimer();
    }, 800);
}

// 顯示內容
function showContent(contentId) {
    hideAllContent();
    document.getElementById(contentId + 'Content').classList.add('active');
    pageStack.push(currentPage);
    currentPage = contentId;
    document.getElementById('backBtn').style.display = 'block';
    resetIdleTimer();
    
    // 如果是地圖頁面，確保底部選單顯示
    if (contentId === 'map') {
        document.getElementById('mainMenu').style.display = 'flex';
    }
}

// 展開地圖
function expandMap() {
    const centralHub = document.getElementById('centralHub');
    centralHub.classList.add('expanded');
    resetIdleTimer();
}

// 顯示據點詳情
function showLocation(locationId) {
    hideAllContent();
    document.getElementById('locationContent').classList.add('active');
    updateLocationContent(locationId);
    pageStack.push(currentPage);
    currentPage = 'location';
    document.getElementById('backBtn').style.display = 'block';
    resetIdleTimer();
}

// 更新據點內容
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

// 隱藏所有內容
function hideAllContent() {
    document.querySelectorAll('.content-page').forEach(page => {
        page.classList.remove('active');
    });
    
    // 如果當前頁面是地圖頁面，不要隱藏底部選單
    if (currentPage !== 'map') {
        document.getElementById('mainMenu').style.display = 'none';
    }
}

// 返回上一頁
function goBack() {
    const centralHub = document.getElementById('centralHub');
    
    // 如果地圖已展開，先收起地圖
    if (centralHub.classList.contains('expanded')) {
        centralHub.classList.remove('expanded');
        resetIdleTimer();
        return;
    }
    
    if (pageStack.length > 0) {
        const previousPage = pageStack.pop();
        hideAllContent();
        
        if (previousPage === 'main') {
            document.getElementById('mainMenu').style.display = 'flex';
            document.getElementById('backBtn').style.display = 'none';
        } else {
            document.getElementById(previousPage + 'Content').classList.add('active');
        }
        
        currentPage = previousPage;
        if (pageStack.length === 0) {
            document.getElementById('backBtn').style.display = 'none';
        }
        resetIdleTimer();
    }
}

// 回到首頁
function goHome() {
    hideAllContent();
    document.getElementById('mainMenu').style.display = 'flex';
    document.getElementById('backBtn').style.display = 'none';
    pageStack = [];
    currentPage = 'main';
    
    // 收起地圖
    const centralHub = document.getElementById('centralHub');
    centralHub.classList.remove('expanded');
    
    resetIdleTimer();
}

// 重置閒置計時器
function resetIdleTimer() {
    clearTimeout(idleTimer);
    clearTimeout(warningTimer);
    document.getElementById('idleWarning').classList.remove('show');
    
    // 50秒後顯示警告
    warningTimer = setTimeout(() => {
        document.getElementById('idleWarning').classList.add('show');
    }, 50000);
    
    // 60秒後返回首頁
    idleTimer = setTimeout(() => {
        document.getElementById('idleWarning').classList.remove('show');
        returnToIdle();
    }, 60000);
}

// 返回閒置狀態
function returnToIdle() {
    document.getElementById('mainScreen').classList.remove('active');
    document.getElementById('idleHome').classList.remove('hidden');
    hideAllContent();
    document.getElementById('mainMenu').style.display = 'flex';
    document.getElementById('backBtn').style.display = 'none';
    pageStack = [];
    currentPage = 'idle';
    
    // 收起地圖
    const centralHub = document.getElementById('centralHub');
    if (centralHub) {
        centralHub.classList.remove('expanded');
    }
}

// 抓取google candler events
// 這個函式會在按下按鈕時被呼叫

async function loadEvents(calendarId) {
  const eventsListDiv = document.getElementById('events-list');
  eventsListDiv.innerHTML = '正在載入活動...'; // 顯示載入中的訊息

  try {
    // 呼叫我們自己的 Netlify Function，並透過參數傳遞 calendarId
    const response = await fetch(`/.netlify/functions/getCalendarEvents?calendarId=${calendarId}`);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // 清空載入訊息
    eventsListDiv.innerHTML = '';

    if (data.items && data.items.length > 0) {
      // 遍歷回傳的活動並顯示它們
      data.items.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.classList.add('product-card'); // 沿用現有的卡片樣式

        // 格式化日期時間
        const startTime = new Date(event.start.dateTime || event.start.date).toLocaleString('zh-TW');

        let eventHTML = `
          <div class="product-info">
            <div class="product-title">${event.summary}</div>
            <div class="product-description">
              <p><strong>時間：</strong>${startTime}</p>
              <p>${event.description || ''}</p>
        `;

        if (event.hangoutLink) {
          eventHTML += `<p><strong>會議連結：</strong><a href="${event.hangoutLink}" target="_blank">點此加入</a></p>`;
        }
        
        eventHTML += `
            </div>
          </div>
        `;

        eventElement.innerHTML = eventHTML;
        eventsListDiv.appendChild(eventElement);
      });
    } else {
      eventsListDiv.innerHTML = '目前沒有即將到來的活動。';
    }
  } catch (error) {
    console.error('Error fetching events:', error);
    eventsListDiv.innerHTML = '無法載入活動，請稍後再試。';
  }
}

// 抓取google candler events
// 這個函式會在按下按鈕時被呼叫

// 活動分類配置
const eventCategories = {
    meeting: {
        title: '青創者聚會',
        calendarId: 'c_a1db12d0b8abc2e662b87dadb124ffe8e150cc882d6a64ed9fddd83e38290d94@group.calendar.google.com',
        icon: '👥'
    },
    workshop: {
        title: '青創者工作坊',
        calendarId: 'c_64edace9f892d2908080bde3aa8ef89a39838e377504d531aa09f1d86e5bcbca@group.calendar.google.com', // 請替換成實際的 Calendar ID
        icon: '🛠️'
    },
    market: {
        title: '市集活動',
        calendarId: 'c_6d4e7c09db51abdfa24652ecb4513727a3a79fb966b903e09e6c3d9f66613d22@group.calendar.google.com', // 請替換成實際的 Calendar ID
        icon: '🏪'
    },
    satellite: {
        title: '衛星據點活動',
        calendarId: 'c_74b96bd3be9a2808eb7f4a22d9fc2adcf8e532c863175a0cf3d944c673afd7ac@group.calendar.google.com', // 請替換成實際的 Calendar ID
        icon: '📍'
    }
};

// 顯示特定分類的活動
function showEventCategory(categoryKey) {
    const category = eventCategories[categoryKey];
    if (category) {
        document.getElementById('events-container').style.display = 'block';
        document.getElementById('events-category-title').textContent = category.title;
        document.querySelector('.product-grid').style.display = 'none';
        loadEvents(category.calendarId, category);
    }
    resetIdleTimer();
}

// 隱藏活動列表，返回分類
function hideEventsList() {
    document.getElementById('events-container').style.display = 'none';
    document.querySelector('.product-grid').style.display = 'grid';
    resetIdleTimer();
}

// 修改後的載入活動函式
async function loadEvents(calendarId, category) {
    const eventsListDiv = document.getElementById('events-list');
    eventsListDiv.innerHTML = '<div class="loading-spinner">正在載入活動</div>';

    try {
        const response = await fetch(`/.netlify/functions/getCalendarEvents?calendarId=${calendarId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        eventsListDiv.innerHTML = '';

        if (data.items && data.items.length > 0) {
            // 將活動卡片以格狀排列
            eventsListDiv.className = 'events-grid';
            
            data.items.forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.classList.add('event-card');

                // 格式化日期時間
                const startDate = new Date(event.start.dateTime || event.start.date);
                const formattedDate = startDate.toLocaleDateString('zh-TW', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long'
                });
                const formattedTime = event.start.dateTime 
                    ? startDate.toLocaleTimeString('zh-TW', {
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                    : '全天';

                // 建立活動卡片內容
                let eventHTML = `
                    <div class="event-title">
                        <span>${category ? category.icon : '📅'}</span>
                        <span>${event.summary || '未命名活動'}</span>
                    </div>
                    <div class="event-date">
                        <span>📅</span>
                        <span>${formattedDate} ${formattedTime}</span>
                    </div>
                    <div class="event-description">
                        ${event.description || '暫無活動說明'}
                    </div>
                `;
                // 檢查活動是否有地點，如果有的話就顯示出來
               if (event.location) {
                eventHTML += `<p><strong>地點：</strong>${event.location}</p>`;
               }
                // **************************
                // 如果有 Google Meet 連結
                if (event.hangoutLink) {
                    eventHTML += `
                        <a href="${event.hangoutLink}" target="_blank" class="event-meet-link">
                            <span>💻</span>
                            <span>線上會議連結</span>
                        </a>
                    `;
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


// 監聽用戶交互
document.addEventListener('click', resetIdleTimer);
document.addEventListener('touchstart', resetIdleTimer);
document.getElementById('idleWarning').addEventListener('click', resetIdleTimer);

// 初始化
resetIdleTimer();

// =================================================================
// ================= 找產品頁面 (Airtable) 邏輯 ====================
// =================================================================

let allProducts = []; // 用來緩存從 Airtable 抓回來的所有產品
let currentFilters = {
    location: 'all',
    searchTerm: '',
    tag: 'all'
};

// 初始化產品頁面 (當使用者點擊「找產品」時觸發)
async function initializeProductsPage() {
    const productContainer = document.getElementById('product-list-container');
    // 如果尚未抓取過資料，才向 Netlify Function 發出請求
    if (allProducts.length === 0) {
        try {
            // *** 注意：我們需要建立一支名為 getProducts 的新 Netlify Function ***
            const response = await fetch('/.netlify/functions/getProducts');
            if (!response.ok) throw new Error('Network response was not ok');
            
            const records = await response.json();
            allProducts = records; // 儲存資料
            
            renderTags(); // 根據產品資料產生標籤按鈕
            renderProducts(); // 渲染所有產品

        } catch (error) {
            console.error("無法從 Airtable 載入產品:", error);
            productContainer.innerHTML = '<div class="no-events">產品載入失敗，請稍後再試。</div>';
        }
    } else {
        // 如果已經有資料，直接渲染
        renderProducts();
    }
}

// 根據篩選條件渲染產品卡片
function renderProducts() {
    const productContainer = document.getElementById('product-list-container');
    
    // 1. 篩選據點
    let filteredProducts = allProducts.filter(product => 
        currentFilters.location === 'all' || product.fields['所屬據點'] === currentFilters.location
    );

    // 2. 篩選關鍵字 (搜尋產品名稱和描述)
    if (currentFilters.searchTerm) {
        const searchTerm = currentFilters.searchTerm.toLowerCase();
        filteredProducts = filteredProducts.filter(product => 
            (product.fields['產品名稱']?.toLowerCase().includes(searchTerm)) ||
            (product.fields['產品說明']?.toLowerCase().includes(searchTerm))
        );
    }

    // 3. 篩選標籤
    if (currentFilters.tag !== 'all') {
        filteredProducts = filteredProducts.filter(product =>
            product.fields['Tags'] && product.fields['Tags'].includes(currentFilters.tag)
        );
    }

    // 產生 HTML
    productContainer.innerHTML = ''; // 清空容器
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
                </div>
            `;
            productContainer.appendChild(productCard);
        });
    } else {
        productContainer.innerHTML = '<div class="no-events">找不到符合條件的產品。</div>';
    }
}

// 動態產生標籤按鈕 (需要您在 Airtable 中新增一個名為 "Tags" 的多選欄位)
function renderTags() {
    const tagsContainer = document.getElementById('product-tags-container');
    const tags = new Set();
    allProducts.forEach(p => {
        if (p.fields.Tags) {
            p.fields.Tags.forEach(tag => tags.add(tag));
        }
    });

    tagsContainer.innerHTML = '<button class="filter-btn active" data-tag="all">全部標籤</button>';
    tags.forEach(tag => {
        const tagButton = document.createElement('button');
        tagButton.className = 'filter-btn';
        tagButton.dataset.tag = tag;
        tagButton.textContent = tag;
        tagsContainer.appendChild(tagButton);
    });
}

// 設定篩選按鈕的點擊事件
document.addEventListener('click', function(e) {
    // 據點和標籤篩選
    if (e.target.classList.contains('filter-btn')) {
        const filterType = e.target.dataset.location ? 'location' : 'tag';
        const filterValue = e.target.dataset.location || e.target.dataset.tag;
        
        // 更新當前篩選值
        currentFilters[filterType] = filterValue;

        // 更新按鈕的 active 狀態
        const parentContainer = e.target.parentElement;
        parentContainer.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        renderProducts(); // 重新渲染產品
    }
});

// 設定搜尋框的輸入事件
document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.getElementById('product-search-bar');
    if (searchBar) {
        searchBar.addEventListener('input', function(e) {
            currentFilters.searchTerm = e.target.value;
            renderProducts(); // 重新渲染產品
        });
    }
});

// ***** 修改原本的 showContent 函式 *****
// 我們需要在點擊「找產品」時，觸發我們的初始化函式
const originalShowContent = showContent; // 保存原始函式
showContent = function(contentId) {
    originalShowContent(contentId); // 呼叫原始函式
    if (contentId === 'products') {
        initializeProductsPage(); // 如果是產品頁，就執行初始化
    }
};