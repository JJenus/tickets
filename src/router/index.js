import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TipwinVue from "../components/tickets/Tipwin.vue";
import Williamhill from"../components/tickets/Williamhill.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/williamhill",
			name: "willhill",
			component: Williamhill,
		},
		{
			path: "/",
			redirect: "/williamhill",
		},
		{
			path: "/tipwin",
			name: "tipwin",
			component: TipwinVue,
		},
	],
});

export default router;
