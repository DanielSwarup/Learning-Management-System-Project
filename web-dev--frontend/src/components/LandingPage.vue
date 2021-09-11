<template>
    <div class = "landingPage" id ="landingPage">
        <div class="landingInfo">
            <p>Hope is currently virtual</p>
        </div>
        <div class = "landingPictureCont">
            <img src="../assets/landingPage/landing.jpg" alt="" class="landingPicture">
            <p>The best place to be.<br> Welcome to new learning</p>
        </div>
        <div class="landing-section1-cont">
            <div class="landing-section1">
                <div class="landing-section1-banner-large">
                    <a href="https://www.nhs.uk/conditions/coronavirus-covid-19/">
                        <img src="../assets/landingPage/largeBanner.jpg" alt="">
                        <div class="landing-after-image"></div>
                        <p>COVID Safety</p>
                    </a>    
                </div>
            </div>
            <div class="landing-section1">
                <div class="landing-section1-banner-small">
                    <a href="/register">
                        <img src="../assets/landingPage/smallBanner0.jpg" alt="">
                        <div class="landing-after-image"></div>
                        <p>Register</p>
                    </a>
                </div>
                <div class="landing-section1-banner-small">
                    <a href="/login">
                        <img src="../assets/landingPage/smallBanner1.jpg" alt="">
                        <div class="landing-after-image"></div>
                        <p>Login</p>
                    </a>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: 'LandingPage',
mounted(){
    
    }
}

</script>
<style scoped>
    .landingPage{
        padding: 0;
    }
    .landingInfo{
        width: 100%;
        height: 84px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .landingInfo p{
        overflow-y: hidden;
        font: normal normal 600 24px/29px Montserrat;
    }
    .landingPictureCont{
        width: 100%;
        height: auto;
        position: relative;
        padding: 0;
    }
    @media screen and (min-width: 2000px){
        .landingPage{
        padding-left: calc(50vw - 750px); 
        padding-right: calc(50vw - 750px);
        }
    }
    .landingPicture{
        width: 100%;
        height: auto;
    }
    .landingPictureCont p{
        position: absolute;
        top: 40%;
        left: 10%;
        transform: translate(0%, 0%);
        text-align: left;
        font: normal normal 600 60px/73px Montserrat;
        letter-spacing: 0px;
        color: #FFFFFF;
    }
    .landing-section1-cont{
        padding-bottom: 25px;
        padding-top: 25px;
    }
    .landing-section1{
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .landing-section1-banner-large{
        display: block;
        box-shadow: 0px 3px 6px #01010129;
        height: auto;
        width: auto;
        position: relative;
        width: 800px;
        background-size: cover;
    }

    .landing-section1-banner-large .landing-after-image{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: transparent linear-gradient(359deg, #000000BA 0%, #80808000 100%) 0% 0% no-repeat padding-box;
    }
    .landing-section1-banner-large img{
        display: block;
        width: 100%;
        height: auto;    
    }
    .landing-section1-banner-large p{
        position: absolute;
        top: 100%;
        left: 0%;
        transform: translate(5%, -115%);
        text-align: left;
        font: normal normal 600 75px/92px Montserrat;
        letter-spacing: 0px;
        color: #FFFFFF;
        opacity: 1;
    }
    .landing-section1-banner-small{
        display: block;
        box-shadow: 0px 3px 6px #01010129;
        position: relative;
        width: 390px;
        height: 300px;
        background-size: cover;
        margin: 20px 10px;
    }
    .landing-section1-banner-small img{
        display: block;
        width: auto;
        height: 100%;  
    }
    .landing-section1-banner-small p{
        position: absolute;
        top: 100%;
        left: 0%;
        transform: translate(10%, -120%);
        text-align: left;
        font: normal normal 600 50px Montserrat;
        letter-spacing: 0px;
        color: #FFFFFF;
        opacity: 1;
    }


    .landing-section1-banner-small .landing-after-image{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: transparent linear-gradient(359deg, #000000BA 0%, #80808000 100%) 0% 0% no-repeat padding-box;
    }
    
</style>