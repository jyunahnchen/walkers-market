// ========== 關於我們頁面 Modal 功能 ==========

// Modal 內容資料
const aboutModalContent = {
  mission: {
    title: '培育站願景',
    content: `
      <p>北港旅人市集培育站成立於北港，立足於推動青年創業輔導、地方創生及文化活化三大核心理念。</p>
      <p>我們的願景是陪伴青年返鄉，結合在地文化特色與創新思維，為青年創業者打造適合落地生根的環境。培育站不僅是一個物理空間，更是一個充滿活力的創業生態系統。</p>
      <p>透過專業輔導、資源整合與實務平台，我們協助青年將創意轉化為可持續經營的事業，同時保留並發揚北港的在地特色，讓傳統與創新在這裡完美融合。</p>
    `
  },
  values: {
    title: '核心理念',
    content: `
      <p>我們秉持永續發展的目標，培育站不僅提供創業支持，更致力於促進地方經濟與文化的共榮發展。</p>
      <h3>三大核心價值：</h3>
      <ul>
        <li><strong>在地深耕：</strong>深入了解北港的文化底蘊，協助青年發展具有在地特色的創業項目</li>
        <li><strong>創新思維：</strong>導入現代經營理念與數位工具，提升創業競爭力</li>
        <li><strong>永續發展：</strong>建立可持續的商業模式，創造經濟、社會與環境的三贏局面</li>
      </ul>
      <p>我們相信，透過青年的創意與活力，能為傳統產業注入新動能，創造屬於這個時代的北港故事。</p>
    `
  },
  counseling: {
    title: '創業陪伴輔導',
    content: `
      <p>創業陪伴輔導是培育站的核心服務之一，我們提供全方位的創業支援：</p>
      <h3>服務內容：</h3>
      <ul>
        <li><strong>個案諮詢：</strong>一對一深度輔導，針對創業者的具體需求提供客製化建議</li>
        <li><strong>市場分析：</strong>協助進行市場調查、競品分析、目標客群定位</li>
        <li><strong>行銷規劃：</strong>品牌定位、行銷策略制定、社群經營指導</li>
        <li><strong>經營實務指導：</strong>財務規劃、營運管理、團隊建立等實務技能培訓</li>
      </ul>
      <p>我們的輔導團隊由具有豐富實戰經驗的業師組成，能夠提供最貼近市場需求的專業建議，協助青年累積創業經驗，解決創業過程中遭遇的挑戰，提高創業成功率。</p>
    `
  },
  courses: {
    title: '創新培力課程',
    content: `
      <p>定期舉辦工作坊、講座及交流活動，全方位強化青年創業能力及創新意識。</p>
      <h3>課程主題涵蓋：</h3>
      <ul>
        <li><strong>設計思考：</strong>培養創新思維，從使用者需求出發設計產品與服務</li>
        <li><strong>品牌建立：</strong>品牌故事撰寫、視覺設計、品牌形象塑造</li>
        <li><strong>數位行銷：</strong>社群媒體經營、內容行銷、數位廣告投放</li>
        <li><strong>產品開發：</strong>從概念到商品化的完整流程指導</li>
        <li><strong>永續經營策略：</strong>建立可持續的商業模式，兼顧獲利與社會責任</li>
      </ul>
      <p>課程採用理論與實作並重的方式，邀請業界專家分享經驗，並提供實際操作機會，確保學員能夠將所學應用於創業實踐中。</p>
    `
  },
  market: {
    title: '實踐平台（旅人市集）',
    content: `
      <p>旅人市集不僅是一個市集活動，更是青年創業者的實踐舞台。</p>
      <h3>平台功能：</h3>
      <ul>
        <li><strong>試營運機會：</strong>提供低成本、低風險的創業試驗場域</li>
        <li><strong>市場驗證：</strong>直接面對消費者，收集真實市場反饋</li>
        <li><strong>品牌曝光：</strong>透過市集活動提升品牌知名度</li>
        <li><strong>經驗累積：</strong>學習銷售技巧、顧客服務、庫存管理等實務經驗</li>
        <li><strong>網絡建立：</strong>與其他創業者交流，建立合作關係</li>
      </ul>
      <p>市集定期舉辦，每次都有不同主題，吸引多元客群，為創業者創造豐富的市場接觸機會。我們也協助優秀的創業者參與其他大型市集活動，擴大市場版圖。</p>
    `
  },
  events: {
    title: '定期市集活動',
    content: `
      <p>定期籌辦主題市集活動，為青年創業者提供展示與銷售平台。</p>
      <h3>活動特色：</h3>
      <ul>
        <li>每月定期舉辦，培養穩定客群</li>
        <li>結合節慶、季節推出特色主題</li>
        <li>邀請在地藝文表演，增加活動豐富度</li>
        <li>提供攤位設計指導，提升整體市集質感</li>
        <li>透過社群媒體行銷，擴大活動影響力</li>
      </ul>
      <p>市集不只是買賣場所，更是文化交流、創意展現的平台，讓創業者與消費者建立深度連結。</p>
    `
  },
  culture: {
    title: '文化導覽企劃',
    content: `
      <p>深入挖掘北港在地文化，設計特色導覽行程，創造文化體驗經濟。</p>
      <h3>導覽內容：</h3>
      <ul>
        <li><strong>朝天宮文化之旅：</strong>探索媽祖信仰與傳統建築之美</li>
        <li><strong>老街巡禮：</strong>品味古早味小吃，聆聽老店故事</li>
        <li><strong>工藝體驗：</strong>參訪傳統工藝師傅，動手體驗製作過程</li>
        <li><strong>產業參訪：</strong>了解在地特色產業，如花生油、麻油製作</li>
      </ul>
      <p>透過專業導覽培訓，協助青年成為文化大使，將北港的故事傳遞給更多人，同時創造導覽服務的商業機會。</p>
    `
  },
  cooperation: {
    title: '在地合作專案',
    content: `
      <p>積極與在地組織、企業合作，創造多贏局面。</p>
      <h3>重點合作案例：</h3>
      <ul>
        <li><strong>白沙屯媽祖進香×環保公益：</strong>
          <ul>
            <li>設置環保補給站，推廣減塑理念</li>
            <li>提供在地青創產品作為進香伴手禮</li>
            <li>舉辦淨街活動，展現青年社會責任</li>
          </ul>
        </li>
        <li><strong>在地企業產學合作：</strong>協助青年與在地企業對接，創造實習與就業機會</li>
        <li><strong>社區營造參與：</strong>投入社區美化、文化保存等公益活動</li>
      </ul>
      <p>透過這些合作，不僅提升培育站的在地認同，也為青年創業者創造更多資源與機會。</p>
    `
  },
  stories: {
    title: '成功案例分享',
    content: `
      <p>培育站成立以來，已經陪伴許多青年實現創業夢想，以下是部分成功案例：</p>
      <h3>代表性案例：</h3>
      <ul>
        <li><strong>「北港好物」品牌：</strong>整合在地小農產品，建立統一品牌行銷，年營業額突破百萬</li>
        <li><strong>「老街文創工作室」：</strong>將傳統工藝結合現代設計，產品熱銷全台文創市集</li>
        <li><strong>「返鄉青年民宿」：</strong>活化老屋，提供深度文化體驗住宿，獲得國內外遊客好評</li>
        <li><strong>「在地小農直送」：</strong>建立產地直送平台，縮短產銷距離，助農民增收</li>
      </ul>
      <p>這些成功案例證明，只要有好的想法、專業的輔導，以及堅持不懈的努力，青年創業不是夢想，而是可以實現的目標。</p>
    `
  },
  company: {
    title: '精璽創新整合行銷有限公司',
    content: `
      <p>精璽創新整合行銷有限公司是旅人市集培育站的母公司，為培育站提供堅實的後盾。</p>
      <h3>公司優勢：</h3>
      <ul>
        <li><strong>豐富經驗：</strong>多年政府標案執行經驗，深諳政策方向與資源運用</li>
        <li><strong>專業團隊：</strong>跨領域專業人才，涵蓋行銷、設計、企劃、財務等領域</li>
        <li><strong>資源網絡：</strong>與政府、企業、學術界保持良好合作關係</li>
        <li><strong>成功案例：</strong>
          <ul>
            <li>嘉義縣政府農業及青年發展計畫</li>
            <li>大型政策企劃與執行</li>
            <li>品牌打造與行銷輔導</li>
          </ul>
        </li>
      </ul>
      <p>憑藉深耕在地的經驗、多元整合能力及緊密的政府合作關係，精璽為培育站提供穩健的資源與後勤支持，使得培育站能夠提供青年創業者專業的陪伴與實踐平台，形成從理論到實務、從課程培訓到市場實戰的完整創業生態圈。</p>
    `
  }
};

// 顯示 Modal
function showAboutModal(key) {
  const modal = document.getElementById('aboutModal');
  const modalBody = document.getElementById('modalBody');
  
  if (aboutModalContent[key]) {
    modalBody.innerHTML = `
      <h2>${aboutModalContent[key].title}</h2>
      ${aboutModalContent[key].content}
    `;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // 防止背景滾動
  }
  
  resetIdleTimer(); // 重置閒置計時器
}

// 關閉 Modal
function closeAboutModal(event) {
  if (!event || event.target.id === 'aboutModal' || event.target.classList.contains('modal-close')) {
    const modal = document.getElementById('aboutModal');
    modal.classList.remove('show');
    document.body.style.overflow = ''; // 恢復滾動
  }
  
  resetIdleTimer(); // 重置閒置計時器
}

// ESC 鍵關閉 Modal
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeAboutModal();
  }
});

// 修改原本的 resetAboutSection 函數，確保相容性
function resetAboutSection() {
  // 保持原有功能，但不需要做任何事情，因為新版本沒有需要重置的部分
}