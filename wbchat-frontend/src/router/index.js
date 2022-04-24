import { createRouter, createWebHistory } from 'vue-router'
import welcome from '../views/WelcomeView.vue'
import { useStore } from "@/stores/store";


// khi đăng nhập sẽ chuyển sang trang rooms
const redirectIfLoggedIn = (_to, _from) => {
	if (useStore().isUserLoggedIn) {
		return {
			name: "chatroom",
		};
	}
};

const routes = [
  {
    path: '/',
    name: 'home',
    component: welcome,
    // này để các trang không cần đăng nhập
    meta: {
			publicPage: true,
		},
		beforeEnter: redirectIfLoggedIn,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: {
			publicPage: true,
		},
		beforeEnter: redirectIfLoggedIn,
  },
  {
    path: '/chatroom',
    name: 'chatroom',
    component: () => import('@/views/ChatRoomView.vue'),
    
  },
  {
    path: '/trang2',
    name: 'trang2',
    component: () => import('@/views/Trang2View.vue'),
    
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
    
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// nếu vào trang private thì nó sẽ bắt đăng nhập, nếu đăng nhập thành công sẽ chuyển sang trang mà đang muốn vào
router.beforeEach((to, _from) => {
	const authRequired = !to.meta.publicPage;
	const auth = useStore();

	if (authRequired && !auth.isUserLoggedIn) {
		const query = to.fullPath === "/" ? {} : { redirect: to.fullPath };
		return {
			name: "login",
			query,
		};
	}
});


export default router
