const Airtable = require('airtable');

exports.handler = async function(event, context) {
    try {
        console.log('getProducts function called successfully');
        
        // 從環境變數獲取 Airtable 設定
        const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
        const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
        const AIRTABLE_TABLE_NAME = "產品列表";

        console.log('Environment variables check:');
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
                },
                {
                    id: 'test3',
                    fields: {
                        '產品名稱': '大林高山茶',
                        '所屬據點': '大林・雪香亭',
                        '產品說明': '精選高山茶葉，香氣清雅，回甘持久。',
                        '導購連結': 'https://example.com',
                        'Tags': ['茶葉', '高山', '大林']
                    }
                }
            ];

            return {
                statusCode: 200,
                body: JSON.stringify(testData)
            };
        }

        // 初始化 Airtable
        const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);
        console.log('Airtable base initialized successfully');

        // 獲取產品資料
        console.log('Fetching records from Airtable...');
        const records = await base(AIRTABLE_TABLE_NAME).select({
            filterByFormula: "{狀態} = '上架中'", // 只顯示上架中的產品
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
            body: JSON.stringify(products)
        };

    } catch (error) {
        console.error('Error in getProducts function:', error);
        
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Failed to fetch products',
                message: error.message
            })
        };
    }
};
