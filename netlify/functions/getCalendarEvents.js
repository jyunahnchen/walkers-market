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