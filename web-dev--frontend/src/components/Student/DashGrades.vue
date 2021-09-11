<template>
        <div class="dashboard-cards-cont">
            <div class="dashboard-grades-cont" v-for="courses in userCourses" :key="courses.courseName">
                <div class="dashboard-calendar-head">
<svg xmlns="http://www.w3.org/2000/svg" width="25.969" height="38" viewBox="0 0 25.969 38">
  <path id="Icon_material-class" data-name="Icon material-class" d="M28.723,3H9.246A3.567,3.567,0,0,0,6,6.8V37.2A3.567,3.567,0,0,0,9.246,41H28.723a3.567,3.567,0,0,0,3.246-3.8V6.8A3.567,3.567,0,0,0,28.723,3ZM9.246,6.8h8.115V22L13.3,19.15,9.246,22Z" transform="translate(-6 -3)"/>
</svg>

                    {{courses.courseName}}  
                    <!-- {{courses._id}}  -->
                </div>
                <ul class = "dash-calendar-items" >
                    <li >
                        <div class = "dash-calendar-element">
                            <div class = "dash-calendar-dueDateCont">
                                <!-- <div class="dash-calendar-dueDate">Due Date</div> -->
                            </div>
                            <div class="dash-calendar-nameHead">
                                Name
                            </div>
                            <div class="dash-calendar-gradeHead">
                                Grade
                            </div>
                        </div>
                    </li>
                    <li v-for="items in findAssesmentsCourse(courses._id)" v-bind:key='items.gradeName'>
                        <div class = "dash-calendar-element" >
                            <div class = "dash-calendar-dateCont">
                                <!-- <div class="dash-calendar-day">{{ items.dueDate}}</div>
                                <div class="dash-calendar-month">{{ items.dueMonth }}</div> -->
                            </div>
                            <div class="dash-calendar-name">
                                {{ items.gradeName }} 
                            </div>
                            <div class="dash-calendar-grade">
                                 {{ items.score }}% 
                            </div>
                        </div>
                    </li>
                    <li v-if="findAssesmentsCourse(courses._id) == ''">
                        <div class = "dash-calendar-element">
                            <div class = "dash-calendar-dateCont">
                                <!-- <div class="dash-calendar-day">4</div>
                                <div class="dash-calendar-month">Feb</div> -->
                            </div>
                            <div class="dash-calendar-name">
                                You have not attempted any quizes for this course
                            </div>
                            <div class="dash-calendar-grade">
                                XXX
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class = "dash-calendar-element">
                            <div class = "dash-calendar-dateCont">
                                <div class="dash-calendar-day">--</div>
                            </div>
                            <div class="dash-calendar-name-last">
                                Course Total:
                            </div>
                            <div class="dash-calendar-grade">
                              {{ courseTotal(courses._id).grade }}
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="dash-progressbar-cont">
                <div class="progressbar-label">
                    Progress
                </div>
                <div class="dash-progressbar-grey">
                <div class="dash-progressbar-cont dash-progressbar-green dash-progressbar-center progressbar-label" :style="getProgress(courses._id).style">{{ getProgress(courses._id).grade }}</div> <!-- {{ courseTotal(courses._id).grade }} --> 
                </div><br>

                <div class="progressbar-label">
                    Knowledge
                </div>
                <div class="dash-progressbar-grey">
                <div class="dash-progressbar-cont dash-progressbar-red dash-progressbar-center progressbar-label" :style="courseTotal(courses._id).style">{{ courseTotal(courses._id).grade }}</div>
                </div><br>
                </div>
            </div>          
              
        </div>
</template>
<script>
export default {
    name: 'dashGrades',
    data() {
        return {
            userCourses: '',
            userGradesInfo: '',
            allQuizes:''
            
        }
    },    
    async created() {
        await this.getUserInfo()
        await this.getUserCoursesInfo()
        await this.getAllQuizes()

    },
    methods: {
        getProgress : function(courseId){
            var courseQuizes = this.getCourseQuizes(courseId)
            var counter = 0;
            for(var i = 0; i<courseQuizes.length; i++){
                for(var j = 0; j< this.userGradesInfo.grades.length; j++){
                    if(courseQuizes[i]._id == this.userGradesInfo.grades[j].coureId){
                        counter++
                    }
                }
            }
            var object = ''
            var avgKnowledge = 0
            if(courseQuizes.length != 0){
                if( counter <= courseQuizes.length ){
                    avgKnowledge = (counter/courseQuizes.length) * 100
                }
                else if( counter >= courseQuizes.length ){
                    avgKnowledge = 100
                }
                object = { style:"width: " + avgKnowledge + "%", grade: avgKnowledge + "%" }
            } else{
                object = { style:"width: " + 2 + "%", grade: 0 + "%" }
            }


             
            return object

        },
        getCourseQuizes: function(courseId){
            var courseQuizes =[]
            for(var i = 0; i<this.allQuizes.length; i++){
                if(this.allQuizes[i].courseId == courseId){
                    courseQuizes.push(this.allQuizes[i])
                }
            }
            return courseQuizes
        },
        getAllQuizes: async function(){
            await fetch('http://localhost:7000/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                // credentials: 'include',
                body: JSON.stringify({query: `query {
                        quizMany{
                            name
                            status
                            courseId

                        }
                    }`})
            })
            .then( result => result.json())
            .then((data) => {
                this.allQuizes = data.data.quizMany
                return data.data.quizMany
            }).catch(error => {
                console.error('Error:', error);
            });
                
        },
        findAssesmentsCourse : function(courseId){
            var allSpecific = []
            for( var inc in this.userGradesInfo.grades ){
                if(courseId == this.userGradesInfo.grades[inc].courseId) {
                    allSpecific.push ({gradeName: this.userGradesInfo.grades[inc].gradeName, dueDate: this.userGradesInfo.grades[inc].dueDate, dueMonth: this.userGradesInfo.grades[inc].dueMonth, score: this.userGradesInfo.grades[inc].score })
                }
                
            }
            return allSpecific
        },
        courseTotal : function(courseId){
            var object = ''
            var gradeAverage = 0
            var counter = 0
            for( var inc in this.userGradesInfo.grades ){
                if(courseId == this.userGradesInfo.grades[inc].courseId) {
                    counter += 1 
                    gradeAverage += this.userGradesInfo.grades[inc].score
                }
                
            }
            object = { style:"width: " + gradeAverage/counter + "%", grade: gradeAverage/counter + "%" }
            return object

        },
        getUserInfo: async function (){
            var userCookieID = decodeURIComponent( this.getCookie('UserID')).replace('j:','')
            await fetch('http://localhost:7000/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    // credentials: 'include',
                    body: JSON.stringify({query: `query {userById(_id: ${userCookieID}){role coursesId grades{courseId gradeName score }}}`})
                })
                .then( result => result.json())
                .then((data)=>{
                this.userGradesInfo = (data.data.userById)
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
                        body: JSON.stringify({query: `query {  courseByIds ( _ids: ${JSON.stringify(this.userGradesInfo.coursesId)}){ _id courseName tutor annoucement }   }`})
                    })
                    .then( result => result.json())
                    .then((data) =>{

                    this.userCourses = (data.data.courseByIds)
                    return data.data.courseByIds
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
        min-height: 600px;
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