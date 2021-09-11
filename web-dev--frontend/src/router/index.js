import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue'
const routes = [
  {
    path: '/:pathMatch(.*)*',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Home,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guest: true
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue'),
    meta: {
      guest: true
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue'),
    meta: {
      requiresAuth: true,
    },
    props: {
      dashtype: "DashHome"
    }
  },
  {
    path: '/grades',
    name: 'Grades',
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue'),
    meta: {
      requiresAuth: true,
    },
    props: {
      dashtype: "DashGrades"
    }
  },
  {
    path: '/course/:name',
    name: 'Course',
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue'),
    meta: {
      requiresAuth: true,
    },
    props: {
      dashtype: "DashCourse"
    }
  },
  {
    path: '/course/:courseName/quiz/:quiz',
    name: 'Quiz',
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue'),
    meta: {
      requiresAuth: true,
    },
    props: {
      dashtype: "Quiz"
    }
  },
  {
    path: '/dashboard-staff',
    name: 'StaffDashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/StaffDashboard.vue'),
    meta: {
      isAdmin: true,
      requiresAuth: true,
    },
    props: {
      dashtype: "DashStaffHome"
    }
  },
  {
    path: '/dashboard-staff/manage',
    name: 'StaffCourses',
    component: () => import(/* webpackChunkName: "about" */ '../views/StaffDashboard.vue'),
    meta: {
      isAdmin: true,
      requiresAuth: true,
    },
    props: {
      dashtype: "StaffManageCourse"
    }
  },
  {
    path: '/dashboard-staff/grades',
    name: 'StaffGrades',
    component: () => import(/* webpackChunkName: "about" */ '../views/StaffDashboard.vue'),
    meta: {
      isAdmin: true,
      requiresAuth: true,
    },
    props: {
      dashtype: "StaffGrades"
    }
  },
  {
    path: '/dashboard-staff/manage/:courseName',
    name: 'ManageCourse',
    component: () => import(/* webpackChunkName: "about" */ '../views/StaffDashboard.vue'),
    meta: {
      isAdmin: true,
      requiresAuth: true,
    },
    props: {
      dashtype: "ManageCourse"
    }
  },
  {
    path: '/dashboard-staff/manage/:courseName/upload-quiz',
    name: 'UploadQuiz',
    component: () => import(/* webpackChunkName: "about" */ '../views/StaffDashboard.vue'),
    meta: {
      isAdmin: true,
      requiresAuth: true,
    },
    props: {
      dashtype: "UploadQuizWidget"
    }
  },
  {
    path: '/dashboard-staff/manage/:courseName/:quiz',
    name: 'AdminViewQuiz',
    component: () => import(/* webpackChunkName: "about" */ '../views/StaffDashboard.vue'),
    meta: {
      isAdmin: true,
      requiresAuth: true,
    },
    props: {
      dashtype: "StaffQuiz"
    }
  },
  {
    path: '/dashboard-staff/:courseName/grades/:quiz/:',
    name: 'QuizGrades',
    component: () => import(/* webpackChunkName: "about" */ '../views/StaffDashboard.vue'),
    meta: {
      isAdmin: true,
      requiresAuth: true,
    },
    props: {
      dashtype: "QuizGrades"
    }
  },
  {
    path: '/dashboard-staff/manage/:courseName/enrol-from-list',
    name: 'EnrolList',
    component: () => import(/* webpackChunkName: "about" */ '../views/StaffDashboard.vue'),
    meta: {
      isAdmin: true,
      requiresAuth: true,
    },
    props: {
      dashtype: "EnrolList"
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        let cookie = {};
        document.cookie.split(';').forEach(function(el) {
            let [k,v] = el.split('=');
            cookie[k.trim()] = v;
        })
        var check = cookie["UserID"].replace('j:','');
        if (check == undefined) {
            next({
                name:'Login',
            })
        } else {
          next()
    }
  }
  else{
    next()
  }
})
// router.beforeEach((to, from, next) => {
//     if(to.matched.some(record => record.meta.requiresAuth)) {
//         if (localStorage.getItem('jwt') == 'undefined') {
//             next({
//                 path: '/login',
//                 params: { nextUrl: to.fullPath }
//             })
//         } else {
//             let user = JSON.parse(localStorage.getItem('user'))
//             if(to.matched.some(record => record.meta.isAdmin)) {
//                 if(user.isAdmin == 1){
//                     next({
//                       path: '/dashboard-staff',
//                       params: { nextUrl: to.fullPath }
//                   })
//                 }
//                 else{
//                     next({ name: 'userboard'})
//                 }
//             }else {
//                 next()
//             }
//         }
//     } else if(to.matched.some(record => record.meta.guest)) {
//         if(localStorage.getItem('jwt') == null){
//             next()
//         }
//         else{
//             next({ name: 'userboard'})
//         }
//     }else {
//         next()
//     }
// })
export default router;
