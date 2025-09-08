const Airtable = require('airtable');

exports.handler = async () => {
  try {
    const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = process.env;
    const TABLE = 'TOURS';

    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      const mock = [
        {
          id: 't1',
          fields: {
            '狀態': '上架中',
            '導覽名稱': '成龍濕地生態走讀',
            '所屬據點': '口湖・成龍捌貳',
            '照片': [],
            '簡介': '2 小時親子友善生態導覽。',
            '導覽時長（小時）': 2,
            '語言': ['中文'],
            '集合地點': '成龍濕地入口',
            '開放時段': ['假日','上午'],
            '參考價格': 600,
            '成團人數下限': 6,
            '注意事項': '請自備防曬與飲水。',
            '導向連結': '',
            'Tags': ['導覽','生態','親子']
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