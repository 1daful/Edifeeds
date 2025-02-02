import { RouteRecordRaw } from 'vue-router';
import { authGuard } from '../api/auth/authGuard'
//import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
//import Home from '../pages/Home.vue'
import SignIn from "../pages/SignIn.vue";

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('../pages/IndexPage.vue') },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../pages/About.vue'),
        meta:{
          navigational: true
        },
        props: true
      },
      {
        path: '/media/:id',
        name: 'SingleMedia',
        component: () => import('../pages/SingleMediaPage.vue'),
        //props: (route: {params: {media: any}}) => ({media: route.params})
        props: (route: { query: { mediaType: any } }) => ({mediaType: route.query.mediaType}),
      },
      {
        path: '/profile',
        name: 'Profile',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../pages/Profile.vue'),
        props: true,
        beforeEnter: authGuard,
        children: [
          {
              path: 'collection',
              name: 'Collection',
              // route level code-splitting
              // this generates a separate chunk (about.[hash].js) for this route
              // which is lazy-loaded when the route is visited.
              component: () => import(/* webpackChunkName: "about" */ '../pages/Collection.vue'),
              props: true,
              meta: {
                navigational: true
              },
              children: [
                {
                  path: 'media/:type',
                  name: 'Media',
                  component: () => import('../pages/Media.vue')
                }
              ]
          },
          {
            path: 'details',
            name: 'Details',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '../pages/UserDetails.vue'),
            props: true
          }
        ]
      },

      {
        path: '/upload',
        name: 'Upload',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../pages/UploadFile.vue'),
        props: true
      },
      {
        //props: (route: { params: { myUrl: any } }) => ({myUrl: route.params.myUrl}),
        path: '/auth*',
        component: () => import(/* webpackChunkName: "about" */ '../pages/Authview.vue'),
      },
      {
        //props: (route: { params: { myUrl: any } }) => ({myUrl: route.params.myUrl}),
        path: '/access_token=:url',
        component: () => import(/* webpackChunkName: "about" */ '../pages/Verification.vue'),
        //component: () => import(/* webpackChunkName: "about" */ '../pages/Auth.vue'),
      },
      {
        props: (route: { params: { myUrl: any } }) => ({myUrl: route.params.myUrl}),
        path: '/error=:myUrl',
        component: () => import(/* webpackChunkName: "about" */ '../pages/Error.vue'),
      },
      {
        path: '/:catchAll(.*)*',
        component: () => import('../pages/ErrorNotFound.vue'),
      }
    ]
  },
  {
    path: '/verification',
    name: 'Verification',
    component: () => import(/* webpackChunkName: "about" */ '../pages/Verification.vue'),
    props: true
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../pages/SERP.vue'),
    children: [
      {
        path: '/:type',
        name: 'SERPView',
        component: () => import(/* webpackChunkName: "about" */ '../pages/SERPView.vue'),
        props: true
      },
    ],
    //props: (route: {params: {media: any}}) => ({media: route.params})
    //props: (route: { query: { mediaType: any } }) => ({mediaType: route.query.mediaType}),
  },
  {
    path: '/reset/:param',
    name: 'Reset',
    component: () => import(/* webpackChunkName: "about" */ '../pages/Reset.vue'),
    props: true
  },
  /*{
  path: '/',
  name: 'Home',
  component: Home,
  meta: {
    navigational: true,
  },
  props: true
},*/
{
  path: '/signin',
  name: 'SignIn',
  component: SignIn,
  props: (route: { query: { myUrl: any } }) => ({myUrl: route.query.myUrl}),
  meta: {
    noHeader: true
  }
},
{
  path: '/signup',
  name: 'SignUp',
  component: () => import(/* webpackChunkName: "about" */ '../pages/SignUp.vue'),
  props: (route: { query: { myUrl: any } }) => ({myUrl: route.query.myUrl}),
  meta: {
    noHeader: true
  }

}
/*{
  path: '/',
  component: () => import('layouts/MainLayout.vue'),
  children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
},


  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },*/

  // Always leave this as last one,
  // but you can also remove it
];

export default routes;
