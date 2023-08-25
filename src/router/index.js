import { createRouter, createWebHistory } from "vue-router";

import TipwinVue from "../views/tickets/Tipwin.vue";
import Williamhill from "../views/tickets/Williamhill.vue";
import Bovada from "../views/tickets/Bovada.vue";

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
		{
			path: "/bovada",
			name: "bovada",
			component: Bovada,
		},
	],
});

export default router;
