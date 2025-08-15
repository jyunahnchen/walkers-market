exports.handler = async function(event, context) {
    try {
        console.log('getProducts function called successfully');
        
        // 返回測試資料
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
