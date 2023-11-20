<script setup>
	import moment from "moment";
	import { ref } from "vue";
	import { user } from "@/stores/user";
	import axios from "axios";

	const env = import.meta.env;

	const props = defineProps({
		session: {
			required: true,
		},
		active: {
			required: true,
		},
	});

	const deleted = ref(false);

	function getStatus() {
		return props.session.deviceId == props.active.deviceId;
	}

	function getTime() {
		const fromNow = moment(props.session.createdAt).fromNow();
		const timer = fromNow.split(" ")[1];

		let check = ["minutes", "seconds", "hours"].find((e) => timer == e);

		if (!check) {
			return moment(props.session.createdAt).format("LLL");
		}

		return fromNow;
	}

	function removeSession() {
		let config = {
			method: "DELETE",
			url: `${env.VITE_BE_API}/auth/sessions/${props.session.id}`,
		};

		axios
			.request(config)
			.then((response) => {
				console.log(response.data);
				deleted.value = true;
				if (getStatus()) {
					user.logout();
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
</script>

<template>
	<li
		v-if="!deleted"
		class="d-flex align-items-center justify-content-between mb-4"
	>
		<div class="d-flex align-items-start me-3">
			<div class="bg-secondary rounded-1 p-2">
				<i class="bx bx-desktop fs-xl text-primary d-block"></i>
			</div>
			<div class="ps-3">
				<div class="fw-medium text-nav mb-1">
					{{ session.device }} – {{ session.city }},
					{{ session.country }}
				</div>
				<span
					class="d-inline-block fs-sm text-muted border-end pe-2 me-2"
				>
					{{ session.browser }}
				</span>
				<span
					v-if="getStatus()"
					class="badge bg-success shadow-success"
				>
					Active now
				</span>
				<span v-else class="d-inline-block fs-sm text-muted">
					{{ getTime() }}
				</span>
			</div>
		</div>
		<button
			@click="removeSession()"
			type="button"
			class="btn btn-outline-secondary px-3 px-sm-4"
		>
			<i class="bx bx-x fs-xl ms-sm-n1 me-sm-1"></i>
			<span class="d-none d-sm-inline">Remove</span>
		</button>
	</li>
</template>
