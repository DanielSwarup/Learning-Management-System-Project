<template>
    <div class= "dash-quiz">
        <div class="quiz-head-cont">
            Quiz
        </div>
        <div class="quiz-cont">
            <div class="quiz-content">
                <div class="quiz-name">
                    Chicken Quiz
                </div>
                <div class="quiz-sub-name">
                    All the best fam
                </div>
                <div class="quiz-questions-cont">
                    <div class="quiz-items">
                        <ul>
                            <div v-for="item in quizQuestions.questions" :key="item.question">

                                <li v-if="item.questionType == 'FIB'" >
                                    <div class = "quiz-question">
                                        {{item.question}}
                                        <input type="text" placeholder="Your Answer Here" :id="item._id">
                                    </div>

                                </li>
                            <li v-if="item.questionType == 'MCQ' || item.questionType == 'BOL' ">
                                <div class = "quiz-question">
                                    {{item.question}}
                                    <div v-for="option in mixAllOptions(item)" :key="option.options">
                                        <input type="radio" :id="item._id" :name="item._id" :value="option.option">
                                        <label :for="item.question">{{ option.option }}</label><br>
                                    </div>
                                </div>
                            </li>
                            <!-- <li v-if="item.questionType == 'BOL'">
                                <div class = "quiz-question">
                                    {{item.question}}
                                    <div v-for="option in mixAllOptions(item)" :key="option.options">
                                        <input type="radio" :id="item._id" :name="item._id" :value="option.option">
                                        <label :for="item.question">{{ option.option }}</label><br>
                                    </div>
                                </div>
                            </li> -->
                            <!-- <li v-if="item.questionType == 'BOL'">
                                <div class = "quiz-question">
                                    {{item.question}}
                                    <div >
                                        <input type="radio" :id="item._id" :name="item.question" value = "true">
                                        <label for="q1">True</label><br>
                                        <input type="radio" :id="item._id" :name="item.question" value = "false">
                                        <label for="q1">False</label><br>
                                    </div>
                                </div>
                            </li> -->
                            <!-- <li v-if="item.questionType == 'MCQ' && item.answer">
                                <div class = "quiz-question">
                                    {{item.question}}
                                    <div >
                                    <input type="checkbox" id="q33" name="q2" >
                                    <label for="q33">Why Not?</label><br>
                                    <input type="checkbox" id="q34" name="q2" >
                                    <label for="q34">Que Ota?</label><br>
                                    </div>
                                </div>
                            </li> -->
                            <!-- <li>
                                <div class = "quiz-question">
                                    4. Why did the ____ cross the road?
                                    <form >
                                        <select id="answer" name="answer">
                                            <option value="select" selected disabled>Select an answer</option>
                                            <option value="answer1">answer1</option>
                                            <option value="answer2">answer2</option>
                                            <option value="answer3">answer3</option>
                                            <option value="answer4">answer4</option>
                                        </select>
                                    </form> 
                                </div>
                            </li> -->
                            </div>

                            <li>
                                <div class = "quiz-question">
                                    Submit Quiz:
                                    <input type ="submit" @click="handleScore()">
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'Quiz',
    async created() {
        await this.getAllCourses(),
        await this.findCourseId(),
        await this.getAllQuizes(),
        await this.getCourseQuizes(),
        await this.getThisQuiz()
        await this.getAllUserGrades()

    },
    data() {
        return {
            courseId: '',
            allCourses: '',
            allQuizes:[],
            courseQuizes:[],
            quizQuestions:'',
            score:'',
            userData:''
        }
    },
    methods: {
        handleScore: async function(){
            await this.scoreGrade()
            await this.updateUser()
            await alert("Quiz Submitted Check Under the grades tab to see your score")
            await location.replace(`/course/${this.$route.params.courseName}`)
        },
        scoreGrade: function(){
            this.score = 0
            for(var i = 0; i<this.quizQuestions.questions.length;i++){
                if(this.quizQuestions.questions[i].questionType == 'MCQ' || this.quizQuestions.questions[i].questionType == 'BOL'){
                    var element = document.getElementsByName(this.quizQuestions.questions[i]._id)
                    for(var j = 0; j<element.length;j++){
                        if(element[j].checked && element[j].value== this.quizQuestions.questions[i].answer){
                            this.score ++
                            break
                        }else if (element[j].checked && element[j].value != this.quizQuestions.questions[i].answer){
                            element[j].style.color = "red"
                            break
                        }
                    }
                } else if (this.quizQuestions.questions[i].questionType == 'FIB'){
                    var fib = document.getElementById(this.quizQuestions.questions[i]._id).value.toLowerCase()
                    if(fib == this.quizQuestions.questions[i].answer.toLowerCase()){
                        this.score ++
                    }
                }
            }
            this.score = Math.floor((this.score/this.quizQuestions.questions.length)*100)
        },
        updateUser: async function(){
            var userCookieID = decodeURIComponent( this.getCookie('UserID')).replace('j:','')
            var updatedQuiz = this.userData
            updatedQuiz.push({courseId: this.courseId, _id: this.quizQuestions._id, score: this.score, gradeName: this.quizQuestions.name })
            updatedQuiz = JSON.stringify(updatedQuiz)
            updatedQuiz = updatedQuiz.replace(/"(\w+)"\s*:/g, '$1:')    


            await fetch('http://localhost:7000/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    // credentials: 'include',
                    body: JSON.stringify({query: `mutation {
                        userUpdateById(_id: ${userCookieID} record:{grades:${updatedQuiz}}){ 
                            record{
                                grades{
                                    score
                                    gradeName
                                    _id
                                    courseId
                                }
                            }
                        }
                    }`})
                })
                .then( result => result.json())
                .then((data) => {
                    // this.userData = (data.data.userUpdateById)
                    return data.data.userUpdateById
                }).catch(error => {
                console.error('Error:', error);
                });
        },
        getAllUserGrades: async function(){
            var userCookieID = decodeURIComponent( this.getCookie('UserID')).replace('j:','')
            await fetch('http://localhost:7000/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    // credentials: 'include',
                    body: JSON.stringify({query: `query {userById(_id: ${userCookieID}){ grades{
                        score
                        gradeName
                        _id
                        courseId
                    }}}`})
                })
                .then( result => result.json())
                .then((data) => {
                    this.userData = (data.data.userById.grades)
                    return data.data.userById.grades
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
        mixAllOptions: function(item){
            var options = []
            for(var i = 0; i<item.wrongAnswers.length;i++){
                options.push({option: item.wrongAnswers[i], id: item._id})
            }
            var answerLocation = (Math.floor(Math.random()*item.wrongAnswers.length))
            options.splice(answerLocation, 0,{ id: item._id, option:item.answer})

            return options
        },
        getThisQuiz : async function(){
            for(var i = 0; i<this.courseQuizes.length;i++){
                if(this.courseQuizes[i].name == this.$route.params.quiz){
                    this.quizQuestions = this.courseQuizes[i]
                }
            }
        },
        getCourseQuizes: async function(){
            for(var i = 0; i<this.allQuizes.length; i++){
                if(this.allQuizes[i].courseId == this.courseId){
                    this.courseQuizes.push(this.allQuizes[i])
                }
            }
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
                            questions{
                                _id
                                question
                                answer
                                wrongAnswers
                                questionType
                            }
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
    },
}
</script>

<style scoped>
    .dash-quiz{
        margin-left: 75px;

    }
    .quiz-head-cont{
        margin-top: 10px;
        text-align: left;
        font: normal normal 600 25px/30px Montserrat;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
    }
    .quiz-cont{
        margin: 0px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        box-shadow: 2px 2px 2px #00000029;
        opacity: 1;
        width: 1527px;
        height: auto; /*change to auto*/
        margin-bottom: 50px;
    }
    .quiz-content{
        margin: 50px;
    }
    .quiz-name{
        text-align: left;
        font: normal normal 600 35px/43px Montserrat;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
    }
    .quiz-sub-name{
        margin: 5px 0px 15px;
        text-align: left;
        font: normal normal 600 26px/37px Montserrat;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
    }
    .quiz-questions-cont{

    }
    .quiz-items li{
        width: 100%;
        height: 100%;
        margin-bottom: 20px;
        background: #F1F1F1 0% 0% no-repeat padding-box;
        box-shadow: 2px 2px 2px #00000029;
        border-radius: 3px;
        opacity: 1;
    }
    .quiz-question{
        margin: 25px 50px;
        text-align: left;
        font: normal normal 600 20px/35px Montserrat;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
    }
    .quiz-question input[type = "text"]{
        border: none;
        margin: 10px 0px;
        padding: 5px 25px;
        border-radius: 8px;
        width: 100%;
        text-align: left;
        font: normal normal normal 18px/35px Montserrat;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
    }
    .quiz-question label{
        margin-left: 5px;
        margin-top: 12px;
        text-align: left;
        font: normal normal normal 18px/35px Montserrat;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
    }
    .quiz-question input[type = "radio"]{
    background-color: #ddd;

    border-radius: 10px;

    cursor: pointer;
    display: inline-block;
    height: 15px;
    margin-right: 15px;
    position: relative;
    width: 15px;
    /* -webkit-appearance: none; */
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
    .quiz-question select{
    font: normal normal normal 18px/35px Montserrat;
    letter-spacing: 0px;
    color: #000000;
    opacity: 1;
    cursor: pointer;
    display: inline-block;
    margin-right: 15px;
    margin-top: 10px;
    padding: 5px;
    position: relative;
    /* -webkit-appearance: none; */
    }
    .quiz-question input[type= "submit"] {
    font: normal normal normal 18px/35px Montserrat;
    letter-spacing: 0px;
    color: #000000;
    background-color: lightgreen;
    opacity: 1;
    cursor: pointer;
    display: inline-block;
    margin-right: 15px;
    margin-top: 10px;
    padding: 15px 25px;
    position: relative;
    border: 0;
    border-radius: 8px;
    }
</style>