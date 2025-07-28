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
    document.getElementById('mainMenu').style.display = 'none';
}

// 返回上一頁
function goBack() {
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
}

// 監聽用戶交互
document.addEventListener('click', resetIdleTimer);
document.addEventListener('touchstart', resetIdleTimer);
document.getElementById('idleWarning').addEventListener('click', resetIdleTimer);

// 初始化
resetIdleTimer();