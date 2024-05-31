<template>
  <footer>
    <section class="EndOfPage">
      <div class="box"></div>
      <div class="footer-waves">
        <svg
          class="waves"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shape-rendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
            <path
              id="gentle-line"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              stroke="#FFF"
              stroke-width="0.5"
            />
          </defs>
          <g class="wavy">
            <use xlink:href="#gentle-wave" x="48" y="0" fill="#F4DA7B" />
            <use xlink:href="#gentle-wave" x="48" y="3" fill="#9FC3E7" />
            <use xlink:href="#gentle-wave" x="48" y="5" fill="#0F125C" />
          </g>
          <g class="line" fill="none">
            <use xlink:href="#gentle-line" x="48" y="5" />
          </g>
        </svg>
      </div>
      <div class="footer-text">
        <div class="container">
          <div class="NormsAndPolicies">
            <div class="title">
              <h5>規範及政策</h5>
            </div>
            <div class="link">
              <h6>三大保證</h6>
              <h6>合作夥伴</h6>
              <h6>官方部落格</h6>
              <h6>企業旅遊規劃</h6>
            </div>
          </div>
          <div class="AboutTOGO">
            <div class="title">
              <h5>認識土狗旅遊</h5>
            </div>
            <div class="link">
              <h6>關於我們</h6>
              <h6>使用者政策</h6>
              <h6>隱私權保護政策</h6>
            </div>
          </div>
          <div class="ContactTOGO">
            <div class="title">
              <h5>聯絡我們</h5>
            </div>
            <div class="link">
              <h6>桃園市中壢區復興路46號9樓</h6>
              <h6>03-425-1108</h6>
              <h6>tibame@gmail.com</h6>
            </div>
          </div>
        </div>
      </div>
    </section>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

footer .EndOfPage {
  position: relative;
  color: #FFF;
  background: #F6F5F1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

footer .box {
  height: 10vh;
  width: 100%;
}

footer .waves {
  position: relative;
  width: 100%;
  height: 15vh;
  margin-bottom: -7px;
  min-height: 100px;
  max-height: 150px;
}

footer .wavy > use {
  animation: move-waves 25s cubic-bezier(.55, .5, .45, .5) infinite;
}

footer .wavy > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}

footer .wavy > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}

footer .wavy > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}

@keyframes move-waves {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}

footer .footer-text {
  height: 50vh;
  background-color: #0F125C;
}

footer .footer-text .container {
  display: flex;
  flex-direction: row;
}

@media (max-width: 768px) {
  footer .waves {
    height: 40px;
    min-height: 40px;
  }
}
</style>
