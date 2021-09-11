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
                            <h1>{{userData.firstName}} {{userData.lastName}} </h1>
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
                   <a href="/dashboard"> 
                    <li><div class="sidebar-dashboard-items"><svg xmlns="http://www.w3.org/2000/svg" width="27.941" height="27.941" viewBox="0 0 27.941 27.941"><path id="Icon_material-dashboard" data-name="Icon material-dashboard" d="M4.5,20.023H16.918V4.5H4.5Zm0,12.418H16.918V23.128H4.5Zm15.523,0H32.441V16.918H20.023Zm0-27.941v9.314H32.441V4.5Z" transform="translate(-4.5 -4.5)" fill="#f8f8f8"/></svg>
                            Dashboard
                        </div>
                    </li>
                    </a>
                    <a href="/grades">
                    <li><div class="sidebar-dashboard-items">
                        <svg xmlns="http://www.w3.org/2000/svg" width="31.114" height="27.225" viewBox="0 0 31.114 27.225"><path id="Icon_awesome-table" data-name="Icon awesome-table" d="M28.2,2.25H2.917A2.917,2.917,0,0,0,0,5.167V26.558a2.917,2.917,0,0,0,2.917,2.917H28.2a2.917,2.917,0,0,0,2.917-2.917V5.167A2.917,2.917,0,0,0,28.2,2.25ZM13.612,25.585H3.889V19.752h9.723Zm0-9.723H3.889V10.028h9.723Zm13.612,9.723H17.5V19.752h9.723Zm0-9.723H17.5V10.028h9.723Z" transform="translate(0 -2.25)" fill="#fff"/></svg>
                        Grades
                        </div>
                    </li>
                    </a>
                </ul>
                <h1>My Courses</h1>
                <ul id = "user-courses" name = "user-courses">
                    <li v-for="courses in userCourses" :key="courses.courseName">
                            <router-link :to="{ name: 'Course', params: { name: courses.courseName}}" style="text-decoration:none; color: #F8F8F8">    
                                <div class="sidebar-dashboard-items"> <svg xmlns="http://www.w3.org/2000/svg" width="26.4" height="33" viewBox="0 0 26.4 33"><path id="Icon_material-class" data-name="Icon material-class" d="M29.1,3H9.3A3.31,3.31,0,0,0,6,6.3V32.7A3.31,3.31,0,0,0,9.3,36H29.1a3.31,3.31,0,0,0,3.3-3.3V6.3A3.31,3.31,0,0,0,29.1,3ZM9.3,6.3h8.25V19.5l-4.125-2.475L9.3,19.5Z" transform="translate(-6 -3)" fill="#fff"/></svg>
                                    {{courses.courseName}}
                                </div>
                            </router-link>
                    </li>

                </ul>
                <div class = "sidebar-new-course">
                    <a href='#'  v-if="joinIsHidden" @click="joinIsHidden = !joinIsHidden" class = "sidebar-new-course">Join new course</a>
                </div>
                <div class = "sidebar-new-course">
                    <a href='#' v-if="!joinIsHidden" @click="joinIsHidden = !joinIsHidden" class = "sidebar-new-course">X Close</a>
                </div>
                    <div class = "joincourse">
                        <ul v-if="!joinIsHidden">
                            <li v-if="filteredCourses.length != 0">
                                <form action="" @submit.prevent="joinCourse()"  class = "quiz-question" >
                                    <div v-for="courses in filteredCourses" :key="courses.courseName">
                                    <input type="checkbox" :id="courses._id" name="coursesJoin" :value ="courses._id">
                                    <label :for="courses.courseName">{{ courses.courseName}}</label><br>
                                    </div>
                                    <button type = "submit" >Confirm</button>
                                </form>
                            </li>
                            <li v-else>
                                You've signed up for all available courses. 
                            </li>
                        </ul>
                    </div>
            </div>
        </div>
            <div class = "dash-main">
                    <keep-alive>
                        <Dashboard :dashboardType = dashview  />
                    </keep-alive>
            </div>
        </div>
    </div>
</template>

<script>
import Dashboard from '@/components/Dashboard.vue';

export default {
    name: 'Sidebar',
    props: {
        dashview: String,
    },
    components:{
        Dashboard, 
    },
    data() {
        return {
            joinIsHidden: true,
            allCourses: '',
            userData: '',
            userCourses: '',
            filteredCourses: ''
        }
    },
    async created() {
        await this.getAllCourses()
        await this.getUserInfo()
        await this.getUserCoursesInfo()
        this.filteredCourses = await this.filterJoinableCourses(this.allCourses, this.userCourses);
    },
    methods: {
        joinCourse: async function(){
            var checkedBoxes = document.getElementsByName("coursesJoin")
            var selectedIds = []
            for(var box = 0; box< checkedBoxes.length; box++){
                if(checkedBoxes[box].checked){
                    selectedIds.push(checkedBoxes[box].value)
                }
            }
            this.addToApprovalList( this.userCourses, selectedIds);
        },
        filterJoinableCourses : function (allCoursesData,userCourseInfo ){
            var filteredCourses = []
            for(var i = 0; i< allCoursesData.length; i++){
                for(var k = 0; k< userCourseInfo.length; k++){
                    if(allCoursesData[i]._id == userCourseInfo[k]._id){
                        filteredCourses.push(allCoursesData[i])
                    }
                }
            }
            filteredCourses = allCoursesData.filter( function(el){
                return filteredCourses.indexOf(el) <0;
            })
            return filteredCourses
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
        getUserCoursesInfo: async function (){
            await fetch('http://localhost:7000/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    // credentials: 'include',
                    body: JSON.stringify({query: `query {  courseByIds ( _ids: ${JSON.stringify(this.userData.coursesId)}){ _id courseName }   }`})
                })
                .then( result => result.json())
                .then((data) => {

                this.userCourses = (data.data.courseByIds)
                return JSON.stringify(data.data.courseByIds)
                }).catch(error => {
                console.error('Error:', error);
                });
        },
        addToApprovalList : async function(userCourseInfo,selectedCourses ){
            var updatedUserCoursesId = []
            for(var k = 0; k<selectedCourses.length; k++ ){
                await updatedUserCoursesId.push(selectedCourses[k])
            }
            var userCookieID = decodeURIComponent( this.getCookie('UserID')).replace('j:','').replaceAll('"','')
            var approvalListNotification = 0 
            for(var j = 0; j < updatedUserCoursesId.length; j++){
                var courseWaitingList = []
                    await fetch('http://localhost:7000/graphql', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                        // credentials: 'include',
                        body: JSON.stringify({query: `query {
                                courseById(_id:${JSON.stringify(updatedUserCoursesId[j])}){
                                courseName
                                waitingList
                            }
                        }`})
                    })
                    .then( result => result.json())
                    .then((data) => {                            
                            for (var i = 0;i < data.data.courseById.waitingList.length; i++){
                                courseWaitingList.push(data.data.courseById.waitingList[i])
                            }
                
                        console.log(courseWaitingList)
                    return JSON.stringify(data.data.courseById.waitingList)
                    }).catch(error => {
                        console.error('Error:', error);
                    });
                console.log(courseWaitingList)

                // var opposite = !(courseWaitingList.includes(userCookieID))
                // console.log(opposite)
                if(!(courseWaitingList.includes(userCookieID))){
                    await courseWaitingList.push(userCookieID)
                    await fetch('http://localhost:7000/graphql', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                            },
                            // credentials: 'include',
                            body: JSON.stringify({query: `mutation{
                            courseUpdateOne(filter:{_id:${JSON.stringify(updatedUserCoursesId[j])}}record:{waitingList:${JSON.stringify(courseWaitingList)}}){
                                record{
                                    waitingList
                                }
                            }
                            }`})
                        })
                        .then( result => result.json())
                        .then((data) => {
                        // this.userCourses = (data.data)
                        return JSON.stringify(data.data)
                        }).catch(error => {
                            console.error('Error:', error);
                        });
                } else {
                    approvalListNotification += 1
                }
            }
            await alert(`You've been added on the approval list. You currently on the approval list of ${approvalListNotification} courses`)
        }
    },
}
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
        padding: 10px

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
    .joincourse ul{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .joincourse li{
        font: normal normal normal 18px Montserrat;
        letter-spacing: 0px;
        color: #F8F8F8;
        opacity: 1;
    }
    .quiz-question input[type = "checkbox"]{
        background-color: #ddd;

        cursor: pointer;
        display: inline-block;
        height: 15px;
        margin-right: 15px;
        position: relative;
        width: 15px;
        /* -webkit-appearance: none; */
    }
    .quiz-question button {
    font: normal normal normal 18px/35px Montserrat;
    letter-spacing: 0px;
    color: #000000;
    background-color: lightgreen;
    opacity: 1;
    cursor: pointer;
    display: inline-block;
    margin-right: 15px;
    margin-top: 10px;
    padding: 5px 25px;
    position: relative;
    border: 0;
    border-radius: 8px;

    }
</style>