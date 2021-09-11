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
                                        <input type="text" placeholder="Your Answer Here">
                                    </div>

                                </li>
                            <li v-if="item.questionType == 'MCQ'">
                                <div class = "quiz-question">
                                    {{item.question}}
                                    <div v-for="option in mixAllOptions(item)" :key="option.options">
                                        <input type="radio" :id="option.id" :name="item.question" :value="option.options">
                                        <label :for="item.question">{{ option.option }}</label><br>
                                    </div>
                                </div>
                            </li>
                            <li v-if="item.questionType == 'BOL'">
                                <div class = "quiz-question">
                                    {{item.question}}
                                    <div >
                                        <input type="radio" id="q1" :name="item.question" value = "true">
                                        <label for="q1">True</label><br>
                                        <input type="radio" id="q12" :name="item.question" value = "false">
                                        <label for="q1">False</label><br>
                                    </div>
                                </div>
                            </li>
                            </div>

                        </ul>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'StaffQuiz',
    async created() {
        await this.getAllCourses(),
        await this.findCourseId(),
        await this.getAllQuizes(),
        await this.getCourseQuizes(),
        await this.getThisQuiz()

    },
    data() {
        return {
            courseId: '',
            allCourses: '',
            allQuizes:[],
            courseQuizes:[],
            quizQuestions:''
        }
    },
    methods: {
        mixAllOptions: function(item){
            console.log(item)
            var options = []
            for(var i = 0; i<item.wrongAnswers.length;i++){
                options.push(item.wrongAnswers[i])
            }
            var answerLocation = (Math.floor(Math.random()*item.wrongAnswers.length))
            options.splice(answerLocation, 0, item.answer)
            
            var optionsId = []

            for(var k = 0; k<options.length; k++){
                optionsId.push({id: options[k]+k, option: options[k]})
            }



            console.log(optionsId)
            return optionsId
        },
        getThisQuiz : async function(){
            for(var i = 0; i<this.courseQuizes.length;i++){
                if(this.courseQuizes[i].name == this.$route.params.quiz){
                    this.quizQuestions = this.courseQuizes[i]
                }
            }
            console.log(this.quizQuestions.questions[1].answer)
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