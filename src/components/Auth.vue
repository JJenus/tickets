<script setup>
	import { ref } from "vue";
	import axios from "axios";
	import { user } from "@/stores/user";
	import { util, userIp } from "@/stores/utility";

	const env = import.meta.env;
	env.VITE_BE_API = util.backendApi;

	const signIn = ref(true);

	const loadingReg = ref(false);

	const form = ref({
		name: null,
		email: null,
		password: null,
		cPassword: null,
	});

	const regError = ref(null);
	const loginError = ref(null);

	async function getIP() {
		if (userIp.getIp()) {
			return userIp.getIp();
		}

		const options = {
			method: "GET",
			url: "https://find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com/iplocation",
			params: { apikey: "873dbe322aea47f89dcf729dcc8f60e8" },
			headers: {
				"X-RapidAPI-Key":
					"dd4fc99074mshb1fc2941eca8399p1db32ejsn1e3a321da137",
				"X-RapidAPI-Host":
					"find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com",
			},
		};

		let ip = null;

		await axios
			.request(options)
			.then(function (response) {
				console.log(response.data);
				userIp.saveIp(response.data);
				ip = response.data.ip;
				console.log(ip);
			})
			.catch(function (error) {
				console.error(error);
			});

		return ip;
	}

	async function register() {
		regError.value = null;

		if (loadingReg.value) {
			return;
		}
		if (
			!form.value.email ||
			!form.value.name ||
			!form.value.password ||
			!form.value.cPassword
		) {
			regError.value = "Please fill form correctly";
			return;
		}

		console.log(regError.value);

		if (form.value.password !== form.value.cPassword) {
			regError.value = "Passwords don't match";
			return;
		}

		loadingReg.value = true;

		const { name, email, password } = form.value;
		console.log(email);

		const ip = await getIP();

		let config = {
			method: "Post",
			url: `${env.VITE_BE_API}/auth/register`,
			data: {
				name,
				email,
				password,
				ip: ip,
			},
		};

		axios
			.request(config)
			.then((response) => {
				console.log(response.data);
				if (response.data.error) {
					regError.value = response.data.error;
				} else {
					user.login(response.data);
					window.location.href = "/app";
				}
			})
			.catch(function (error) {
				console.log(error);
			})
			.finally(() => {
				loadingReg.value = false;
			});
	}

	async function sumitLogin() {
		if (loadingReg.value) {
			return;
		}
		if (!form.value.email || !form.value.password) {
			loginError.value = "Please fill form correctly";
			return;
		}

		console.log(loginError.value);

		loadingReg.value = true;

		const { email, password } = form.value;
		console.log(email);

		const ip = await getIP();

		let config = {
			method: "Post",
			url: `${env.VITE_BE_API}/auth/login`,
			data: {
				email,
				password,
				ip: ip,
			},
		};

		axios
			.request(config)
			.then((response) => {
				console.log(response.data);
				if (response.data.error) {
					loginError.value = response.data.error;
				} else {
					user.login(response.data);
					window.location.href = "/app";
				}
			})
			.catch(function (error) {
				console.log(error);
			})
			.finally(() => {
				loadingReg.value = false;
			});
	}
</script>

<template>
	<!-- Modal with tabs and forms -->
	<div class="modal" id="auth-modal" tabindex="-1" role="dialog">
		<div class="modal-dialog modal-fullscreen-sm-downi" role="document">
			<div class="modal-content">
				<!-- Modal header with nav tabs -->
				<div class="modal-header">
					<ul class="nav nav-tabs mb-0" role="tablist">
						<li class="nav-item fs-sm mb-0">
							<a
								class="nav-link active"
								href="#signin"
								data-bs-toggle="tab"
								role="tab"
								aria-selected="true"
								id="sign-in"
							>
								<i class="bx bx-lock-open fs-base me-2"></i>
								Sign in
							</a>
						</li>
						<li class="nav-item fs-sm mb-0">
							<a
								class="nav-link"
								href="#signup"
								data-bs-toggle="tab"
								role="tab"
								aria-selected="false"
								id="sign-up"
							>
								<i class="bx bx-user fs-base me-2"></i>
								Sign up
							</a>
						</li>
					</ul>
					<button
						class="btn-close"
						type="button"
						data-bs-dismiss="modal"
						aria-label="Close"
					></button>
				</div>

				<!-- Modal body with tab panes -->
				<div class="modal-body py-4">
					<div class="tab-content">
						<!-- Sign in form -->
						<form
							class="tab-pane fade show active"
							autocomplete="off"
							id="signin"
							@submit.prevent="sumitLogin()"
						>
							<div class="mb-3">
								<label class="form-label" for="email1"
									>Email address</label
								>
								<input
									class="form-control"
									type="email"
									id="email1"
									placeholder="johndoe@example.com"
									v-model="form.email"
								/>
							</div>
							<div class="mb-3">
								<label class="form-label" for="login-pass"
									>Password</label
								>
								<div class="password-toggle">
									<input
										class="form-control"
										type="password"
										id="login-pass"
										v-model="form.password"
									/>
									<label class="password-toggle-btn">
										<input
											class="password-toggle-check"
											type="checkbox"
										/>
									</label>
								</div>
							</div>

							<div
								v-if="loginError"
								class="my-3 alert p-2 fs-sm alert-danger"
							>
								{{ loginError }}
							</div>

							<div
								class="mb-3 d-flex flex-wrap justify-content-between"
							>
								<div class="form-check mb-2">
									<input
										class="form-check-input"
										type="checkbox"
										id="remember"
									/>
									<label
										class="form-check-label"
										for="remember"
										>Remember me</label
									>
								</div>
								<a class="fs-sm" href="#">Forgot password?</a>
							</div>
							<button
								class="btn btn-primary d-block w-100"
								:class="loadingReg ? 'disabled' : ''"
								type="submit"
							>
								<span v-if="!loadingReg"> Sign in </span>
								<span v-else>
									<span
										class="spinner-grow spinner-grow-sm"
										role="status"
										aria-hidden="true"
									></span>
									Loading...
								</span>
							</button>
						</form>

						<!-- Sign up form -->
						<form
							class="tab-pane fade"
							autocomplete="on"
							id="signup"
							@submit.prevent="register()"
						>
							<div class="mb-3">
								<label class="form-label" for="name"
									>Full name</label
								>
								<input
									class="form-control"
									type="text"
									id="name"
									placeholder="John Doe"
									v-model="form.name"
								/>
							</div>
							<div class="mb-3">
								<label class="form-label" for="email2"
									>Email address</label
								>
								<input
									class="form-control"
									type="email"
									id="email2"
									placeholder="johndoe@example.com"
									v-model="form.email"
								/>
							</div>
							<div class="mb-3">
								<label class="form-label" for="pass2"
									>Password</label
								>
								<div class="password-toggle">
									<input
										class="form-control"
										type="password"
										id="pass2"
										v-model="form.password"
									/>
									<label class="password-toggle-btn">
										<input
											class="password-toggle-check"
											type="checkbox"
										/>
									</label>
								</div>
							</div>
							<div class="mb-4">
								<label class="form-label" for="pass3"
									>Confirm password</label
								>
								<div class="password-toggle">
									<input
										class="form-control"
										type="password"
										id="pass3"
										v-model="form.cPassword"
									/>
									<label class="password-toggle-btn">
										<input
											class="password-toggle-check"
											type="checkbox"
										/>
									</label>
								</div>
							</div>

							<div
								v-if="loginError"
								class="my-3 alert p-2 fs-sm alert-danger"
							>
								{{ loginError }}
							</div>

							<button
								class="btn btn-primary d-block"
								type="submit"
								:class="loadingReg ? 'disabled' : ''"
							>
								<span v-if="!loadingReg"> Sign up </span>
								<span v-else>
									<span
										class="spinner-grow spinner-grow-sm"
										role="status"
										aria-hidden="true"
									></span>
									Loading...
								</span>
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
