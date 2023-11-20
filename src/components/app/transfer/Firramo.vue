<script setup>
	import { inject, onMounted, ref } from "vue";
	import axios from "axios";
	import { alert } from "@/stores/utility";

	const env = import.meta.env;

	const props = defineProps({
		data: {
			required: true,
		},
	});

	const settings = inject("settings");
	const form = ref({
		email: null,
		amount: null,
	});
	const user = inject("user");
	const users = ref([]);
	const isValid = ref(false);
	const next = ref(false);
	const receiver = ref({});
	const loading = ref(false);

	function submit() {
		loading.value = true;
		const transfer = {
			userId: user.value.id,
			toUserId: receiver.value.id,
			amount: form.value.amount,
			currency: settings.value.currency,
			status: "success",
		};
		console.log(transfer);
		let config = {
			method: "POST",
			url: `${env.VITE_BE_API}/users/transfer`,
			data: transfer,
		};
		axios
			.request(config)
			.then((res) => {
				const data = res.data;
				console.log("yes: ", res);

				user.value.balance.amount =
					Number(user.value.balance.amount) -
					Number(form.value.amount);
				next.value = false;
				form.value.amount = null;
				form.value.email = null;

				alert.success("Success");
			})
			.catch((err) => {
				alert.error("Failed");
				console.log(err);
			})
			.finally(() => {
				loading.value = false;
			});
	}

	function loadUsers() {
		let config = {
			method: "GET",
			url: `${env.VITE_BE_API}/users`,
		};
		axios
			.request(config)
			.then((res) => {
				const data = res.data;
				users.value = data;
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function checkMail() {
		let found = users.value.find((user) => {
			return user.email == form.value.email;
		});

		if (found) {
			isValid.value = true;
			receiver.value = found;
			// console.log(found);
		} else {
			isValid.value = false;
		}
	}

	onMounted(() => {
		loadUsers();
		form.value = props.data;
	});
</script>

<template>
	<div>
		<div v-show="!next">
			<label class="form-label" for="reciever-email"
				>Reciever's email</label
			>
			<input
				type="text"
				class="form-control mb-3"
				id="reciever-email"
				v-model="form.email"
				@keyup="checkMail()"
			/>
			<p v-if="!isValid && form.email != null" class="text-danger fs-xs">
				User doesn't exist
			</p>
			<button
				class="btn btn-secondary d-block w-100"
				type="submit"
				:class="isValid ? '' : 'disabled'"
				@click="next = true"
			>
				Confirm
			</button>
		</div>

		<form v-show="next" @submit.prevent="submit()">
			<div class="d-flex flex-column mb-4 borider rounded p-0">
				<span class="mb-2">Amount: {{ form.amount }} </span>
				<span class="mb-2">Name: {{ receiver.name }}</span>
				<span>Email: {{ receiver.email }}</span>
			</div>
			<div class="d-flex">
				<button
					class="btn btn-outline-primary d-block me-2"
					type="button"
					@click="next = false"
				>
					Back
				</button>
				<button
					class="btn btn-secondary d-block"
					type="submit"
					:class="!isValid || loading ? 'disabled' : ''"
				>
					<span
						v-if="loading"
						class="spinner-border-sm spinner-border"
					></span>

					<span v-else>Send</span>
				</button>
			</div>
		</form>
	</div>
</template>
