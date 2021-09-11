<template>
    <div class="register-cont">
        <div class="register-topbar">
            <h1>{{ title }}</h1>
        </div>
        <div class="register-widget-cont">
            <div class="register-widget">
                <form @submit.prevent="handleSubmit">
                    <div class = "register-widget-nameCont">
                        <div>
                            <label for="fname">First name:</label><br>
                            <input type="text" id="fname" name="fname" required v-model="firstName"><br>
                        </div>
                        <div>
                            <label for="lname">Last name:</label><br>
                            <input type="text" id="lname" name="lname" required v-model="lastName">
                        </div>
                    </div>
                    <label for="email">Email Address:</label><br>
                    <input type="email" id="email" name="email" required v-model="email"><br>
                    <label for="password">Password:</label><br>
                    <input type="password" id="password" name="password" required v-model="password"><br>
                    <label for="confirm-password">Confirm Password:</label><br>
                    <input type="password" id="confirmPassword" name="confirmPassword" required v-model="confirmPassword"><br>
                    <input type="submit" value="Submit" class = "register-widget-button" >
                    <div class ="register-forgotPassword">
                        <a href="/login"><p>Already Have An Account?</p></a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    name: 'Register',
    data() {
        return {
            title: 'Register',
            firstName: '',
            lastName: ''
        }
    },
    methods: {
        handleSubmit: async function(e){
            const form = document.querySelector('form');
                e.preventDefault();

                //Get the values
                const email = form.email.value;
                const password = form.password.value;
                const confirmPassword = form.confirmPassword.value;
                const firstName = form.fname.value;
                const lastName = form.lname.value;
                if(password != confirmPassword){
                    alert("Passwords do not match");
                } else {
                    try{
                        const res = await fetch('http://localhost:7000/register',{
                            method: 'POST',
                            body: JSON.stringify({email, password, firstName, lastName}),
                            headers: {'Content-Type': 'application/json'},
                            credentials: 'include',
                        })
                        const data = await res.json()
                        if(data.user){
                            location.assign('/dashboard')
                        }
                        if(data.errors){
                            var alertError = ''
                            if(data.errors.password.message){
                                alertError = data.errors.password.message
                            }
                            else if (data.errors.email.message){
                                alertError += data.errors.email.message
                            }
                            alert(alertError);
                        }

                    }catch(err){
                        console.log(err)
                    }
                }


                // console.log(email, password, firstName, lastName)
        },
    }
}
</script>

<style scoped>
    .register-cont{
        height: auto;
        width: 100%
    }
    .register-topbar{
        background-color: #F1F1F1 0% 0% no-repeat padding-box;
        height: 150px;
        width: 100%;
        display: flex;
        align-items: center;
    }
    .register-topbar h1{
        text-align: left;
        font: normal normal 600 55px Montserrat;
        letter-spacing: 0px;
        color: #003A62;
        opacity: 1;
        padding-left: 150px;
    }
    .register-widget-cont{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FFFFFF 0% 0% no-repeat padding-box;
    }
    .register-widget{
        margin: 30px 0px;
        padding: 30px 0px;
        width: 950px;
        height: auto;
        background: #F1F1F1 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #00000029;
        border-radius: 8px;
        opacity: 1;
        display: flex;
        justify-content: center;
        /* align-items: center; */
    }
    .register-widget label{
        text-align: left;
        font: normal normal 600 25px Montserrat;
        letter-spacing: 0px;
        color: #003A62;
        opacity: 1;
        
    }
    .register-widget input[type=text],[type = email], [type = password]{
        margin: 10px 0px;
        width: 500px;
        height: 50px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        font: normal normal 300 20px Montserrat;
        border: 1px solid #707070;
        border-radius: 8px;
        opacity: 1;
        
    }
    .register-widget-button{
        margin-top: 15px;
        width: 500px;
        height: 70px;
        border: none;
        background: #003A62 0% 0% no-repeat padding-box;
        border-radius: 8px;
        text-align: center;
        font: normal normal 600 25px/30px Montserrat;
        letter-spacing: 0px;
        color: #FFFFFF;
        opacity: 1;
    }
    .register-forgotPassword {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .register-forgotPassword p{
        text-align: left;
        text-decoration: underline;
        font: normal normal 600 20px/24px Montserrat;
        letter-spacing: 0px;
        color: #2E5D7E;
    }
    #password, #confirm-password {
        font: normal normal 600 25px Montserrat;
    }
    .register-widget-nameCont{
        display: flex;
    }
    .register-widget-nameCont input[type=text]{
        width: 245px;
        height: 50px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        font: normal normal 300 20px Montserrat;
        border: 1px solid #707070;
        border-radius: 8px;
        opacity: 1;
    }
    #fname{
        margin-right: 10px;
    }
</style>