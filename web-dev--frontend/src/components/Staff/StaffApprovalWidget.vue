<template>
        <div class="dashboard-cards-cont">
            <div class="dashboard-grades-cont">
                <div class="dashboard-calendar-head">
                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="36" viewBox="0 0 45 36">
                <path id="Icon_awesome-user-check" data-name="Icon awesome-user-check" d="M15.75,18a9,9,0,1,0-9-9A9,9,0,0,0,15.75,18Zm6.3,2.25H20.876a12.24,12.24,0,0,1-10.252,0H9.45A9.452,9.452,0,0,0,0,29.7v2.925A3.376,3.376,0,0,0,3.375,36h24.75A3.376,3.376,0,0,0,31.5,32.625V29.7A9.452,9.452,0,0,0,22.05,20.25Zm22.711-9.028L42.806,9.246a.834.834,0,0,0-1.181-.007l-7.369,7.313-3.2-3.22a.834.834,0,0,0-1.181-.007L27.9,15.286a.834.834,0,0,0-.007,1.181l5.745,5.787a.834.834,0,0,0,1.181.007L44.754,12.4a.84.84,0,0,0,.007-1.181Z"/>
                </svg>
                    Student Approvals
                </div>
                <ul class = "dash-calendar-items" >
                    <li >
                        <div class = "dash-calendar-element">

                            <div class="dash-calendar-nameHead">
                                Name
                            </div>
                            <div class="dash-calendar-gradeHead">
                                Role
                            </div>
                            <div class="dash-approveStudentHead">
                                Approvals
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
                                <input type="button" value="Approve" :name ="item._id" @click="approveStudent(item._id)"> 
                                <input type="button" class = "denyStudent" value="Deny" :name ="item._id" @click="rejectStudent(item._id)">
                            </div>
                        </div>
                    </li>                    
                    <li v-if="students.length == 0"> 
                        <div class = "dash-calendar-element">
                            <div class="dash-calendar-name">
                               No pending approvals
                            </div>
                        </div>
                    </li>
                </ul>
            </div>            
        </div>

</template>


<script>
export default {
    name: "ApprovalWidget",
    data() {
        return {
            courseId: '',
            waitingListIds: '',
            allCourses: '',
            students: '',
            waitingListIdsNonJSON: '',
            studentListIdsNonJSON: ''
        }
    },
    async created() {
        await this.getAllCourses()
        await this.findCourseId()
        await this.getStudentApprovals()
        await this.getStudentsById()
        // await console.log(this.students)
    },
    methods: {
        getStudentApprovals: async function(){
            await fetch('http://localhost:7000/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                // credentials: 'include',
                body: JSON.stringify({query: `query {
                    courseById(_id: "${ this.courseId }"){
                    courseName
                    waitingList
                    studentList
                    }
                }`})
            })
            .then( result => result.json())
            .then((data) => {
                // console.log(data.data.courseById.waitingList)
            this.waitingListIds = JSON.stringify(data.data.courseById.waitingList)
            this.waitingListIdsNonJSON = data.data.courseById.waitingList
            this.studentListIdsNonJSON = data.data.courseById.studentList
            // console.log(data.data.courseById.waitingList)
            return data.data.courseById.waitingList
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
        findCourseId: function(){
            for(var i = 0; i < this.allCourses.length; i++){
                if(this.allCourses[i].courseName == this.$route.params.courseName){
                    this.courseId = this.allCourses[i]._id
                }
            }
        },
        getStudentsById: async function(){
            await fetch('http://localhost:7000/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                // credentials: 'include',
                body: JSON.stringify({query: `query {
                userByIds(_ids: ${this.waitingListIds}){
                    _id
                    role
                    firstName
                    lastName
                    email
                    coursesId
                }
                }`})
            })
            .then( result => result.json())
            .then((data) => {
            this.students = (data.data.userByIds)
            return data.data.userByIds
            }).catch(error => {
                console.error('Error:', error);
            });
        },

        approveStudent: async function(studentId){
            // var updatedCurrentList = []
            var updatedWaitingList = []
            console.log(this.waitingListIdsNonJSON)
            console.log(studentId)

            for(var i = 0; i<this.waitingListIdsNonJSON.length; i++){
                    console.log(this.waitingListIdsNonJSON[i])
                if(this.waitingListIdsNonJSON[i] != studentId){
                    await updatedWaitingList.push(this.waitingListIdsNonJSON[i])
                }
            }
            console.log(updatedWaitingList)



            await this.updateCourseList(updatedWaitingList, studentId)
            await this.updateStudentsCourses(studentId)
            await this.getStudentApprovals()
            await this.getStudentsById() 
        },
        updateCourseList: async function(updatedWaitingList, studentId){
            this.studentListIdsNonJSON.push(studentId)
            console.log(JSON.stringify(updatedWaitingList))
            console.log(JSON.stringify(this.courseId))
            await fetch('http://localhost:7000/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    // credentials: 'include',
                    body: JSON.stringify({query: `mutation{
                    courseUpdateOne(filter:{_id:${JSON.stringify(this.courseId)}}record:{waitingList:${JSON.stringify(updatedWaitingList)}, studentList:${JSON.stringify(this.studentListIdsNonJSON)}}){
                        record{
                            waitingList
                            studentList
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
        },
        updateStudentsCourses: async function(studentId){
            console.log(studentId)
            var studentsUpdatedCourses = [] 
            for(var i = 0; i< this.students.length; i++ ){
                if(this.students[i]._id == studentId){
                    studentsUpdatedCourses = this.students[i].coursesId
                    studentsUpdatedCourses.push(this.courseId)
                    await fetch('http://localhost:7000/graphql', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                            },
                            // credentials: 'include',
                            body: JSON.stringify({query: `mutation{
                            userUpdateOne(filter:{_id:${JSON.stringify(studentId)}}record:{coursesId:${JSON.stringify(studentsUpdatedCourses)}}){
                                record{
                                    coursesId
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
                }
            }
        },
        rejectStudent: async function(studentId){
            var updatedWaitingList = []
            for(var i = 0; i<this.waitingListIdsNonJSON.length; i++){
                if(this.waitingListIdsNonJSON[i] != studentId){
                    await updatedWaitingList.push(this.waitingListIdsNonJSON[i])
                } 
            }
            console.log(updatedWaitingList)
            await fetch('http://localhost:7000/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                // credentials: 'include',
                body: JSON.stringify({query: `mutation{
                courseUpdateOne(filter:{_id:${JSON.stringify(this.courseId)}}record:{waitingList:${JSON.stringify(updatedWaitingList)}}){
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
            await this.getStudentApprovals()
            await this.getStudentsById() 
        },
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
        margin-left: 25px;
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
        margin-left: 50px;
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
        margin-top: 50px;

    }
    .dashboard-grades-cont{
        margin: 5px 75px 75px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        min-width: 512px;
        /* min-height: 600px; */
        height: 450px;
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
    .dash-calendar-day{
        width: 60px;
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
        margin-left: 20px;
        width: 300px;
    }
    .dash-calendar-name-last{
        text-align: right;
        font: normal normal bold 22px/27px Montserrat;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
        float:left; 
        margin-top: 15px;
        margin-left: 20px;
        width: 300px;
        margin-bottom: 5px;
    }
    .dash-calendar-dueDate{
        text-align: left;
        font: normal normal normal 22px Montserrat;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
        margin-top: 5px;
        width: 60px;
        margin-right: 25px;
    }
    .dash-calendar-dueDateCont{
        margin: 0px 15px 0px 15px;
        float:left; 
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
        width: 300px;
    }
    .dash-calendar-gradeHead{
        text-align: left;
        font: normal normal bold 22px/27px Montserrat;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
        float:left; 
        margin-top: 30px;
        margin-left: 30px;
        width: 200px;
    }
    .dash-calendar-grade{
        text-align: left;
        font: normal normal normal 25px/30px Montserrat;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
        float:left; 
        margin-top: 15px;
        margin-left: 25px
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