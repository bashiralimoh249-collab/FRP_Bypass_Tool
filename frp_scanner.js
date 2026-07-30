const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.static('public'));

// إنشاء مجلد public للواجهة
const fs = require('fs');
if (!fs.existsSync('public')) fs.mkdirSync('public');

// واجهة المستخدم
app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FRP & iCloud Bypass Research</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            background: #0a0a0a; 
            color: #0f0; 
            font-family: 'Courier New', monospace;
            padding: 20px;
        }
        .container { max-width: 900px; margin: 0 auto; }
        .header {
            text-align: center;
            border: 2px solid #0f0;
            padding: 20px;
            margin-bottom: 20px;
        }
        .warning {
            color: #f00;
            text-align: center;
            margin: 15px 0;
            padding: 10px;
            border: 1px solid #f00;
        }
        .card {
            border: 1px solid #0f0;
            padding: 15px;
            margin: 10px 0;
            border-radius: 5px;
        }
        select, button {
            width: 100%;
            padding: 10px;
            margin: 5px 0;
            background: #111;
            color: #0f0;
            border: 1px solid #0f0;
            font-family: 'Courier New', monospace;
        }
        button { cursor: pointer; background: #030; }
        button:hover { background: #040; }
        .result {
            background: #111;
            padding: 10px;
            margin: 10px 0;
            max-height: 300px;
            overflow-y: auto;
            font-size: 12px;
        }
        .method-list { margin: 10px 0; }
        .method-item { 
            padding: 5px; 
            margin: 3px 0;
            border-left: 3px solid #0f0;
            padding-left: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔓 FRP & iCloud Bypass Research Tool</h1>
            <p>Android 7-16 | iOS 7-26.0.3</p>
        </div>
        
        <div class="warning">
            ⚠️ للأغراض التعليمية والبحثية فقط<br>
            استخدم فقط على أجهزتك الشخصية
        </div>
        
        <div class="card">
            <h2>📱 Android FRP Bypass</h2>
            <select id="androidVersion">
                <option value="">اختر إصدار Android</option>
                <option value="7">Android 7.x</option>
                <option value="8">Android 8.x</option>
                <option value="9">Android 9.x</option>
                <option value="10">Android 10.x</option>
                <option value="11">Android 11.x</option>
                <option value="12">Android 12.x</option>
                <option value="13">Android 13.x</option>
                <option value="14">Android 14.x</option>
                <option value="15">Android 15.x</option>
                <option value="16">Android 16.x</option>
            </select>
            <button onclick="showAndroidMethods()">عرض الطرق المتاحة</button>
            <div id="androidResult" class="result"></div>
        </div>
        
        <div class="card">
            <h2>🍎 iOS iCloud Bypass</h2>
            <select id="iosVersion">
                <option value="">اختر إصدار iOS</option>
                <option value="7">iOS 7.x</option>
                <option value="8">iOS 8.x</option>
                <option value="9">iOS 9.x</option>
                <option value="10">iOS 10.x</option>
                <option value="11">iOS 11.x</option>
                <option value="12">iOS 12.x</option>
                <option value="13">iOS 13.x</option>
                <option value="14">iOS 14.x</option>
                <option value="15">iOS 15.x</option>
                <option value="16">iOS 16.x</option>
                <option value="17">iOS 17.x</option>
                <option value="18">iOS 18.x</option>
                <option value="19">iOS 19.x</option>
                <option value="20">iOS 20.x</option>
                <option value="21">iOS 21.x</option>
                <option value="22">iOS 22.x</option>
                <option value="23">iOS 23.x</option>
                <option value="24">iOS 24.x</option>
                <option value="25">iOS 25.x</option>
                <option value="26">iOS 26.0.3</option>
            </select>
            <button onclick="showIOSMethods()">عرض الطرق المتاحة</button>
            <div id="iosResult" class="result"></div>
        </div>
    </div>
    
    <script>
        const androidData = ${JSON.stringify(require('./vulnerabilities.json').android_frp)};
        const iosData = ${JSON.stringify(require('./vulnerabilities.json').ios_bypass)};
        
        function showAndroidMethods() {
            const version = document.getElementById('androidVersion').value;
            const resultDiv = document.getElementById('androidResult');
            
            if (!version) {
                resultDiv.innerHTML = '❌ اختر إصدار أولاً';
                return;
            }
            
            const data = androidData['android_' + version];
            if (!data) {
                resultDiv.innerHTML = '❌ لا توجد بيانات لهذا الإصدار';
                return;
            }
            
            let html = '<h4>✅ Android ' + version + ' Methods:</h4>';
            html += '<div class="method-list">';
            html += '<strong>الطرق:</strong><br>';
            data.methods.forEach(m => {
                html += '<div class="method-item">🔹 ' + m + '</div>';
            });
            html += '<br><strong>الأدوات:</strong><br>';
            data.tools.forEach(t => {
                html += '<div class="method-item">🛠️ ' + t + '</div>';
            });
            html += '<br><strong>CVEs:</strong><br>';
            data.cve.forEach(c => {
                html += '<div class="method-item">📌 ' + c + '</div>';
            });
            html += '</div>';
            
            resultDiv.innerHTML = html;
        }
        
        function showIOSMethods() {
            const version = document.getElementById('iosVersion').value;
            const resultDiv = document.getElementById('iosResult');
            
            if (!version) {
                resultDiv.innerHTML = '❌ اختر إصدار أولاً';
                return;
            }
            
            const data = iosData['ios_' + version];
            if (!data) {
                resultDiv.innerHTML = '❌ لا توجد بيانات لهذا الإصدار';
                return;
            }
            
            let html = '<h4>✅ iOS ' + version + ' Methods:</h4>';
            html += '<div class="method-list">';
            html += '<strong>الطرق:</strong><br>';
            data.methods.forEach(m => {
                html += '<div class="method-item">🔹 ' + m + '</div>';
            });
            html += '<br><strong>الأدوات:</strong><br>';
            data.tools.forEach(t => {
                html += '<div class="method-item">🛠️ ' + t + '</div>';
            });
            html += '<br><strong>المعالجات المدعومة:</strong><br>';
            data.chipsets.forEach(c => {
                html += '<div class="method-item">💾 ' + c + '</div>';
            });
            html += '</div>';
            
            resultDiv.innerHTML = html;
        }
    </script>
</body>
</html>
    `);
});

app.listen(port, '0.0.0.0', () => {
    console.log(`\n✅ FRP Scanner running on http://localhost:${port}\n`);
});
