// netlify/functions/getCalendarEvents.js

exports.handler = async function(event, context) {
  // 從前端請求的網址中獲取 calendarId
  // 例如: /.netlify/functions/getCalendarEvents?calendarId=your-calendar-id@group.calendar.google.com
  const calendarId = event.queryStringParameters.calendarId;

  // 從 Netlify 環境變數中讀取安全的 API Key
  const apiKey = process.env.GOOGLE_API_KEY;

  // 如果前端沒有提供 calendarId，就回傳錯誤
  if (!calendarId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing calendarId parameter' })
    };
  }

  // 組合要傳送給 Google Calendar API 的網址
  const apiUrl = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&timeMin=${new Date().toISOString()}&singleEvents=true&orderBy=startTime`;

  try {
    // 使用 fetch 函式向 Google API 發出請求
    const response = await fetch(apiUrl);
    const data = await response.json();

    // 將從 Google 取得的資料回傳給前端
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    // 如果發生錯誤，回傳錯誤訊息
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch calendar events' })
    };
  }
};

// netlify/functions/getProducts.js

exports.handler = async function(event, context) {
  // 從 Netlify 環境變數中讀取安全的憑證
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = '產品列表'; // 您在 Airtable 中建立的表格名稱

  // 組合 Airtable API 的請求網址
  const apiUrl = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        // 這是 Airtable 的標準驗證方式
        'Authorization': `Bearer ${apiKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`Airtable API 錯誤: ${response.statusText}`);
    }

    const data = await response.json();

    // 我們只回傳狀態為「上架中」的產品
    const publishedProducts = data.records.filter(record => 
      record.fields.狀態 === '上架中'
    );

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      // 回傳過濾後的產品列表
      body: JSON.stringify(publishedProducts)
    };

  } catch (error) {
    console.error('抓取 Airtable 資料時發生錯誤:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: '無法從 Airtable 伺服器獲取資料。' })
    };
  }
};