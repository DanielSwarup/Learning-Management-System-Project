<template>
    <div class="upload-widgetCont">
        <div class="upload-head">
            Upload Resources
        </div>
        <div class="upload-widget">
                <form @submit.prevent="handleUpload()" ref="uploadForm">

            <div class="upload-text-cont">
                <div class="upload-text">
                    Upload Resources
                </div>
                <div class="upload-text">
                    <!-- <a href="">Click Here</a> to get an upload template -->
                    <label for="resourceName">Resource Name*: </label>
                    <input type="text" required name="resourceName" id="resourceName">
                    <br>
                    <label for="resource">Resource Status*:</label>

                    <select name="resourceLiveStatus" id="resourceLiveStatus" required @click="displayTime()">
                        <option value="Select Resouce Status" disabled selected>Select Resouce Status</option>
                        <option value="Available">Available</option>
                        <option value="NotAvailable">Not Available</option>
                        <option value="SpecifiedRange" >Specified date Range</option>


                    </select>
                    <br>
                    <div v-if="resourceTimeSpecified">
                    <label for="resourceStartDate">Resource Date Start*:</label>
                    <input type="date" name="resourceStartDate" id="resourceStartDate">
                    <label for="resourceEndDate">Resource Date End*:</label>
                    <input type="date" name="resourceEndDate" id="resourceEndDate">
                    </div>
                </div>
                <div class="upload-icon-cont">
                    <div class="upload-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="115.049" height="78.7" viewBox="0 0 115.049 78.7">
                    <defs>
                        <filter id="Icon_awesome-folder-open" x="0" y="0" width="115.049" height="78.7" filterUnits="userSpaceOnUse">
                        <feOffset dy="1" input="SourceAlpha"/>
                        <feGaussianBlur stdDeviation="1" result="blur"/>
                        <feFlood flood-opacity="0.161"/>
                        <feComposite operator="in" in2="blur"/>
                        <feComposite in="SourceGraphic"/>
                        </filter>
                    </defs>
                    <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Icon_awesome-folder-open)">
                        <path id="Icon_awesome-folder-open-2" data-name="Icon awesome-folder-open" d="M108.424,47.683,94.712,71.188A12.116,12.116,0,0,1,84.246,77.2H8.524A4.544,4.544,0,0,1,4.6,70.366L18.311,46.861A12.117,12.117,0,0,1,28.777,40.85H104.5a4.544,4.544,0,0,1,3.925,6.833ZM28.777,34.792h62.1V25.7a9.087,9.087,0,0,0-9.087-9.087H51.5L39.379,4.5H9.087A9.087,9.087,0,0,0,0,13.587v52.64L13.078,43.809A18.237,18.237,0,0,1,28.777,34.792Z" transform="translate(3 -2.5)"/>
                    </g>
                        </svg>
                    </div>
                    <div class="upload-info">
                        <input accept=".txt, .pptx, .docx" id="studentList" type="file" ref="resource" name="resource" required @change="onSelect()" />

                        <div class="upload-info-text">
                            Click on "Choose File" to open file explorer
                        </div>
                    </div>
                </div>
                <div class="upload-text upload-submit">
                    <input type="submit" value="Upload" >
                </div>
            </div>   
</form>
        </div>



    </div>

</template>


<script>
export default {
    name: "UploadQuiz",
    async created() {
        await this.getAllCourses(),
        await this.findCourseId()
        // await this.getAllResources(),
        // await this.getCourseResources()
    },
    data() {
        return {
            resourceTimeSpecified: false,
            resource: '',
            resourceUrl: '',
            courseId: '',
            allCourses: '',
            courseResources: [],
            allResources: []
        }
    },
    methods: {
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
        updateCalendar: async function(){
            var todayDate = new Date()
            var date = todayDate.getDate()
            var month = ''
            switch(todayDate.getMonth()){
                case(0):
                    month = "Jan"
                    break
                case(1):
                    month = "Feb"
                    break
                case(2):
                    month = "Mar"
                    break
                case(3):
                    month = "Apr"
                    break
                case(4):
                    month = "May"
                    break
                case(5):
                    month = "Jun"
                    break
                case(6):
                    month = "Jul"
                    break
                case(7):
                    month = "Aug"
                    break
                case(8):
                    month = "Sep"
                    break
                case(9):
                    month = "Oct"
                    break
                case(10):
                    month = "Nov"
                    break
                case(11):
                    month = "Dec"
                    break
            }
            var resourceName = document.getElementById("resourceName").value +" added in " + this.$route.params.courseName;
            await fetch('http://localhost:7000/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                // credentials: 'include',
                body: JSON.stringify({query: `mutation{
                    calendarCreateOne(record:{assignmentName:${JSON.stringify(resourceName)} dueDate:"${date}" dueMonth:${JSON.stringify(month)} courseId:${JSON.stringify(this.courseId)}}){
                        record{
                            assignmentName
                            dueDate
                            dueMonth
                            courseId
                        }
                    }
                }`})
            })
            .then( result => result.json())
            .then((data) => {
                return data.data.calendarCreateOne.record
            }).catch(error => {
            console.error('Error:', error);
            });
        },
        updateAnnoucement: async function(){
            var todayDate = new Date()
            var date = todayDate.getDate()
            var month = ''
            switch(todayDate.getMonth()){
                case(0):
                    month = "Jan"
                    break
                case(1):
                    month = "Feb"
                    break
                case(2):
                    month = "Mar"
                    break
                case(3):
                    month = "Apr"
                    break
                case(4):
                    month = "May"
                    break
                case(5):
                    month = "Jun"
                    break
                case(6):
                    month = "Jul"
                    break
                case(7):
                    month = "Aug"
                    break
                case(8):
                    month = "Sep"
                    break
                case(9):
                    month = "Oct"
                    break
                case(10):
                    month = "Nov"
                    break
                case(11):
                    month = "Dec"
                    break
            }
            var resourceName = document.getElementById("resourceName").value +" resource was added  on " + date + month;
            await fetch('http://localhost:7000/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                // credentials: 'include',
                body: JSON.stringify({query: `mutation{
                courseUpdateById(_id:${JSON.stringify(this.courseId)} record:{annoucement:${JSON.stringify(resourceName)}}){
                    record{
                    annoucement
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
        handleUpload: async function(){
            await this.uploadResource()
            await this.updateCourse()
            await this.updateCalendar()
            await this.updateAnnoucement()
            await this.clearForm()
            await location.reload();

        },
        clearForm: function(){
            this.$refs.uploadForm.reset();

        },
        getCookie: function (name) {
            let cookie = {};
            document.cookie.split(';').forEach(function(el) {
                let [k,v] = el.split('=');
                cookie[k.trim()] = v;
            })
            return cookie[name];
        },
        updateCourse: async function(){
            var userCookieID = decodeURIComponent( this.getCookie('UserID')).replace('j:','')
            var resourceName = document.getElementById("resourceName").value;
            var resourceState = document.getElementById("resourceLiveStatus").value
            var resourceStartDate = ''
            var resourceEndDate = ''

            if(resourceState == "SpecifiedRange"){
                resourceStartDate = document.getElementById("resourceStartDate").value
                resourceEndDate = document.getElementById("resourceEndDate").value
            }
            await fetch('http://localhost:7000/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                // credentials: 'include',
                body: JSON.stringify({query: `mutation{
                resourceCreateOne(record:{name:${JSON.stringify(resourceName)} status: ${resourceState} courseId: ${JSON.stringify(this.courseId)} fileUrl:${JSON.stringify(this.resourceUrl)} author:${userCookieID} dateStart:${JSON.stringify(resourceStartDate)} dateEnd:${JSON.stringify(resourceEndDate)}}){
                    record{
                        name
                        author
                        status
                        courseId
                        fileUrl
                        dateEnd
                        dateStart
                    }
                }
            }`})
            })
            .then( result => result.json())
            .then((data) => {
                alert(`You've added ${data.data.resourceCreateOne.record.name} as new resource`)
            return data.data.userUpdateOne
            }).catch(error => {
            console.error('Error:', error);
            });
        },
        uploadResource: async function(){
            if(this.resource != ''){
                const formData = new FormData();
                formData.append('resource', this.resource)
                await fetch('http://localhost:7000/upload_resource', {
                    method: 'POST',
                    headers: {
                    },
                    credentials: 'include',
                    body: formData
                })
                .then( result => result.json())
                .then((data) => {
                    this.resourceUrl = data.location
                    return data
                }).catch(error => {
                    console.error('Error:', error);
                });

            }
            else{
                alert("Please select a file for upload")
            }

        },
        onSelect: function(){
            const file = this.$refs.resource.files[0]
            this.resource = file
        },
        displayTime: function(){
            var form = document.getElementById("resourceLiveStatus");
            if(form.value == "SpecifiedRange"){
                this.resourceTimeSpecified = true
            }
            else{
                 this.resourceTimeSpecified = false
            }
        }
    },
}
</script>

<style scoped>
    .upload-widgetCont{
        margin: 15px 75px;
        float: left;
    }
    .upload-widget{
        width: 520px;
        min-height: 400px;
        height: auto;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        box-shadow: 2px 2px 2px #00000029;
        border-radius: 8px;
        opacity: 1;
        margin: 5px;
    }
    .upload-text-cont{
        margin: 30px 60px 40px;
        
    }
    .upload-head{
        margin-top: 20px;
        margn-bottom: 15px;
        margin-left: 10px;
        text-align: left;
        font: normal normal bold 17px/27px Montserrat;
        letter-spacing: 0px;
        color: #000;
        opacity: 1;
    }
    .upload-text{
        margin-top: 20px;
        text-align: center;
        font: normal normal normal 17px/27px Montserrat;
        letter-spacing: 0px;
        color: #5A5A5A;
        opacity: 1;
    }
    .upload-icon-cont{
        margin-top: 20px;
        width: auto;
        height: 248px;
        background: #EEEEEE 0% 0% no-repeat padding-box;
        box-shadow: 0px 1px 2px #00000029;
        border: 2px dashed #00426F;
        border-radius: 3px;
        opacity: 1;

    }
    .upload-icon{
        margin-top: 25px;
        margin-bottom: 25px;
        display: flex;
        justify-content: center;
    }
    .upload-icon svg{
        height: 65px;
    }
    .upload-info{
        margin: 30px 25px;
        text-align: center;
        font: normal normal normal 17px Montserrat;
        letter-spacing: 0px;
        color: #5A5A5A;
        opacity: 1;
    }
    .upload-info-text{
        margin: 25px 25px 0px;
        text-align: center;
        font: normal normal normal 17px Montserrat;
        letter-spacing: 0px;
        color: #5A5A5A;
        opacity: 1;
    }
    .upload-submit input[type = "submit"]{
        font: normal normal normal 18px/35px Montserrat;
        letter-spacing: 0px;
        color: #000000;
        background-color: lightgreen;
        opacity: 1;
        cursor: pointer;
        display: inline-block;
        margin-right: 15px;
        margin-top: 10px;
        padding: 5px 25px;
        position: relative;
        border: 0;
        border-radius: 8px;
    }
</style>