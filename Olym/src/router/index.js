import Vue from 'vue'
import Router from 'vue-router'
import TrendView from '@/components/TrendView'
import TrendViewon from '@/components/TrendViewon'
import Product from '@/components/ModelView1'
import View from '@/components/view'
import Login from '@/components/Login'
import Comparison from '@/components/segement'
import Category from '@/components/CagetoryTrendView'
import Main from '@/components/main'
import Table from '@/components/table'
import Role from '@/components/Role/Role'
import Rights from '@/components/Role/Rights'
import AllUser from '@/components/User/AllUser'
import DelUser from '@/components/User/DelUser'
import AddUser from '@/components/User/AddUser'
import UpdateUser from '@/components/User/UpdateUser'



Vue.use(Router)

export default new Router({
routes: [
  {
    path: '/',
    redirect:'/login',
  },
{
    	path: '/Login',
      name: 'Login',
      component: Login
   },
   {
   	path:'/main',
   	name:'main',
   	component: Main,
   	children:[
   	 {
      path: '/Role',
      name: 'Role',
      component: Role
    }, 
    {
      path: '/Overall',
      name: 'Overall',
      component: TrendView
    }, 
    {
      path: '/Overallon',
      name: 'Overallon',
      component: TrendViewon
    },
    {
      path: '/Rights',
      name: 'Rights',
      component: Rights
    }, 
    {
      path: '/AllUser',
      name: 'AllUser',
      component: AllUser
    }, 
    {
      path: '/DelUser',
      name: 'DelUser',
      component: DelUser
    }, 
    {
      path: '/AddUser',
      name: 'AddUser',
      component: AddUser
    }, 
    {
      path: '/UpdateUser',
      name: 'UpdateUser',
      component: UpdateUser
    }, 
  
    {
    	path: '/Product',
      name: 'Product',
      component: Product
    },
   
     {
    	path: '/Help',
      name: 'Help',
      component: View
    },
     {
    	path: '/Comparison',
      name: 'Comparison',
      component: Comparison
    },
    {
    	path: '/Category',
      name: 'Category',
      component: Category
    },
    {
    	path: '/table',
      name: 'Table',
      component: Table
    }
   	]
   }
   
    
    
  ]
})
