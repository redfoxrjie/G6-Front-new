<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <footer>
        <section class="EndOfPage">
            <!-- 與上方section隔開，放一個box空間撐空間 -->
            <div class="box"></div>
            <!--footer波浪效果SVG-->
            <div class="footer-waves">
                <svg class="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none"
                    shape-rendering="auto">
                    <defs>
                        <path id="gentle-wave"
                            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                        <path id="gentle-line"
                            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" stroke="#FFF"
                            stroke-width="0.5" />
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
            <!-- footer文字區 -->
            <div class="footer-text">
                <div class="container">
                    <!-- (3項)規範及政策 -->
                    <div class="item">
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
                    <div class="item">
                        <div class="title">
                            <h5>認識土狗旅遊</h5>
                        </div>
                        <div class="link">
                            <h6>關於我們</h6>
                            <h6>使用者政策</h6>
                            <h6>隱私權保護政策</h6>
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">
                            <h5>聯絡我們</h5>
                        </div>
                        <div class="link">
                            <h6>桃園市中壢區復興路46號9樓</h6>
                            <h6>03-425-1108</h6>
                            <h6>tibame@gmail.com</h6>
                        </div>
                    </div>
                    <!-- 社群圖示 -->
                    <div class="footer_icon">
                        <div class="icon">
                            <a href="#">
                                <div class="icon_circle">
                                    <i class="fa-brands fa-instagram" style="color: #ffffff;"></i>
                                </div>
                            </a>
                        </div>
                        <div class="icon">
                            <a href="#">
                                <div class="icon_circle">
                                    <i class="fa-brands fa-facebook-f" style="color: #ffffff;"></i>
                                </div>
                            </a>
                        </div>
                        <div class="icon">
                            <a href="#">
                                <div class="icon_circle">
                                    <i class="fa-brands fa-youtube" style="color: #ffffff;"></i>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="dim">
                    <div class="text">
                        <p>本網站為緯育TibaMe_前端設計工程師班第90期學員專題成果作品,本平台僅供學習、展示之用。</p>
                        <p>若有抵觸有關著作權,或有第三人主張侵害智慧財產權等情事,均由學員負法律上責任,緯育公司概不負責。若有侵權疑慮,您可以私訊[ 緯育TibaMe ],後續會由專人協助處理。</p>
                    </div>
                </div>
            </div>
            
        </section>
    </footer>
</template>


<script>

export default {
  name: "Footer",
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/base/color';
@import '../../assets/styles/base/font';


body {
            margin: 0;
            padding: 0;
        }
        footer .EndOfPage {
            position: relative;
            /* text-align: center; */
            color: #FFF;
            background: #F6F5F1;
            display: flex;
            /* 將 .EndOfPage 元素設為彈性容器 */
            flex-direction: column;
            /* 内部元素垂直排列 */
            align-items: stretch;
            /* 内部元素充滿容器的高度 */
        }
        footer .box {
            height: 10vh;
            width: 100%;
        }
        /* footer波浪效果SVG */
        footer .waves {
            position: relative;
            width: 100%;
            height: 15vh;
            margin-bottom: -7px;
            min-height: 100px;
            max-height: 150px;
        }
        footer .wavy>use {
            animation: move-waves 25s cubic-bezier(.55, .5, .45, .5) infinite;
        }
        footer .wavy>use:nth-child(1) {
            animation-delay: -2s;
            animation-duration: 7s;
        }
        footer .wavy>use:nth-child(2) {
            animation-delay: -3s;
            animation-duration: 10s;
        }
        footer .wavy>use:nth-child(3) {
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
        /*Footer文字*/
        footer .footer-text {
            height: 60vh;
            background-color: #0F125C;
        }
        footer .footer-text .container{
            display: flex;
            flex-direction: row;
            margin: 5vh 10vw ;
        }
        footer .footer-text .container .item{
            margin-right: 10vw;
        }
        footer .footer-text .container .footer_icon{
            display: flex;
            flex-direction: row;
        }
        footer .footer-text .container .footer_icon .icon{
            display: flex;
            align-items: center;
        }
        footer .footer-text .container .footer_icon .icon a{
            text-decoration:none
        }
        footer .footer-text .container .footer_icon .icon_circle{
            width: 2rem;   
            height: 2rem;
            border: 0.1rem solid #FFFFFF;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 0.5vw;
        }
        footer .dim{
            font-size: 12px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        footer .dim p{
            text-align: center;
        }
        /* footer RWD */
        @media (max-width: 768px) {
            footer .waves {
                height: 40px;
                min-height: 40px;
            }
        }
</style>
