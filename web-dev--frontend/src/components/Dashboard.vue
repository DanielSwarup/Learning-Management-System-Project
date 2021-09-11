<template>
    <div class="dashboard-main-cont">
        <div class="dashboard-title">
            {{ headerName() }}
        </div>
        <router-view :key="$route.path">
            <keep-alive>
                <component :is='dashboardType'></component>
            </keep-alive>
        </router-view>

    </div>
</template>
<script>
import DashHome from '@/components/Student/DashHome.vue';
import DashGrades from '@/components/Student/DashGrades.vue';
import DashCourse from '@/components/Student/DashCourse.vue'
import Quiz from '@/components/Student/Quiz.vue'

export default {
    name: 'Dashboard',
    props:{
        dashboardType: String
    },
    components: {
        DashHome, DashGrades, DashCourse, Quiz
    },    data() {
        return {
            dashboard: "DashGrades",
        }
    },
    created() {
        this.userRole()
    },
    methods:{
        headerName: function (){
            if( this.dashboardType == "DashHome"){
                return  "Dashboard"
            } else if (this.dashboardType == "DashGrades"){
                return "Grades"
            } else if (this.dashboardType == "DashCourse"){
                return this.$route.params.name;
            }else if (this.dashboardType == "Quiz"){
                return `${this.$route.params.courseName} > Quiz > ${this.$route.params.quiz}`
            }
        },
        getCookie: function (name) {
            let cookie = {};
            document.cookie.split(';').forEach(function(el) {
                let [k,v] = el.split('=');
                cookie[k.trim()] = v;
            })
            return cookie[name];
        },
        userRole: async function(){
            var userCookieID = decodeURIComponent( this.getCookie('UserID')).replace('j:','')
            var role = ''
            await fetch('http://localhost:7000/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({query: `query {  userById(_id: ${userCookieID} ) { _id role }   }`})
            })
            .then( result => result.json())
            .then((data) =>{
                role = (data.data.userById.role)
                return data.data.userById
            }).catch(error => {
            console.error('Error:', error);
            });
            if(role != "Student"){
                location.replace('/')
            }
        },
    },
}




</script>

<style scoped>
    .dashboard-main-cont{
        width: 100%;
        float: left;
    }
    .dashboard-title{
        text-align: left;
        margin: 25px 75px 5px;
        font: normal normal 600 45px Montserrat;
        letter-spacing: 0px;
        color: #000000;
    }
    .dashboard-cards-cont{
        width: 100%;
    }
    .dashboard-calendar-cont{
        margin: 5px 75px 75px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        width: 500px;
        height: 600px;
        box-shadow: 0px 1px 2px #00000029;
        border: 1px solid #707070;
        border-radius: 2px;
        overflow: auto;
        float: left;
    }
    .dashboard-calendar-head {
        text-align: left;
        font: normal normal 600 40px Montserrat;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
        margin: 15px 25px;
    }
    .dashboard-calendar-head svg{
        margin-right: 10px;
    }
    .dash-calendar-items{
    }
    .dash-calendar-items li:nth-child(2n+1){
        background: #F1F1F1 0% 0% no-repeat padding-box;
    }
    .dash-calendar-items li:nth-child(2n){
        background: #FFFFFF 0% 0% no-repeat padding-box;
    }
    .dash-calendar-element{
        margin: 5px 0px
    }
    .dash-calendar-dateCont{
        margin: 0px 15px 0px 25px;
        float:left; 

    }
    .dash-calendar-day{
        text-align: left;
        font: normal normal 600 29px/35px Montserrat;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
    }
    .dash-calendar-month{
        text-align: left;
        font: normal normal normal 17px/20px Montserrat;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
    }
    .dash-calendar-name{
        text-align: left;
        font: normal normal normal 22px/27px Montserrat;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
        float:left; 
        margin-top: 15px;
    }
    .dashboard-course-cont{
    }
    .dashboard-course-card li{
        background: #FFFFFF 0% 0% no-repeat padding-box;
        box-shadow: 0px 1px 2px #00000029;
        border-radius: 2px;
        opacity: 1;
        width: 420px;
        height: 278px;
        margin: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        display: inline-block        
    }
    .dashboard-course-card li:nth-child(n+1){
        margin-top: 0px;
    }
    .dashboard-course-head{
        text-align: center;
        font: normal normal 600 45px/55px Montserrat;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
        margin-top: 20px;
    }
    .dashboard-course-head svg{
        margin-left: 70px;

        float: left;
    }
    .dashboard-course-head h1{
        float: left;
        text-align: center;
        font: normal normal 600 45px/55px Montserrat;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
        padding-bottom: 15px;
        padding-left: 10px
    }
    .dashboard-course-grade{
        text-align: center;
        font: italic normal 16px/19px Montserrat;
        letter-spacing: 0px;
        color: #000000;
        opacity: 0.8;
        margin: 10px;
    }
    .dashboard-course-recent-update{
        margin: 10px 20px 15px 20px;
        text-align: center;
        font: normal normal 600 20px/24px Montserrat;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
    }
    .dashboard-course-update-info{
        margin: 10px 20px 0px 20px;
        text-align: center;
        font: normal normal normal 16px/19px Montserrat;
        letter-spacing: 0px;
        color: #5A5A5A;
        opacity: 1;
    }
</style>