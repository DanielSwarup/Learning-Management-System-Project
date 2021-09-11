<template>
    <div class="course-cont">
        <div class = "course-current-grade-cont">
            <div class="course-current-grade">
                Current Grade: Failure%
            </div>
        </div>
        <div class="pins-cont">
            <div class="pins-head">
                Resources
            </div>
            <div class="pins-item">
                <ul>
                    <div v-for="item in courseResources" :key="item.name" style="float:left">
                        <a href="#">
                            <li @click="downloadResource(item.fileUrl)">
                                <div class="pin-item-title-cont">
                                    <div class = "pin-item-title">
                                    {{item.name}}
                                    </div>
                                </div>
                            </li>
                        </a>
                    </div>
                    <a href="">
                        <li v-if="courseResources == ''">
                            <div class="pin-item-title-cont">
                                <div class = "pin-item-title">
                                    No resources uploaded.
                                </div>
                                <div class="pin-item-info">
                                    Ask your Tutor to upload resources.
                                </div>
                            </div>
                        </li>
                    </a>
                </ul>
            </div>
        </div>
        <div class="pins-cont">
            <div class="pins-head">
                Quizes
            </div>
            <div class="pins-item">
                <ul>
                <div v-for="item in courseQuizes" :key="item.name" style="float:left">
                    <router-link :to="{ name: 'Quiz', params: { courseName: $route.params.name, quiz: item.name }}" style="text-decoration:none">
                            <li>
                                <div class="pin-item-title-cont">
                                    <div class = "pin-item-title">
                                    {{item.name}}
                                    </div>
                                    <div class = "pin-item-info">
                                    <b>Status:</b> {{item.status}}
                                    </div>
                                    <div class = "pin-item-date" v-if="item.status == 'SpecifiedRange'">
                                        <b>Date Range:</b> {{item.dateStart}} - {{item.dateEnd}}
                                    </div>
                                </div>
                            </li>
                        </router-link>
                    </div>
                    <li v-if="courseQuizes == ''">
                        <div class="pin-item-title-cont">
                            <div class = "pin-item-title">
                                No quizes created.
                            </div>
                            <div class="pin-item-info">
                                Please tell your teacher to upload quiz.
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>



    </div>
</template>

<script>
export default {
    name: 'DashCourse',
    async created() {
        await this.getAllCourses(),
        await this.findCourseId(),
        await this.getAllResources(),
        await this.getCourseResources(),
        await this.getAllQuizes(),
        await this.getCourseQuizes()
    },
    data() {
        return {
            courseId: '',
            allCourses: '',
            courseResources: [],
            allResources: [],
            allQuizes:[],
            courseQuizes:[]
        }
    },
    methods: {
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
        downloadResource: async function(location){
            await fetch('http://localhost:7000/get_resource', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({location})
            })
            .then( result => result.blob())
            .then((blob) => {
            var file = window.URL.createObjectURL(blob);
                window.location.assign(file);
            }).catch(error => {
                console.error('Error:', error);
            });
        },
        getCourseResources: function(){
            for(var i = 0; i<this.allResources.length;i++){
                if(this.allResources[i].courseId == this.courseId){
                    if( this.allResources[i].status == "Available"){
                        this.courseResources.push(this.allResources[i])
                    } else if (this.allResources[i].status == "SpecifiedRange"){
                        console.log("Specified Range")
                    }
                }
            }
        },
        getAllResources: async function(){
            await fetch('http://localhost:7000/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                // credentials: 'include',
                body: JSON.stringify({query: `query {
                    resourceMany {
                        name
                        author
                        status
                        courseId
                        fileUrl
                        dateEnd
                        dateStart
                    }
                }
                `})
            })
            .then( result => result.json())
            .then((data) => {
                this.allResources = data.data.resourceMany
                return data.data.resourceMany
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
                if(this.allCourses[i].courseName == this.$route.params.name){
                    this.courseId = this.allCourses[i]._id
                }
            }
        },
    }
}
</script>

<style scoped>
    .course-cont {
        margin-left: 75px;
    }
    .course-current-grade-cont{
        margin: 10px 0px;
    }
    .course-current-grade{
        float: left;
        text-align: left;
        text-decoration: underline;
        font: italic normal 23px/28px Montserrat;
        letter-spacing: 0px;
        color: #000000;
        opacity: 0.8;
    }
    /* Pins Start Here */
    .pins-cont{
        margin: 25px 0px;
    }
    .pins-head{
        text-align: left;
        font: normal normal 600 25px/30px Montserrat;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
    }
    .pins-item{
        overflow-x: auto;
    }
    .pins-item li{
        width: 289px;
        height: 256px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        box-shadow: 2px 2px 2px #00000029;
        border-radius: 2px;
        opacity: 1;
        margin: 10px;
        display: inline-block;
    }
    .pin-item-title-cont{
        float: center;
    }
    .pin-item-title{
        text-align: left;
        font: normal normal 600 25px/30px Montserrat;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
        margin: 20px 30px;
    }
    .pin-item-info{
        text-align: left;
        font: normal normal 400 20px Montserrat;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
        margin: 20px 30px;
    }
    /* Pins End Here */

</style>