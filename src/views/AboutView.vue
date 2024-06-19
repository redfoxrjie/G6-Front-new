<template>
  <div class="section-banner">
    <div class="container">
      <div class="sb-slogan ">
        <h2 class="sb-s-title col-5 col-md-3">土狗旅遊</h2>
        <div class="sb-s-subtitle">
          <h2>最便利的</h2>
          <h2>旅遊規劃網站</h2>
        </div>
      </div>
      <div class="sb-intro col-10 col-md-6">
        <h5>正在煩惱怎麼排行程嗎? <br>
          從規劃到出發，讓你輕鬆完成旅遊計畫
        </h5>
      </div>
    </div>
  </div>
<!-- 
  12欄內 img col-5,content col-5
margin col-1 -->
  <section class="section-abouttogo ">
    <div class="container">
      <div class="row row-cols-1 row-cols-md-2">
        <div class="s-a-imgWrap col-10 col-md-5">
          <img src="https://tibamef2e.com/cid101/g6/image/aboutpage/felix-rostig-UmV2wr-Vbq8-unsplash.jpg">
        </div>
        <div class="s-a-content col-10 col-md-5">
          <div class="section-title">
            <h3>關於<br>土狗旅遊</h3>
          </div>
          <p>
            Togo旅遊的靈感來自於一群好友的熱情，他們熱愛探索世界各地的文化和美食。在無數次的自由行旅途中，我們發現市面上缺乏一個能夠讓人們共同編輯和規劃行程的平台。因此，我們決定創建一個旅行愛好者的共享空間，不僅可以個人策劃行程，還能與其他旅遊愛好者一起合作，分享旅行心得。
          </p>

        </div>
      </div>

    </div>

  </section>
  <div class="container">
    <div class="section-title">
      <h3>土狗旅遊<br>開發團隊成員</h3>
    </div>
  </div>


  <section class="section-team">
    <div class="container">
      <div class="s-t-memCard-list row row-cols-md-2 row-cols-xl-4">
        <div class="s-t-memCard-wrap col " v-for="(mem ,n) in memberList">
          <div class="s-t-memCard">
            <div class="s-t-mc-img">
              <img :src="mem.imglink">
            </div>
            <div class="s-t-mc-title">
              <p class="title-job">{{mem.job}}</p>
              <h3 class="title-name">{{mem.name}}</h3>
            </div>
            <div class="s-t-mc-info">
              <p>{{mem.info}}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
  <div class="container">
    <div class="section-title st-center">
      <h3>旅遊達人推薦</h3>
    </div>

  </div>

  <section class="section-promote">
    <div class="container">
      <div class="s-p-userCard-list">
        <div class="s-p-userCard-wrap " v-for="(item,n) in promoList">
          <div class="s-p-userCard row row-cols-2 row-cols-md-2">
            <div class="s-p-u-img col-md-3">
              <img :src="item.imglink">
            </div>
            <div class="s-p-u-content col-md-8 ">
              <div class="s-p-u-title">
                <p>{{ item.title }}</p>
                <h3>{{ item.name }}</h3>
              </div>
              <p>{{ item.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>

export default {
data(){
  return {
    memberList: [
  {
    'job': '執行長',
    'name': 'Nihongo',
    'info': '擁有豐富的產品開發和團隊管理經驗，對行業有深刻理解。負責整體戰略規劃，確保平台的功能和用戶體驗達到最高標準。',
    'imglink':'https://tibamef2e.com/cid101/g6/image/aboutpage/about_1.jpg'

  },
  {
    'job': '營運長',
    'name': 'Yoshida Hiroshi',
    'info': '擅長優化公司流程，提升效率和服務質量。負責公司日常運營，確保各部門之間的協作和資源的高效利用。',
    'imglink':'https://tibamef2e.com/cid101/g6/image/aboutpage/about_2.jpg'

  },
  {
    'job': '設計長',
    'name': 'Kobayashi Aiko',
    'info': '曾參與多個成功的產品設計項目，對於用戶界面和產品設計有深入理解。負責平台的整體設計和用戶體驗，確保設計符合用戶需求和市場趨勢。',
    'imglink':'https://tibamef2e.com/cid101/g6/image/aboutpage/about_3.jpg'

  },
  {
    'job': '技術長',
    'name': 'Tanaka Kenji',
    'info': '具備豐富的軟體開發和技術管理經驗。專注於技術架構設計和系統開發。負責平台技術架構和系統開發，確保技術方案的可靠性和創新性。',
    'imglink':'https://tibamef2e.com/cid101/g6/image/aboutpage/about_4.jpg'
  }
],
promoList:[
  {'title':'旅遊部落客',
    'name':'Nihongo',
    'content':'「 這個平台讓我可以輕鬆地規劃和分享我的旅行行程，特別是與朋友共同編輯行程的功能，非常方便。我相信每一位旅行愛好者都會愛上這個網站。」',
    'imglink':'https://tibamef2e.com/cid101/g6/image/aboutpage/about_user1.jpg'
  }, {'title':'深度旅遊作家',
    'name':'Haruki',
    'content':'「旅行一直是我生活中重要的一部分。這個平台不僅讓我能夠精心規劃每一次旅行，還讓我能夠分享我的旅行故事和靈感，與粉絲們一起享受旅遊的樂趣。」',
    'imglink':'https://tibamef2e.com/cid101/g6/image/aboutpage/about_user2.jpg'

  }, {'title':'日本旅遊推廣大使',
    'name':'NIbo',
    'content':'「這個平台對於那些喜愛探索世界的人來說，是一個不可或缺的工具。它不僅功能豐富，而且操作簡便，非常適合所有年齡段的旅行者使用。」',
    'imglink':'https://tibamef2e.com/cid101/g6/image/aboutpage/about_user3.jpg'

  }
]

  }
},
methods: {
  toImgLink(img){
    const url = `@/assets/images/${img}`
    return url
  }
}
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/base/color';
@import '@/assets/styles/base/font';

//
.section-title {
  //多個區塊都會使用 
  border-bottom: 3px solid $accentColor-2;
  width: fit-content;
  padding: 5px 0;
  margin-bottom: 30px;
}
//特別section-title
.st-center{
  margin: 80px auto;
}

.section-banner {
  min-height: 550px;
  background-color: $accent-bgDrop;
  text-align: center;
  box-sizing: border-box;
  padding-top: 180px;

  .sb-slogan {
    margin: auto;

    .sb-s-title {
      border-bottom: 8px dashed #751D1D;
      stroke-linecap: round;
      margin: auto;
      line-height: 1.6;
    }

    .sb-s-subtitle {
      margin-top: 20px;
      color: $secondColor-2;

      h2 {
        line-height: 1.6;

      }
    }
  }

  .sb-intro {
    padding: 36px 0;
    margin: 30px auto;
    background-color: $primaryColor;
    border-radius: 8px;

    h5 {
      box-sizing: border-box;
      padding: 0 16px;
    }
  }

}

.section-abouttogo {
  padding: 30px 0;
  margin: 20px 0;
.row{justify-content: center;}
  .s-a-imgWrap {
    box-sizing: border-box;
    padding: 20px;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      aspect-ratio: 1;
      mask-image: url('@/assets/images/amoeba/clipmask01-xxl-svg.svg');
      mask-size: contain;
      mask-repeat: no-repeat;
      mask-position: center;
    }
  }

  .s-a-content {
    margin: 10% 0;

    p {
      line-height: 1.6;
    }
  }

}

.section-team {
  background-color: #fff;
  // padding-top: 20px;

  .s-t-memCard-list{justify-content: center;align-items: stretch;}
  .s-t-memCard-wrap {
    box-sizing: border-box;
    padding: 0px 5px;
    max-width: 300px;
    // height: 100;
    // min-height: 600px;
    .s-t-memCard {
      // height: 100%;
      aspect-ratio: 7/9;
      // box-shadow: .5px 2px 20px rgba(0, 0, 0, .1);
      // background: $primaryColor;
      border-radius: 5px;
      padding: 20px 0;
      .s-t-mc-img {
        overflow: hidden;
        border-radius: 50%;
        aspect-ratio: 1;
        width: 76%;
        margin: 20px 12%;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .s-t-mc-title {
        padding: 5px 25px;
        margin-bottom: 5px;

        .title-job {
          color: $grey;
        }

        .title-name {
          word-break: break-all;
          font-size: 18px;
        }
      }

      .s-t-mc-info {
        padding: 5px 25px;
        color: $grey;

        p {
          line-height: 1.4;
        }
      }

    }
  }
}

.section-promote {

  // .s-p-userCard-list{background-color: #7e1818;}
  .s-p-userCard-wrap {
    margin: auto;
    max-width: 800px;
    border: 2px solid #F4DA7B;
    border-radius: 8px;
    margin-bottom: 30px;
    height: fit-content;
    .s-p-userCard {
      justify-content: center;
      position: relative;

      .s-p-u-img {
        box-sizing: border-box;
        padding: 2%;
        aspect-ratio: 1;
        height: fit-content;
        max-width: 200px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          border-radius: 50%;
        }
      }

      .s-p-u-content {
        box-sizing: border-box;
        padding: 15px 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: fit-content;

        .s-p-u-title {
          padding: 10px 0
        }

        p {
          color: $grey;
          padding: 10px 0;

        }
      }
    }
  }
}
</style>
