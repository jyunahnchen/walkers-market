const Airtable = require('airtable');

exports.handler = async function(event, context) {
    try {
        console.log('getProducts function called successfully');
        
        // 直接使用提供的 Airtable 設定進行測試
        const AIRTABLE_API_KEY = 'pathKhqr51mk6KvoW';
        const AIRTABLE_BASE_ID = 'appAxaHMnIMvR00d1';
        const AIRTABLE_TABLE_NAME = 'PRODUCTS';

        console.log('Testing Airtable connection with:');
        console.log('AIRTABLE_API_KEY:', AIRTABLE_API_KEY);
        console.log('AIRTABLE_BASE_ID:', AIRTABLE_BASE_ID);
        console.log('AIRTABLE_TABLE_NAME:', AIRTABLE_TABLE_NAME);

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
