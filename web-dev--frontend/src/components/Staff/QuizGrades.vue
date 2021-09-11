<template>
        <div class="dashboard-cards-cont">
            <div class="dashboard-grades-cont">
                <div class="dashboard-calendar-head">
<svg xmlns="http://www.w3.org/2000/svg" width="25.969" height="38" viewBox="0 0 25.969 38">
  <path id="Icon_material-class" data-name="Icon material-class" d="M28.723,3H9.246A3.567,3.567,0,0,0,6,6.8V37.2A3.567,3.567,0,0,0,9.246,41H28.723a3.567,3.567,0,0,0,3.246-3.8V6.8A3.567,3.567,0,0,0,28.723,3ZM9.246,6.8h8.115V22L13.3,19.15,9.246,22Z" transform="translate(-6 -3)"/>
</svg>

                    {{$route.params.quiz}} Individual Scores
                </div>
                <ul class = "dash-calendar-items" >
                    <li >
                        <div class = "dash-calendar-element">
                            <!-- <div class = "dash-calendar-dueDateCont">
                                <div class="dash-calendar-dueDate">Due Date</div>
                            </div> -->
                            <div class="dash-calendar-nameHead">
                                Student's Name
                            </div>
                            <div class="dash-calendar-gradeHead">
                                Student Grade
                            </div>
                        </div>
                    </li>
                    <li v-for="items in attemptedStudents" v-bind:key='items._id'> <!--   -->
                        <div class = "dash-calendar-element" >
                            <div class="dash-calendar-name">
                                {{ items.firstName }} {{ items.lastName }}
                            </div>
                            <div class="dash-calendar-grade" >

                                 {{ items.grade }}
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class = "dash-calendar-element">
                            <div class = "dash-calendar-dateCont">
                                <div class="dash-calendar-day">--</div>
                            </div>
                            <div class="dash-calendar-name-last">
                                --
                            </div>
                            <div class="dash-calendar-grade">
                              
                            </div>
                        </div>
                    </li>
                </ul>
            </div>          
              
        </div>
</template>

<script>
export default {
    name: 'QuizGrades',
    data() {
        return {
            allCourses: '',
            allUsers: '',
            allQuizes: '',
            courseId:'',
            courseStudentsIds: '',
            courseStudentsObject: [],
            attemptedStudents: []
        }
    },    
    async created() {
        await this.getAllCoursesInfo(),
        await this.getAllUsers(),
        await this.findCourseId(),
        await this.getAllQuizes(),
        await this.getSpecificStudents(),
        await this.studentsAttemptedQuiz()

    },
    methods: {
        studentsAttemptedQuiz : function(){
            for(var i = 0; i< this.courseStudentsObject.length; i++){
                for(var j = 0; j < this.courseStudentsObject[i].grades.length; j++){
                    if( this.courseStudentsObject[i].grades[j].gradeName == this.$route.params.quiz){
                        this.attemptedStudents.push({firstName: this.courseStudentsObject[i].firstName,lastName: this.courseStudentsObject[i].lastName, grade:  this.courseStudentsObject[i].grades[j].score + "%"  })
                    } else{
                        this.attemptedStudents.push({firstName: this.courseStudentsObject[i].firstName,lastName: this.courseStudentsObject[i].lastName, grade:  "Not Attempted"  })

                    }
                }
            }
        },
        getSpecificStudents : function(){
            for (var k = 0; k<this.allUsers.length; k++){
                for(var i = 0; i< this.courseStudentsIds.length; i++ ){
                    if( this.courseStudentsIds[i] == this.allUsers[k]._id){
                        this.courseStudentsObject.push(this.allUsers[k])
                    }
                }
            }
            console.log(this.courseStudentsObject)
        },
        findCourseId: function(){
            for(var i = 0; i < this.allCourses.length; i++){
                if(this.allCourses[i].courseName == this.$route.params.courseName){
                    this.courseId = this.allCourses[i]._id
                    this.courseStudentsIds = this.allCourses[i].studentList
                }
            }
        },
        getAllQuizes : async function(){
            await fetch('http://localhost:7000/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({query: `query{
                    quizMany{
                        name
                        courseId
                    }
                    }`})
                })
                .then( result => result.json())
                .then((data) =>{
                    this.allQuizes = (data.data.quizMany)
                    return data.data.quizMany
                }).catch(error => {
                console.error('Error:', error);
                });
        },
        getAllUsers : async function(){
            await fetch('http://localhost:7000/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({query: `query{
                    userMany{
                        firstName
                        lastName
                        _id
                        grades{
                            courseId
                            gradeName
                            score
                        }
                    }
                }`})
                })
                .then( result => result.json())
                .then((data) =>{
                    this.allUsers = (data.data.userMany)
                    return data.data.userMany
                }).catch(error => {
                    console.error('Error:', error);
                });
        },
        getAllCoursesInfo: async function (){
            await fetch('http://localhost:7000/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({query: `query {  courseMany { _id courseName tutor annoucement studentList }   }`})
                })
                .then( result => result.json())
                .then((data) =>{
                    this.allCourses = (data.data.courseMany)
                    return data.data.courseMany
                }).catch(error => {
                console.error('Error:', error);
                });
            }
    },
}
</script>

<style scoped>
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
    }
    .dashboard-grades-cont{
        margin: 5px 75px 75px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        width: 1512px;
        /* min-height: 600px; */
        height: auto;
        box-shadow: 0px 1px 2px #00000029;
        border: 1px solid #707070;
        border-radius: 2px;
        overflow: auto;
        float: left;
    }
    .dashboard-calendar-head {
        text-align: center;
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
        width: 1000px;
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
        width: 1000px;
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
        font: normal normal normal 22px/27px Montserrat;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
        float:left; 
        margin-top: 30px;
        margin-left: 10px;
        width: 1000px;
    }
    .dash-calendar-gradeHead{
        text-align: left;
        font: normal normal normal 22px/27px Montserrat;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
        float:left; 
        margin-top: 30px;
        margin-left: 10px
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