<template>
       <div class="head" id="head">
            <div><a href="/"><img src="../assets/logo.png" class = "head-logo"></a></div>
            <div class = "head-menusCont">
                <div class = "head-topSubMenu">
                    <ul>
                        <li><a href=""><span>FOR YOU</span><svg  class = "head-topSubMenu-arrow" xmlns="http://www.w3.org/2000/svg" width="13.985" height="7.996" viewBox="0 0 13.985 7.996">
                            <path id="Icon_ionic-ios-arrow-down" data-name="Icon ionic-ios-arrow-down" d="M13.182,16.832,18.47,11.54a1,1,0,0,1,1.411,0,1.008,1.008,0,0,1,0,1.416l-5.992,6a1,1,0,0,1-1.378.029L6.479,12.96A1,1,0,0,1,7.89,11.544Z" transform="translate(-6.188 -11.246)"/>
                        </svg></a>
                        </li>
                        <li><a href="">Events</a></li>
                        <li><a href="">About</a></li>
                    </ul>
                </div>
                <div class = "head-mainMenu">
                    <ul>
                        <li><a href=""><svg class = "head-mainMenu-search" xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                            <g id="Search" transform="translate(-1675 -79)">
                              <circle id="Ellipse_1" data-name="Ellipse 1" cx="28" cy="28" r="28" transform="translate(1675 79)" fill="#003a62"/>
                              <path id="Icon_awesome-search" data-name="Icon awesome-search" d="M24.843,21.778l-4.9-4.9a1.18,1.18,0,0,0-.836-.344h-.8A10.228,10.228,0,1,0,16.529,18.3v.8a1.18,1.18,0,0,0,.344.836l4.9,4.9a1.176,1.176,0,0,0,1.668,0l1.392-1.392a1.186,1.186,0,0,0,0-1.673ZM10.232,16.529a6.3,6.3,0,1,1,6.3-6.3A6.293,6.293,0,0,1,10.232,16.529Z" transform="translate(1690 94)" fill="#f8f8f8"/>
                            </g>
                          </svg>
                          </a></li>
                        <span>
                            <li v-if="loggedIn == false" ><a href="/Register" >REGISTER</a></li>
                            <li  v-if="loggedIn == false"><a href="/Login" >LOGIN</a></li>
                        </span>
                        <li v-if="loggedIn" @click="logout()" ><a href="#" >LOGOUT</a></li>

                        <li v-if="admin"><a href="/dashboard-staff" >STAFF DASHBOARD</a></li>
                        
                        <li v-else-if="loggedIn"><a href="/dashboard" >DASHBOARD</a></li>

                        <li><a href="/">HOME</a></li>

                    </ul>
                </div>
            </div>
    </div>
    <div class = "head-bottomBar"></div>
</template>

<script>
// localStorage.getItem('jwt') == null

export default {
    name: 'Header',
    updated(){

    },
    created: async function(){
        await this.updateData();
        await this.checkedLoggedIn();
    },
    data(){
        return {
            loggedIn: true,
            loggedOut: false,
            admin: false,
            userRole:''
        }
    },
    methods: {
        getCookie: function (name) {
            let cookie = {};
            document.cookie.split(';').forEach(function(el) {
                let [k,v] = el.split('=');
                cookie[k.trim()] = v;
            })
            return cookie[name];
        },
        checkedLoggedIn: function(){
            if(decodeURIComponent( JSON.stringify(this.getCookie('UserID'))) == "undefined"){
                this.loggedIn= false
            }
            else{
                this.loggedIn= true
            }
        },
        updateData: async function() {
            var userCookieID = decodeURIComponent( this.getCookie('UserID')).replace('j:','')

            await fetch('http://localhost:7000/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({query: `query {  userById(_id: ${userCookieID} ) { _id role }   }`})
            })
            .then( result => result.json())
            .then((data) =>{
                this.userRole = (data.data.userById.role)
                return data.data.userById
            }).catch(error => {
            console.error('Error:', error);
            });
            if(this.userRole == "Tutor" || this.userRole == "Admin"){
                this.admin = true
            }
        },
        logout: async function(){
                    try{
                        await fetch('http://localhost:7000/logout',{
                            method: 'GET',
                            // body: JSON.stringify({email, password }),
                            headers: {'Content-Type': 'application/json'},
                            credentials: 'include',
                        })
                    } catch(err){
                        console.log(err)
                    } 
                    await this.$router.push({ name: 'Home' })

        }
    },
}
</script>



<style scoped>

    .head {
        top: 0px;
        left: 0px;
        width: 100%;
        height: auto;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #00000029;
        opacity: 1;
        display: flex;
        flex-wrap: nowrap;
        transition: 0.2s;
        padding-bottom: 15px;
    }
    .head-logo{
        margin-top: 20px;
        margin-left: 100px;
        width: 272px;
        height: 106px;
        opacity: 1;
        float: left;
    }
    .head-menusCont{
        margin-right: 100px;
        float:right;
        margin-left: auto;
        overflow-y:hidden;
    }
    .head-topSubMenu{
        margin-top: 25px;
        font: italic normal normal 16px Montserrat;
        color: #000000;
        letter-spacing: 0px;
    }
    .head-topSubMenu span{
        font-weight: 600;
        font-size: 16px;
        font-style: normal;
        color: #000000;
    }
    .head-topSubMenu li{
        list-style-type: none;
        padding: 0px 15px;
        float: right;
    }
    .head-topSubMenu a{
        text-decoration: none;
        color: #000000;
    }
    .head-topSubMenu-arrow{
        padding-left: 5px;
        width: 18px;
        height: auto;
        padding-right: 75px;;

    }
    .head-mainMenu{
        margin-top: 30px;
        float: right;
        font: bold normal normal 17px Montserrat;
        color: #000000;
        letter-spacing: 0px; 
    }
    .head-mainMenu li{
        list-style-type: none;
        padding: 0px 15px;
        float: right;
        padding-top: 10px;

    }
    .head-mainMenu a{
        text-decoration: none;
        color: #000000;
        transition: 0.4s;
    }
    .head-mainMenu a:hover{
        text-decoration: none;
        color: #5EB2EC;
    }
    .head-mainMenu-search{
        padding-left: 0px;
        margin-top: -10px;
        width: 40px;
        height: auto;
    }
    .head-bottomBar{
        width: 100%;
        height: auto;
        background: #003A62 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #00000029;
        padding-bottom: 4px;
    }
</style>