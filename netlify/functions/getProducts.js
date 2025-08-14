const Airtable = require('airtable');

exports.handler = async function(event, context) {
    // 設定 CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    };

    // 處理 OPTIONS 請求 (CORS preflight)
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    try {
        // 從環境變數獲取 Airtable 設定
        const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
        const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
        const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || '產品列表';

        if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
            throw new Error('Missing Airtable configuration');
        }

        // 初始化 Airtable
        const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

        // 獲取產品資料
        const records = await base(AIRTABLE_TABLE_NAME).select({
            filterByFormula: "{狀態} = '上架中'", // 只顯示上架中的產品
            sort: [{ field: '產品名稱', direction: 'asc' }]
        }).all();

        // 轉換資料格式
        const products = records.map(record => ({
            id: record.id,
            fields: record.fields
        }));

        return {
            statusCode: 200,
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(products)
        };

    } catch (error) {
        console.error('Error fetching products from Airtable:', error);
        
        return {
            statusCode: 500,
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                error: 'Failed to fetch products',
                message: error.message
            })
        };
    }
};
