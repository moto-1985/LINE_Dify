// ニュースを取得してLINEに通知する関数
const fetchAndPostNews = (topic) => {
    const url = 'https://api.dify.ai/v1/workflows/run'; // ニュース取得APIのURL
    const payload = {
        'inputs': {
            'query': topic, // ニュースのトピック
        },
        'response_mode': 'blocking', // 同期的にレスポンスを受け取る
        'user': 'abc-123' // ユーザーID
    };
    const options = {
        'method': 'post', // HTTPメソッドをPOSTに設定
        'contentType': 'application/json', // コンテンツタイプをJSONに設定
        'headers': {
            'Authorization': 'Bearer ' + 'DifyのAPIトークンを入れる' // API認証トークン
        },
        'payload': JSON.stringify(payload) // ペイロードをJSON形式に変換
    };

    // APIにリクエストを送信
    const response = UrlFetchApp.fetch(url, options);
    // レスポンスをJSON形式に変換
    const data = JSON.parse(response.getContentText());
    Logger.log(data); // デバッグ用にレスポンスをログに出力
    const message = data['data']['outputs']['text']; // 取得したニュースをメッセージとして取得
    sendLineNotification(message); // LINEに通知する関数を呼び出し
};

// LINEに通知を送信する関数
const sendLineNotification = (messageText) => {
    const lineNotifyToken = 'LINEのAPIトークンを入れる'; // LINE Notifyのトークン
    const lineNotifyApiUrl = 'https://notify-api.line.me/api/notify'; // LINE Notify APIのURL

    const headers = {
        'Authorization': 'Bearer ' + lineNotifyToken, // 認証ヘッダー
        'Content-Type': 'application/x-www-form-urlencoded' // コンテンツタイプをURLエンコード形式に設定
    };

    const payload = {
        'message': messageText // 通知メッセージ
    };

    const options = {
        'method': 'post', // HTTPメソッドをPOSTに設定
        'headers': headers, // ヘッダーを設定
        'payload': payload // ペイロードを設定
    };

    // LINE Notify APIにリクエストを送信
    const response = UrlFetchApp.fetch(lineNotifyApiUrl, options);
    Logger.log(response.getContentText()); // デバッグ用にレスポンスをログに出力
};
