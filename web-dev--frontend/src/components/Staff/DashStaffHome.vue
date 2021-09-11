<template>
    <div class="dashboard-cards-cont">
        <div class="dashboard-calendar-cont">
            <div class="dashboard-calendar-head">
                <svg xmlns="http://www.w3.org/2000/svg" width="35.896" height="39.551" viewBox="0 0 35.896 39.551">
<g id="Icon_feather-calendar" data-name="Icon feather-calendar" transform="translate(1.5 1.5)">
<path id="Path_5" data-name="Path 5" d="M8.155,6H33.741A3.655,3.655,0,0,1,37.4,9.655V35.241A3.655,3.655,0,0,1,33.741,38.9H8.155A3.655,3.655,0,0,1,4.5,35.241V9.655A3.655,3.655,0,0,1,8.155,6Z" transform="translate(-4.5 -2.345)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
<path id="Path_6" data-name="Path 6" d="M24,3v7.31" transform="translate(-0.242 -3)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
<path id="Path_7" data-name="Path 7" d="M12,3v7.31" transform="translate(-2.862 -3)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
<path id="Path_8" data-name="Path 8" d="M4.5,15H37.4" transform="translate(-4.5 -0.38)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
</g>
                </svg>
                Calendar
            </div>
            <ul class = "dash-calendar-items" >
                <li v-for="item in calendarItems" :key="item.assignmentName">
                    <div class = "dash-calendar-element">
                        <div class = "dash-calendar-dateCont">
                            <div class="dash-calendar-day">{{item.dueDate}}</div>
                            <div class="dash-calendar-month">{{item.dueMonth}}</div>
                        </div>
                        <div class="dash-calendar-name">
                            {{item.assignmentName}}
                        </div>
                    </div>
                </li>
                <li v-if="calendarItems.length == 0">
                    <div class = "dash-calendar-element">
                        <div class = "dash-calendar-dateCont">
                            <div class="dash-calendar-day">00</div>
                            <div class="dash-calendar-month">Yay!</div>
                        </div>
                        <div class="dash-calendar-name">
                            Woohoo! There are no more items.
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class = "dashboard-course-cont">
            <ul class = "dashboard-course-card"> 
                <li v-for="courses in allCourses" :key="courses.courseName" style= "text-decoration: none">
                        <router-link :to="{ name: 'ManageCourse', params: { courseName: courses.courseName }}" style="text-decoration:none">   
                    <div class="dashboard-course-full">
                        <div class = "dashboard-course-head">
                            <svg xmlns="http://www.w3.org/2000/svg" width="46.91" height="58.637" viewBox="0 0 46.91 58.637">
<path id="Icon_material-class" data-name="Icon material-class" d="M47.046,3H11.864A5.881,5.881,0,0,0,6,8.864v46.91a5.881,5.881,0,0,0,5.864,5.864H47.046a5.881,5.881,0,0,0,5.864-5.864V8.864A5.881,5.881,0,0,0,47.046,3ZM11.864,8.864H26.523V32.319l-7.33-4.4-7.33,4.4Z" transform="translate(-6 -3)"/>
                            </svg>
                            <h1> {{courses.courseName}} </h1>
                            </div>

                            <div class="dashboard-course-grade">{{courses.tutor}}</div>
                            <div class="dashboard-course-recent-update">Recent Updates</div>
                            <div class="dashboard-course-update-info">{{courses.annoucement}}</div>
                    </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'DashStaffHome',
    data() {
        return {
            allCourses: '',
            calendarItems:''
        }
    },
    async created() {
        await this.getAllCourses()
        this.getCalendarItems()
        
    },
    methods: {
        getCalendarItems: async function(){
            await fetch('http://localhost:7000/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    // credentials: 'include',
                    body: JSON.stringify({query: `query{
                calendarMany{
                    assignmentName
                    dueDate
                    dueMonth
                    courseId 
                    }
                }`})
                })
                .then( result => result.json())
                .then((data) =>{
                    this.calendarItems = (data.data.calendarMany)
                    return data.data.calendarMany
                }).catch(error => {
                    console.error('Error:', error);
                });
        },
        getAllCourses: async function (){
            await fetch('http://localhost:7000/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                // credentials: 'include',
                body: JSON.stringify({query: `{  courseMany { _id courseName tutor annoucement }  }`})
            })
            .then( result => result.json())
            .then((data) => {
            this.allCourses = data.data.courseMany
            return data.data.courseMany
            }).catch(error => {
            console.error('Error:', error);
            });
        }

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
        margin: 25px 75px;
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
        display: inline-block;
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
        text-decoration: none;
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
        text-decoration: none;
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