<template>
    <div class="sidebar-cont">
        <div class="sidebar-topbar-cont">
            <div class="sidebar-search-cont">
                <div class="sidebar-search">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17.842" height="17.842" viewBox="0 0 17.842 17.842"><path id="Icon_map-search" data-name="Icon map-search" d="M14.5,12.122A7.056,7.056,0,1,0,12.12,14.5l4.788,4.787,2.374-2.375Zm-6.016.714a4.353,4.353,0,1,1,4.355-4.35A4.36,4.36,0,0,1,8.48,12.836Z" transform="translate(-1.44 -1.44)"/></svg>
                    <input type="text" placeholder="Search">
                </div>
                <div class="sidebar-user-cont">
                    <div class="sidebar-user">
                        <div class="sidebar-user-text">
                            <h1>{{userData.firstName}} {{userData.lastName}}</h1>
                            <p>{{userData.email}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class = "dash-cont">

        <div class = "sidebar-dashboard-Cont">
            <div class="sidebar-dashboard">
                <ul>
                   <a href="/dashboard-staff"> 
                    <li><div class="sidebar-dashboard-items" id = "dashboard"><svg xmlns="http://www.w3.org/2000/svg" width="27.941" height="27.941" viewBox="0 0 27.941 27.941"><path id="Icon_material-dashboard" data-name="Icon material-dashboard" d="M4.5,20.023H16.918V4.5H4.5Zm0,12.418H16.918V23.128H4.5Zm15.523,0H32.441V16.918H20.023Zm0-27.941v9.314H32.441V4.5Z" transform="translate(-4.5 -4.5)" fill="#f8f8f8"/></svg>
                            Dashboard
                        </div>
                    </li>
                    </a>
                    <a href="/dashboard-staff/manage">
                    <li><div class="sidebar-dashboard-items" id = "manage">
                        <svg xmlns="http://www.w3.org/2000/svg" width="31.114" height="27.225" viewBox="0 0 31.114 27.225"><path id="Icon_awesome-table" data-name="Icon awesome-table" d="M28.2,2.25H2.917A2.917,2.917,0,0,0,0,5.167V26.558a2.917,2.917,0,0,0,2.917,2.917H28.2a2.917,2.917,0,0,0,2.917-2.917V5.167A2.917,2.917,0,0,0,28.2,2.25ZM13.612,25.585H3.889V19.752h9.723Zm0-9.723H3.889V10.028h9.723Zm13.612,9.723H17.5V19.752h9.723Zm0-9.723H17.5V10.028h9.723Z" transform="translate(0 -2.25)" fill="#fff"/></svg>
                        Manage 
                        </div>
                    </li>
                    </a>
                    <a href="/dashboard-staff/grades">
                    <li><div class="sidebar-dashboard-items"> <svg xmlns="http://www.w3.org/2000/svg" width="26.4" height="33" viewBox="0 0 26.4 33"><path id="Icon_material-class" data-name="Icon material-class" d="M29.1,3H9.3A3.31,3.31,0,0,0,6,6.3V32.7A3.31,3.31,0,0,0,9.3,36H29.1a3.31,3.31,0,0,0,3.3-3.3V6.3A3.31,3.31,0,0,0,29.1,3ZM9.3,6.3h8.25V19.5l-4.125-2.475L9.3,19.5Z" transform="translate(-6 -3)" fill="#fff"/></svg>
                        Grades
                    </div>
                    </li>
                    </a>
                </ul>
                <h1>All Courses</h1>
                <!-- <br>
                <div class = "sidebar-new-course">
                    <a href="" class = "sidebar-new-course">Manage Courses</a>
                </div> -->
                <ul id = "user-courses" name = "user-courses">
            
                    <li v-for="courses in allCourses" :key="courses.courseName">
                        <router-link :to="{ name: 'ManageCourse', params: { courseName: courses.courseName }}">
                            <div class="sidebar-dashboard-items"> <svg xmlns="http://www.w3.org/2000/svg" width="26.4" height="33" viewBox="0 0 26.4 33"><path id="Icon_material-class" data-name="Icon material-class" d="M29.1,3H9.3A3.31,3.31,0,0,0,6,6.3V32.7A3.31,3.31,0,0,0,9.3,36H29.1a3.31,3.31,0,0,0,3.3-3.3V6.3A3.31,3.31,0,0,0,29.1,3ZM9.3,6.3h8.25V19.5l-4.125-2.475L9.3,19.5Z" transform="translate(-6 -3)" fill="#fff"/></svg>
                            {{courses.courseName}}
                            </div>
                        </router-link>
                    </li>
                </ul>

            </div>
        </div>
            <div class = "dash-main">
                    <keep-alive>
                        <StaffDashboard :dashboardType = dashview  />
                    </keep-alive>
            </div>
        </div>
    </div>
</template>

<script>
import StaffDashboard from '@/components/StaffDashboard.vue';

export default {
    props: {
        dashview: String,
    },
    name: 'StaffSidebar',
    components:{
        StaffDashboard, 
    },
    data() {
        return {
            dash: "StaffDashboard",
            userData: '',
            allCourses:''
        }
    },
    async created (){
        await this.getUserInfo()
        await this.getAllCourses()

    },
    methods: {
        getUserInfo : async function (){
            var userCookieID = decodeURIComponent( this.getCookie('UserID')).replace('j:','')
            await fetch('http://localhost:7000/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    // credentials: 'include',
                    body: JSON.stringify({query: `query {userById(_id: ${userCookieID}){ firstName lastName email role coursesId}}`})
                })
                .then( result => result.json())
                .then((data) => {
                this.userData = (data.data.userById)
                return data.data.userById
                }).catch(error => {
                console.error('Error:', error);
                });
        },
        getCookie: function (name) {
            let cookie = {};
            document.cookie.split(';').forEach(function(el) {
                let [k,v] = el.split('=');
                cookie[k.trim()] = v;
            })
            return cookie[name];
        },
        getAllCourses: async function (){
            await fetch('http://localhost:7000/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                // credentials: 'include',
                body: JSON.stringify({query: `{  courseMany { _id courseName }  }`})
            })
            .then( result => result.json())
            .then((data) => {
            this.allCourses = data.data.courseMany
            return data.data.courseMany
            }).catch(error => {
            console.error('Error:', error);
            });
        },
    }
}

// function highlight(){
//     var text = document.getElementById('dashboard');
// 	text.classList.add('sidebar-dashboard-items-selected');
// }
// highlight()
</script>

<style scoped>
    .dash-cont{
        width: auto;
        display: flex;
    }
    .dash-main{
    float: left;
    width: 100%;
    }
    .sidebar-cont{
        width: 100%;
        height: auto;
    }
    .sidebar-topbar-cont{
        width: 100%;
        height: 75px;
        background: #2E5D7E;
        opacity: 1;
        display: flex;
        align-items: center;
        
    }
    .sidebar-search-cont{
        margin-left: 150px;   
    }
    .sidebar-search-cont svg{
        position: absolute;
        left: 0;
        transform: translateX(75%);
    }
    .sidebar-search {
        position: relative;
        border: none;
        width: 244px;
        height: 41px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        box-shadow: 0px 1px 2px #00000029;
        border-radius: 8px;
        opacity: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        float: left;
    }
    .sidebar-search input{
        font: normal normal 300 20px Montserrat;
        border: none;
        width: 244px;
        height: 41px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        box-shadow: 0px 1px 2px #00000029;
        border-radius: 8px;
    }
    .sidebar-search ::placeholder{
        text-align: center;
    }
    .sidebar-user-cont{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .sidebar-user{
        width: 244px;
        height: 50px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        box-shadow: 0px 1px 2px #00000029;
        border-radius: 8px;
        opacity: 1;
        margin-left: 1080px;
    }
    .sidebar-user-text{
        margin-left:25px;
        margin-top: 8px;
        overflow-y: hidden;

    }
    .sidebar-search p{
        text-align: center;
        font: normal normal normal 22px/26px Arial;
        letter-spacing: 0px;
        color: #28282880;
        opacity: 1;
    }
    .sidebar-user h1{
        font: normal normal bold 15px/17px Arial;
        letter-spacing: 0px;
        color: #282828;
        opacity: 1;
    }
    .sidebar-user p{
        text-align: left;
        font: normal normal normal 15px/17px Arial;
        letter-spacing: 0px;
        color: #282828CC;
        opacity: 1;
    }

    .sidebar-dashboard-Cont{
        width:274px;
        min-height: 700px;
        height: auto;
        background: #003A62 0% 0% no-repeat padding-box;
        opacity: 1;
        display: flex;
        justify-content: center;
        /* align-items: center; */
    }
    .sidebar-dashboard{
        margin-top: 75px;
        height: auto;   
    }
    .sidebar-dashboard h1{
        text-align: left;
        font: normal normal bold 30px/37px Montserrat;
        letter-spacing: 0px;
        color: #F8F8F8D1;
        opacity: 1;
        margin-left:10px;

    }
    .sidebar-dashboard li{
        
        text-align: left;
        margin: 25px 15px;
        font: normal normal 600 25px/30px Montserrat;
        letter-spacing: 0px;
        color: #F8F8F8;
        opacity: 1;
        height: 100%;
    }
    .sidebar-dashboard-items{

        display: flex;
        justify-content: left;
        align-items: center;
        overflow-y: hidden;
        padding: 10px;
        text-decoration: none;
        color: #F8F8F8
    }
    .sidebar-dashboard-items svg{
        margin-right: 10px;
    }
    .sidebar-dashboard-items:hover{
        background: #2E5D7E 0% 0% no-repeat padding-box;
        border-radius: 8px;
    }
    .sidebar-dashboard-items-selected{
        background: #2E5D7E 0% 0% no-repeat padding-box;
        border-radius: 8px;
    }
    .sidebar-dashboard a{
        text-decoration: none;
    }
    .sidebar-new-course{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .sidebar-new-course a{
        text-decoration: underline !important;
        font: normal normal normal 20px Montserrat;
        letter-spacing: 0px;
        color: #F8F8F8;
        opacity: 1;
    }
</style>