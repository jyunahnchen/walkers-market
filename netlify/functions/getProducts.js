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

        console.log('Environment variables check:');
        console.log('AIRTABLE_API_KEY exists:', !!AIRTABLE_API_KEY);
        console.log('AIRTABLE_BASE_ID exists:', !!AIRTABLE_BASE_ID);
        console.log('AIRTABLE_TABLE_NAME:', AIRTABLE_TABLE_NAME);

        if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
            throw new Error(`Missing Airtable configuration. API_KEY: ${!!AIRTABLE_API_KEY}, BASE_ID: ${!!AIRTABLE_BASE_ID}`);
        }

        // 初始化 Airtable
        const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);
        console.log('Airtable base initialized successfully');

        // 先嘗試獲取表格資訊
        try {
            const table = base(AIRTABLE_TABLE_NAME);
            console.log('Table accessed successfully');
        } catch (tableError) {
            console.error('Error accessing table:', tableError);
            throw new Error(`Table '${AIRTABLE_TABLE_NAME}' not found or inaccessible`);
        }

        // 獲取產品資料 - 先不加入篩選條件
        console.log('Fetching records from Airtable...');
        const records = await base(AIRTABLE_TABLE_NAME).select({
            // 暫時移除篩選條件，先確保基本功能正常
            // filterByFormula: "{狀態} = '上架中'",
            maxRecords: 100 // 限制記錄數量
        }).all();

        console.log(`Successfully fetched ${records.length} records`);

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
        console.error('Error in getProducts function:', error);
        console.error('Error stack:', error.stack);
        
        return {
            statusCode: 500,
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                error: 'Failed to fetch products',
                message: error.message,
                details: error.stack
            })
        };
    }
};
