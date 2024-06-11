<template>
    <div class="Ticket_pic">
        <img src="../assets/images/Ticket_innerpic.jpg" alt="">
        <div class="Ticket_pic_txt">
            <h4 class="Title_2">● 在世界第三大的「黑潮之海」大型水族箱前欣賞鯨鯊和魔鬼魟的英姿</h4>
            <h4 class="Title_2">● 一天共有兩場精采絕倫的鯨鯊餵食秀，十分推薦親子同樂</h4>
            <h4 class="Title_2">● 水族館內展出熱帶的小型魚類、蝦蟹與世界上最大的魚類鯨鯊，一睹豐富的海洋生物</h4>
        </div>
    </div>
    <div class="Ticket_txt Title">
        <h4 class="Title_2">景點介紹</h4>
        <h5 class="Title_2">● 美麗海水族館</h5>
        <p> 沖繩美麗海水族館位於沖繩北部的海洋博公園內，是前往沖繩不容錯過的景點！<br>館內有將近 30,000 種海洋生物，其中名為「黑潮之海」的大型水族箱更是名列世界第三大。<br>寬 22.5 公尺，高 8.2 公尺，飼育著各式各樣的海底生物，包括世界上最大的魚類——鯨鯊！<br>每天 15:00 和 17:00 還有兩場難得的鯨鯊餵食秀，你將親眼目睹鯨鯊極具震撼的直立式進食表演。<br>此外，你還可從水族館眺望伊江島美麗的風景，輕鬆而舒適地了解海洋奧秘。</p>
    </div>
    <div class="Purchase Title">
        <h4 class="Title_2" >票券說明</h4>
        <h5 class="Title_2">● 未滿 6 歲的孩童可免費入場，敬請知悉。</h5>
        <h5 class="Title_2">● 【有關訂購後未使用票券之取消】<br>恕無法進行訂單中的票券取消作業<br>敬請知悉。</h5>
    </div>
    <div class="Use Title">
        <h4 class="Title_2">使用說明</h4>
        <h5 class="Title_2">● 請直接至入口處出示附有「QR CODE」的電子憑證。</h5>
        <h5 class="Title_2">● 第一次使用後 1 天之內有效，逾期無效</h5>
    </div>
    <div class="Order Title">
        <h4>美麗水族館門票<br>Okinawa Churaumi Aquarium</h4>
        <div class="Order_Count">
            <h5 class="Title_2">選擇數量</h5>
            <div class="Count_1">
            <p>TWD 450/每人</p>
            <button>-</button>
            <button>0</button>
            <button>+</button>
        </div>
        <div class="Count_2">
            <h4>總金額</h4>
            <h4>TWD</h4>
            <button>0</button>
        </div>
        <button class="btn-1" type="submit">立即訂購</button>
        </div>
    </div>
</template>
    
<script>
</script>

<style lang="scss" scoped>
    @import '@/assets/styles/base/color';
    @import '@/assets/styles/base/font';
    @import '@/assets/styles/components/btn';
    
    .Ticket_pic img{
        margin-top: 5%;
        width: 50%;
        }
    @media (max-width: 768px) {
        .Ticket_pic img{
            width: 100%;
        }
    }
    .Ticket_pic_txt{
        margin-top: 50px;
        margin-left: 5%;
        h4{
            padding: 10px 0px;
        }
    }
    .Ticket_txt{
        line-height: 30px;
    }
    .Title{
        margin: 50px;
    }
    .Title_2{
        padding-bottom: 20px;
    }
    .Order{
        color:#4F82D4;
        position: fixed;
        top:0;
        right:0;
        z-index: 10;
        margin-top: 100px;
        h4{
            margin: 30px 0px;
            text-align: center;
        }
    .Order_Count{
        border: 2px solid #9FC3E7; padding:25px 25px;
        background-color: $primaryColor;
        height: auto;
        border-radius: 30px;
        h5{
            font-size: 12px;
        };
        .Count_1{
            display: flex;
            padding: 10px 0px;
            gap: 8%;
        };
        .Count_2{
            display: flex;
            padding: 10px 0px;
            gap: 10%;
        };
        .btn-1{
            margin: 0px 6.5rem;
            
        }
        .btn-1:hover{
            background-color: $accentColor-2;
            color: $secondColor-3;
        }
    };
    }
    @media (max-width: 768px) {
        .Order {
            position: static;
        }
    }
</style>