import { createRouter, createWebHistory } from "vue-router";

import App from "../views/App.vue";
import MainView from "../views/app/MainView.vue";
import Wallets from "../views/app/Wallets.vue";

import Admin from "../views/Admin.vue";
import Dashboard from "../views/admin/Dashboard.vue";
import Users from "../views/admin/Users.vue";
import Testimonials from "../views/admin/Testimonials.vue";
import Settings from "../views/admin/Settings.vue";
import Login from "../views/admin/Login.vue";
import UserLogin from "../views/Login.vue";
import Register from "../views/Register.vue";

import Tickets from "../views/Tickets.vue";

import { user } from "@/stores/user";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/app",
			redirect: "/app/tickets",
			name: "app",
			component: App,
			beforeEnter: (to, from, next) => {
				if (!user.getUser()) {
					next({ name: "login" });
				} else {
					next();
				}

				// next();
			},
			children: [
				{
					path: "tickets",
					name: "overview",
					component: MainView,
				},

				{
					path: "subscribe",
					name: "wallets",
					component: Wallets,
				},
			],
		},

		{
			path: "/admin",
			redirect: "/admin/dashboard",
			name: "admin",
			component: Admin,
			beforeEnter: (to, from, next) => {
				if (!user.getUser()) {
					next({ name: "login" });
				} else {
					const isAdmin = user
						.getUser()
						.roles.find((e) => e.name === "ADMIN");

					if (isAdmin) {
						next();
					} else {
						next({ name: "login" });
					}
					// next();
				}
			},
			children: [
				{
					path: "dashboard",
					name: "dashboard",
					component: Dashboard,
				},
				{
					path: "users",
					name: "users",
					component: Users,
				},
				{
					path: "testimonials",
					name: "testimonials",
					component: Testimonials,
				},
				{
					path: "settings",
					name: "settings",
					component: Settings,
				},
			],
		},
		{
			path: "/tickets/:id",
			component: Tickets,
		},
		{
			path: "/login",
			component: UserLogin,
			name: "login",
			beforeEnter: (to, from, next) => {
				if (user.getUser()) {
					next({ name: "app" });
				} else {
					next();
				}

				// next();
			},
		},

		{
			path: "/register",
			component: Register,
			name: "register",
		},
		{
			path: "/",
			redirect: "/app/tickets",
		},
	],
});

export default router;
