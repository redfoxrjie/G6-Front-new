# TOGO 土狗旅遊

一群喜愛國內外旅遊、透過自由行探索各地風情與美食的朋友們。在規劃行程的過程中，感受到對於共同編輯、規劃行程的平台功能不足，於是開始著手製作能讓每一位熱愛規劃旅遊的人都可以輕鬆分享、共同策畫旅遊行程的平台。

## 專案介紹

本專案前後端分離，並有前台和後台兩個網站。
* [土狗旅遊-前台](https://tibamef2e.com/cid101/g6/front/)
* [土狗旅遊-後台](https://tibamef2e.com/cid101/g6/back/) 測試帳號:togo 密碼:1234
* [簡報](https://drive.google.com/file/d/1copxXu2o2LDH0lnPBpD7UEZ9CkDwXJnE/view?usp=sharing)
* [文件](https://drive.google.com/file/d/1CGwLw8ZiwRgvAQtTOHHeFVE-nPkSiUz8/view?usp=sharing)
* [前台GitHub](https://github.com/redfoxrjie/G6-Front-new)
* [後台GitHub](https://github.com/redfoxrjie/G6-back)
* [PHP GitHub](https://github.com/redfoxrjie/G6-php)

## 使用技術

|  類別   | 技術  |
|  ----  | ----  |
| 前端  | CSS、HTML、JS、AJAX、Vue.js、串接地圖API、google第三方登入、OpenStreetMap、動態生成QRCode、Email.js、sweetalert、pinia、GSAP、SASS |
| 後端  | PHP、MySQL、Bootstrap |
| 工具與服務 | Figma、 git 、 MySQL 、 Notion, SourceTree |

## 網站架構圖

![前台架構](/src/assets/images/frontend-structure.png)

## 安裝與設置

sh
git clone https://github.com/redfoxrjie/G6-Front-new.git
cd G6-Front-new
npm install
npm run dev



|  id   | 功能  |
|  ----  | ----  |
| [redfoxrjie](https://github.com/redfoxrjie)  | 熱門行程切版、行程拖曳功能、行程評分給星動態介面、行程出發時間編輯功能、景點停留時間編輯功能、行程起訖時間自動計算、行程設定功能、行程封面上傳功能、辨識行程地點套用圖資、最新消息切版、最新消息類別篩選|
| [kljenny](https://github.com/kljenny)  | 熱門文章、註冊登入功能、第三方登入、忘記密碼、會員修改基本資料、會員修改密碼、更換個人大頭照、會員個人主頁複製行程|
| [libo](https://github.com/libo5566) | 熱門行程、共編行程、行程筆記、行程分享、管理我的行程、地圖串接、地圖功能使用導覽|
| [uuuut0](https://github.com/uuuut0) | 行程一覽-頁面切版、行程一覽-前台功能(搜尋,分頁按鈕),PHP串接、旅行筆記一覽-頁面切版、旅行筆記一覽-前台功能(搜尋,分頁按鈕),PHP、旅行筆記內頁-前台功能(按讚紀錄,留言),PHP串接、會員資料管理-切版、關於我們-切版|
| [aquamarune](https://github.com/aquamarune) | 最新消息、首頁視覺整合、查看單一消息、消息分類篩選、查看通知|
| [NaBi0215](https://github.com/NaBi0215) | 首頁熱門票券、票券一覽資訊帶入、票券內容金額及計數帶入、票券付款條件判斷、QRCode導入
(帶入動態生成購票資訊)、聯絡表單存入資料庫|