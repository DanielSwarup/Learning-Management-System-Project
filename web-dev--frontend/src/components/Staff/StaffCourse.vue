<template>
    <div class="staff-courses-cont">
        <div class="pins-cont" style="float: left"> 
            <div class="pins-head">
                Course Information
            </div>
            <div class="pins-item">
                <ul>
                    <router-link :to="{ name: 'EnrolList', params: { courseName: $route.params.courseName }}">

                        <li>
                            <div class="pin-item-title-cont">
                                <div class = "pin-item-title">
                                Enroll Students from all Student List
                                </div>
                            </div>
                        </li>
                    </router-link>

                     <!--  /dashboard-staff/manage/:courseName/upload-quiz -->
                    <router-link :to="{ name: 'UploadQuiz', params: { courseName: $route.params.courseName }}">
                        <li>
                            <div class="pin-item-title-cont">
                                <div class = "pin-item-title">
                                    Upload a Quiz or View all Quizes
                                </div>
                            </div>
                        </li>
                    </router-link>
                </ul>
            </div>
            </div>
            
            <div class="pins-cont" style="float:left">
            <div class="pins-head">
                Resources
            </div>
            <div class="pins-item">
                <ul>
                    <div v-for="item in courseResources" :key="item.name" style="float:left">
                        <a href="#" >
                            <li @click="downloadResource(item.fileUrl)" >
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
                        </a>
                    </div>
                    <a href="">
                        <li v-if="courseResources == ''">
                            <div class="pin-item-title-cont">
                                <div class = "pin-item-title">
                                    No resources uploaded.
                                </div>
                                <div class="pin-item-info">
                                    Please upload resources below.
                                </div>
                            </div>
                        </li>
                    </a>
                </ul>
            </div>
            </div>
        <div class="widget-cont" style="float:left">
            <div class = "upload-widget">
                <UploadWidget />
            </div>
            <div class = "approval-widget">
                <router-view :key="$route.path">
                 <ApprovalWidget />
                </router-view>
            </div>
        </div>
    </div>
</template>



<script>
import UploadWidget from '@/components/Staff/StaffUploadWidget.vue';
import ApprovalWidget from '@/components/Staff/StaffApprovalWidget.vue';

export default {
    name: 'ManageCourse',
    components: {
        UploadWidget, ApprovalWidget
    }, 
    data() {
        return {
            dashboard: "DashGrades",
            courseId: '',
            allCourses: '',
            courseResources: [],
            allResources: []
        }
    },
    async created() {
        await this.getAllCourses(),
        await this.findCourseId(),
        await this.getAllResources(),
        await this.getCourseResources()
    },
    methods: {
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
                if(this.allResources[i].courseId == this.courseId)
                    this.courseResources.push(this.allResources[i])
            }
            console.log(this.courseResources)
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
                if(this.allCourses[i].courseName == this.$route.params.courseName){
                    this.courseId = this.allCourses[i]._id
                }
            }
        },
    },

}
</script>

<style scoped>
    .widget-cont{

    }
    .upload-widget{
        float: left;
    }
    .approval-widget{
        float: left;
    }
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
    .pin-item-date{
        text-align: left;
        font: normal normal 400 18px Montserrat;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
        margin: 20px 30px; 
    }
    /* Pins End Here */

</style>