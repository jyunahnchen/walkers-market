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

        console.log('=== Debug Information ===');
        console.log('AIRTABLE_API_KEY exists:', !!AIRTABLE_API_KEY);
        console.log('AIRTABLE_BASE_ID exists:', !!AIRTABLE_BASE_ID);
        console.log('AIRTABLE_TABLE_NAME:', AIRTABLE_TABLE_NAME);

        // 如果沒有設定環境變數，返回測試資料
        if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
            console.log('Using test data due to missing environment variables');
            const testData = [
                {
                    id: 'test1',
                    fields: {
                        '產品名稱': '測試產品 1',
                        '所屬據點': '旅人市集培育站',
                        '產品說明': '這是一個測試產品，用於驗證功能是否正常運作。',
                        '導購連結': 'https://example.com',
                        'Tags': ['測試', '農產']
                    }
                },
                {
                    id: 'test2',
                    fields: {
                        '產品名稱': '測試產品 2',
                        '所屬據點': '水林・雲林海青',
                        '產品說明': '另一個測試產品，來自水林據點。',
                        '導購連結': 'https://example.com',
                        'Tags': ['測試', '手工']
                    }
                }
            ];

            return {
                statusCode: 200,
                headers: {
                    ...headers,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(testData)
            };
        }

        // 初始化 Airtable
        const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);
        console.log('Airtable base initialized successfully');

        // 獲取產品資料
        console.log('Fetching records from Airtable...');
        const records = await base(AIRTABLE_TABLE_NAME).select({
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
