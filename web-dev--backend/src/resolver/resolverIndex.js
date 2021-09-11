import { adminQuery, adminMutation } from '../modules/Admin/resolver/AdminResolver.js' 
import { courseQuery, courseMutation } from '../modules/Course/resolver/CourseResolver.js' 
import { footerQuery, footerMutation } from '../modules/Footer/resolver/FooterResolver.js' 
import { headerQuery, headerMutation } from '../modules/Header/resolver/HeaderResolver.js' 
import { questionQuery, questionMutation } from '../modules/Question/resolver/QuestionResolver.js' 
import { quizQuery, quizMutation } from '../modules/Quiz/resolver/QuizResolver.js' 
import { resourceQuery, resourceMutation } from '../modules/Resource/resolver/ResourceResolver.js' 
import { studentQuery, studentMutation } from '../modules/Student/resolver/StudentResolver.js' 
import { userQuery, userMutation } from '../modules/User/resolver/UserResolver.js' 
import { calendarQuery, calendarMutation } from '../modules/Calendar/resolver/CalendarResolver.js' 


import { schemaComposer } from 'graphql-compose';

schemaComposer.Query.addFields({
	...userQuery,
    ...adminQuery,
	...courseQuery,
	...footerQuery,
	...headerQuery,
	...questionQuery,
	...quizQuery,
	...resourceQuery,
	...studentQuery,
	...calendarQuery
})

schemaComposer.Mutation.addFields({
	...userMutation,
    ...adminMutation,
	...courseMutation,
	...footerMutation,
	...headerMutation,
	...questionMutation,
	...quizMutation,
	...resourceMutation,
	...studentMutation,	
	...calendarMutation
})


export const graphqlSchema = schemaComposer.buildSchema();