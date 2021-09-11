<template>
    <div class="staff-courses-cont">
            <div class="pins-cont">
            <div class="pins-head">
                Courses
            </div>

            <div class="pins-item">

                <ul>
                    <a href="#" @click="addCourseState()">
                    <li style = "float: left" >
                        <div class="pin-item-title-cont">
                            <div class = "pin-item-title">
                                + Add New Course
                            </div>
                            
                            <div class = "pin-item-info" v-if="newCourse" >

                                <label for="courseName">Course Name*: </label>
                                <input type="text" required name="courseName" id="courseName">
                                <br>
                                <input type ="submit" @click="handleNewCourse()">
                                <br>
                            </div>
                        </div>
                    </li>
                    </a>
                    <div v-for="courses in allCourses" :key="courses.courseName" style="float:left">
                        <router-link :to="{ name: 'ManageCourse', params: { courseName: courses.courseName }}" style="text-decoration: none">                            
                            <li>
                                <div class="pin-item-title-cont">
                                    <div class = "pin-item-title">
                                    {{courses.courseName}}
                                    </div>
                                </div>
                            </li>
                            
                        </router-link>
                    </div>
                </ul>

            </div>
            <div >
                <TutorApproval />
            </div>
        </div>
    </div>
</template>



<script>
import TutorApproval from '@/components/Staff/TutorApprovalWidget.vue';

export default {
    name: 'StaffManageCourse',
    components: {
        TutorApproval
    }, data() {
        return {
            allCourses: '',
            newCourse: false            
        }
    },
    async created() {
        await this.getAllCoursesInfo()
    },
    methods: {
        handleNewCourse: async function(){
            await this.createNewCourse()
            await location.reload();
        },
        createNewCourse: async function(){
            var newCourseName = document.getElementById("courseName").value
            console.log(newCourseName)

            await fetch('http://localhost:7000/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                // credentials: 'include',
                body: JSON.stringify({query: `mutation{
            courseCreateOne(record:{courseName:${JSON.stringify(newCourseName)}}){
                    record{
                    courseName
                    }
                } 
            }`})
            })
            .then( result => result.json())
            .then((data) =>{
                alert("You've created a course called " + newCourseName)
                return data.data.courseCreateOne.record
            }).catch(error => {
                console.error('Error:', error);
            });
        },
        addCourseState: function(){
            this.newCourse = true
        },
        getAllCoursesInfo: async function (){
                await fetch('http://localhost:7000/graphql', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                        // credentials: 'include',
                        body: JSON.stringify({query: `query {  courseMany { _id courseName tutor }   }`})
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
    .staff-courses-cont{

    }
        /* Pins Start Here */
    .pins-cont{
        margin: 25px 75px;
    }
    .pins-head{
        margin-left: 10px;
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
    .pin-item-info input[type= "submit"] {
    font: normal normal normal 18px/35px Montserrat;
    letter-spacing: 0px;
    color: #000000;
    background-color: lightgreen;
    opacity: 1;
    cursor: pointer;
    display: inline-block;
    margin-right: 15px;
    margin-top: 10px;
    padding: 5px 15px;
    position: relative;
    border: 0;
    border-radius: 8px;
    }
</style>