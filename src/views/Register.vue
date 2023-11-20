<script setup>
	import { onMounted, ref } from "vue";
	import axios from "axios";
	import { user } from "@/stores/user";
	import { util, userIp } from "@/stores/utility";
	import DeviceDetector from "device-detector-js";

	const env = import.meta.env;
	env.VITE_BE_API = util.backendApi;

	// console.log(env.VITE_BE_API);

	const loading = ref(false);
	const pType = ref("password");

	const form = ref({
		email: null,
		password: null,
		cPassword: null,
	});

	const device = ref({
		deviceId: "",
		ip: "",
		deviceName: "",
		browser: "",
	});

	const loginError = ref(null);

	function togglePassword() {
		if (pType.value === "text") {
			pType.value = "password";
		} else pType.value = "text";
	}

	async function getIP() {
		// if (userIp.getIp()) {
		// 	return userIp.getIp();
		// }

		const options = {
			method: "GET",
			url: "https://api.ipify.org/?format=json",
		};

		let ip = null;

		await axios
			.request(options)
			.then(function (response) {
				console.log("IP,", response.data);
				userIp.saveIp(response.data);
				ip = response.data.ip;
				// console.log(ip);
			})
			.catch(function (error) {
				console.error(error);
			});

		return ip;
	}

	async function sumitLogin() {
		if (loading.value) {
			return;
		}
		if (!form.value.email || !form.value.password) {
			loginError.value = "Please fill form correctly";
			return;
		}
		if (form.value.password !== form.value.cPassword) {
			loginError.value = "Passwords don't match";
			return;
		}
		const { cPassword, ...data } = form.value;

		const auth = {
			user: data,
			device: device.value,
		};

		console.log(loginError.value);

		loading.value = true;

		console.log(data);

		let config = {
			method: "Post",
			url: `${env.VITE_BE_API}/auth/register`,
			data: auth,
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
				loading.value = false;
			});
	}

	onMounted(async () => {
		const userAgent = navigator.userAgent;

		console.log("User Agent: " + userAgent);

		const detector = new DeviceDetector({
			clientIndexes: true,
			deviceIndexes: true,
			deviceAliasCode: false,
		});

		const result = detector.parse(userAgent);

		console.log("result parse", result);
		const ip = await getIP();

		if (result.os.name.includes("Linux")) {
			device.value.deviceName = result.os.name;
		} else {
			device.value.deviceName =
				result.device.brand + " " + result.device.model;
		}

		device.value.browser = result.client.name;
		device.value.deviceId = result.client.version;
		device.value.ip = ip;

		console.log(device.value);
	});
</script>

<template>
	<div
		class="container d-flex align-items-center flex-wrap justify-content-center h-100 pt-5"
	>
		<div
			class="w-100 align-self-end pt-1 pt-md-4 pb-4"
			style="max-width: 526px"
		>
			<h1 class="text-center text-xl-start">Register</h1>
			<p class="text-center text-xl-start pb-3 mb-3">
				Already have an account?
				<a href="/login">login here.</a>
			</p>
			<p class="text-warning">
				If you're using a <span class="fw-bold">VPN</span> turn it
				<span class="fw-bold">off</span> and reload. You can only login
				same account with two devices.
			</p>
			<form
				class="tab-pane fade show active"
				autocomplete="off"
				id="signin"
				@submit.prevent="sumitLogin()"
			>
				<div class="mb-3">
					<label class="form-label" for="email1">Email address</label>
					<input
						class="form-control"
						type="email"
						id="email1"
						placeholder="johndoe@example.com"
						v-model="form.email"
					/>
				</div>
				<div class="mb-3">
					<label class="form-label" for="login-pass">Password</label>
					<div class="password-toggle">
						<input
							class="form-control"
							:type="pType"
							id="login-pass"
							v-model="form.password"
						/>
						<label
							@click="togglePassword()"
							class="password-toggle-btn"
						>
							<i class="bx bx-circle"></i>
						</label>
					</div>
				</div>

				<div class="mb-3">
					<label class="form-label" for="login-pass"
						>Confirm Password</label
					>
					<div class="password-toggle">
						<input
							class="form-control"
							:type="pType"
							id="login-pass"
							v-model="form.cPassword"
						/>
						<label class="password-toggle-btn">
							<i class="bx bx-vision-lashed"></i>
						</label>
					</div>
				</div>

				<div
					v-if="loginError"
					class="my-3 alert p-2 fs-sm alert-danger"
				>
					{{ loginError }}
				</div>

				<div class="mb-3 d-flex flex-wrap justify-content-between">
					<div class="form-check mb-2 d-none">
						<input
							class="form-check-input"
							type="checkbox"
							id="remember"
						/>
						<label class="form-check-label" for="remember"
							>Remember me</label
						>
					</div>
					<a class="fs-sm d-none" href="#">Forgot password?</a>
				</div>
				<button
					class="btn btn-primary d-block w-100"
					:class="loading ? 'disabled' : ''"
					type="submit"
				>
					<span v-if="!loading"> Submit </span>
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
			<a href="#" class="btn btn-link btn-lg d-none w-100"
				>Forgot your password?</a
			>
			<hr class="my-4" />
		</div>
	</div>
</template>
