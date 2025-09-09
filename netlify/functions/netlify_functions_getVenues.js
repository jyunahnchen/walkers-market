const Airtable = require('airtable');

exports.handler = async () => {
  try {
    const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = process.env;
    const TABLE = process.env.AIRTABLE_VENUES_TABLE_NAME || 'VENUES';

    // 允許在本地/未設環境變數時回傳測試資料
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      const mock = [
        {
          id: 'v1',
          fields: {
            '狀態': '上架中',
            '場地名稱': '培育站多功能空間 A',
            '所屬據點': '旅人市集培育站',
            '照片': [],
            '簡介': '適合小型課程與會議，含投影與 Wifi。',
            '可容納人數': 30,
            '開放時段': ['平日','白天'],
            '設備與配備': ['投影/TV','Wifi','白板'],
            '使用限制': ['禁煙'],
            '定價方式': '時租',
            '參考價格': 1500,
            '交通與位置': '高鐵接駁 10 分鐘；附鄰近停車資訊。',
            'Google Map 連結': 'https://maps.google.com',
            '聯絡資訊': 'Email: hello@example.com / 05-1234567',
            'Tags': ['場租','會議','課程']
          }
        }
      ];
      return { statusCode: 200, body: JSON.stringify(mock) };
    }

    const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);
    const records = await base(TABLE).select({
      filterByFormula: "{狀態} = '上架中'",
      maxRecords: 200
    }).all();

    const data = records.map(r => ({ id: r.id, fields: r.fields }));
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};