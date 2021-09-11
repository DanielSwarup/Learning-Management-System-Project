<template>
        <div class="dashboard-cards-cont">
            <div class="dashboard-grades-cont">
                <div class="dashboard-calendar-head">
                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="36" viewBox="0 0 45 36">
                <path id="Icon_awesome-user-check" data-name="Icon awesome-user-check" d="M15.75,18a9,9,0,1,0-9-9A9,9,0,0,0,15.75,18Zm6.3,2.25H20.876a12.24,12.24,0,0,1-10.252,0H9.45A9.452,9.452,0,0,0,0,29.7v2.925A3.376,3.376,0,0,0,3.375,36h24.75A3.376,3.376,0,0,0,31.5,32.625V29.7A9.452,9.452,0,0,0,22.05,20.25Zm22.711-9.028L42.806,9.246a.834.834,0,0,0-1.181-.007l-7.369,7.313-3.2-3.22a.834.834,0,0,0-1.181-.007L27.9,15.286a.834.834,0,0,0-.007,1.181l5.745,5.787a.834.834,0,0,0,1.181.007L44.754,12.4a.84.84,0,0,0,.007-1.181Z"/>
                </svg>
                    Enrol Students
                </div>
                <ul class = "dash-calendar-items" >
                    <li >
                        <div class = "dash-calendar-element">

                            <div class="dash-calendar-nameHead">
                                Name
                            </div>
                            <div class="dash-calendar-gradeHead">
                                Current Status
                            </div>
                            <div class="dash-approveStudentHead">
                                Enrol
                            </div>
                        </div>
                    </li>
                    <li v-for="item in students" :key="item.firstName">
                        <div class = "dash-calendar-element">
                            <div class="dash-calendar-name">
                                {{item.firstName}} {{item.lastName}}
                            </div>
                            <div class="dash-calendar-grade">
                                {{ item.role}}
                            </div>
                            <div class="dash-approveStudent">
                                <input v-if="item.role != 'Enrolled'" type="button" value="Enrol" :name ="item._id" @click="enrolStudent(item)"> 
                                <input v-else type="button" class = "denyStudent" value="Remove Student" :name ="item._id" @click="unenrolStudent(item)">
                            </div>
                        </div>
                    </li>                    
                    <li v-if="users.length == 0"> 
                        <div class = "dash-calendar-element">
                            <div class="dash-calendar-name">
                               No Students
                            </div>
                        </div>
                    </li>
                </ul>
            </div>            
        </div>

</template>


<script>
export default {
    name: "EnrolList",
    data() {
        return {
            courseId: '',
            waitingListIds: '',
            allCourses: '',
            students: [],
            waitingListIdsNonJSON: '',
            studentListIdsNonJSON: '',
            users: ''
        }
    },
    async created() {
        await this.getAllCourses()
        await this.findCourseId()
        await this.getAllUsers()
        await this.filterUsers()
        await this.filterEnroledStudents()
    },
    methods: {
        filterUsers: function(){
            for(var i = 0; i < this.users.length; i++){
                if(this.users[i].role == "Student"){
                    this.students.push(this.users[i])
                }
            }

        },
        findCourseId: function(){
            for(var i = 0; i < this.allCourses.length; i++){
                if(this.allCourses[i].courseName == this.$route.params.courseName){
                    this.courseId = this.allCourses[i]._id
                }
            }
        },
        filterEnroledStudents : async function(){
            for(var i = 0; i < this.students.length; i++){
                for(var k = 0; k<this.students[i].coursesId.length; k++){
                    if(this.students[i].coursesId[k] == this.courseId){
                        this.students[i].role = "Enrolled"
                    }
                }
            }
            for(var j = 0; j < this.students.length; j++){
                if(this.students[j].role != "Enrolled"){
                    this.students[j].role = "Not Enrolled"
                }
            }
            this.students.sort((a,b) => (a.role < b.role) ? 1 : ((b.role < a.role) ? -1 : 0))

        },
        getAllUsers: async function(){
            await fetch('http://localhost:7000/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                // credentials: 'include',
                body: JSON.stringify({query: `query{
                    userMany{
                        _id
                        firstName
                        lastName
                        role
                        coursesId
                    }
                }`})
            })
            .then( result => result.json())
            .then((data) => {
                this.users = data.data.userMany
                this.users.sort((a,b) => (b.role > a.role) ? 1 : ((a.role > b.role) ? -1 : 0))

                return data.data.userMany
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
        enrolStudent: async function(user){
            user.coursesId.push(this.courseId)
            await fetch('http://localhost:7000/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                // credentials: 'include',
                body: JSON.stringify({query: `mutation{
                userUpdateOne(filter:{_id:${JSON.stringify(user._id)}} record:{coursesId: ${JSON.stringify(user.coursesId)}  }){
                    record{
                        firstName
                        lastName
                        coursesId
                    }
                }
            }`})
            })
            .then( result => result.json())
            .then((data) => {
                // console.log(data)
                alert(`You've enrolled ${data.data.userUpdateOne.record.firstName} ${data.data.userUpdateOne.record.lastName} to ${this.$route.params.courseName}`)
            return data.data.userUpdateOne
            }).catch(error => {
                console.error('Error:', error);
            });
            await location.reload();

        },
        unenrolStudent: async function(user){
            console.log(user.coursesId)
            console.log(this.courseId)
            var updatedCoursesId = []
            for(var i = 0; i<user.coursesId.length; i++){
                if(user.coursesId[i] != this.courseId){
                    updatedCoursesId.push(user.coursesId[i])
                }
            }
            user.coursesId = updatedCoursesId
            await this.unenrolGraphQL(user)
        },
        unenrolGraphQL: async function(user){
            fetch('http://localhost:7000/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                // credentials: 'include',
                body: JSON.stringify({query: `mutation{
                userUpdateOne(filter:{_id:${JSON.stringify(user._id)}} record:{coursesId: ${JSON.stringify(user.coursesId)}  }){
                    record{
                        firstName
                        lastName
                        coursesId
                    }
                }
            }`})
            })
            .then( result => result.json())
            .then((data) => {
                // console.log(data)
                alert(`You've removed ${data.data.userUpdateOne.record.firstName} ${data.data.userUpdateOne.record.lastName} to ${this.$route.params.courseName}`)
            return data.data.userUpdateOne
            }).catch(error => {
                console.error('Error:', error);
            });
            await location.reload();

        }
    },
}
</script>

<style scoped>
    .dash-approveStudentHead{
        text-align: left;
        font: normal normal bold 22px/27px Montserrat;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
        float:left; 
        margin-top: 30px;
        margin-left: 0px;
        margin-right: 25px;
        width: auto;
    }
    .dash-approveStudent{
        text-align: left;
        font: normal normal normal 22px/27px Montserrat;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
        float:left; 
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 100px;
        min-width: 100px;
    }
    .dash-approveStudent input[type = "button"]{
        font: normal normal normal 18px/35px Montserrat;
        letter-spacing: 0px;
        color: #000000;
        background-color: lightgreen;
        opacity: 1;
        cursor: pointer;
        display: inline-block;
        margin-right: 15px;
        margin-top: 0px;
        padding: 5px 25px;
        position: relative;
        border: 0;
        border-radius: 8px;
    }
    .denyStudent{
        background-color: #f44336 !important;
    }
    .approval-widgetCont{
        margin: 15px 75px;
        float: left;
        margin-top: 27px;

    }
    .dash-progressbar-cont{
        padding:0.01em 16px;
    }
    .dash-progressbar-grey{
        color:#000;
        background-color:#f1f1f1
    }
    .dash-progressbar-green{
        color:#fff !important;
        background-color:#4CAF50
    }
    .dash-progressbar-red{
        color:#fff !important;
        background-color:#f44336
    }
    .dash-progressbar-blue{
        color:#fff !important;
        background-color:#2196F3
    }
    .dash-progressbar-center{
        width:auto;
        text-align:center!important
    }
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
        float: left;
        margin-top: 10px;
        margin-left: 75px;

    }
    .dashboard-grades-cont{
        margin: 20px 25px 50px 0px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        min-width: 1200px;
        min-height: 700px;
        height: 700px;
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
        width: 60px;
        margin: 0px 15px 0px 25px;
        float:left; 

    }
    .dash-calendar-name{
        text-align: left;
        font: normal normal normal 22px/27px Montserrat;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
        float:left; 
        margin-top: 15px;
        margin-left: 20px;
        width: 500px;
    }
    .dash-calendar-nameHead{
        text-align: left;
        font: normal normal bold 22px/27px Montserrat;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
        float:left; 
        margin-top: 30px;
        margin-left: 20px;
        width: 470px;
    }
    .dash-calendar-gradeHead{
        text-align: left;
        font: normal normal bold 22px/27px Montserrat;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
        float:left; 
        margin-top: 30px;
        margin-left: 35px;
        width: 400px;
    }
    .dash-calendar-grade{
        text-align: left;
        font: normal normal normal 25px/30px Montserrat;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
        float:left; 
        margin-top: 15px;
        margin-left: 25px;
        width: 240px;
    }
    .progressbar-label{
        text-align: left;
        font: normal normal bold 25px/30px Montserrat;
        letter-spacing: 0px;
        color: #010101;
        opacity: 1;
    }
    .w3-container-spacer{
        margin-bottom: 10px;
    }
</style>