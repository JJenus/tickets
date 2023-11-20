<script setup>
	import { inject, onMounted, ref } from "vue";
	import UserVue from "@/components/admin/users/User.vue";
	import { util } from "../../stores/utility";

	const env = import.meta.env;
	const users = inject("users");
	const searchKey = ref(null);

	function search() {
		util.search(".user", searchKey.value);
	}

	onMounted(() => {});
</script>

<template>
	<div
		class="ps-md-3 d-flex justify-content-between align-items-end ps-lg-0 mt-md-2 pt-md-4 pb-md-2"
	>
		<div class="me-5">
			<h1 class="h2 pt-xl-1 mb-3 pb-2 pb-lg-3">
				Users ({{ users.length }})
			</h1>
		</div>
		<div>
			<form class="input-group mb-4">
				<input
					type="text"
					placeholder="Search users..."
					class="form-control rounded pe-5"
					@keyup="search()"
					v-model="searchKey"
				/>
				<i
					class="bx bx-search position-absolute top-50 end-0 translate-middle-y me-3 fs-lg zindex-5"
				></i>
			</form>
		</div>
	</div>

	<div class="row">
		<UserVue v-for="user in users" :user="user"></UserVue>
	</div>
	<div v-if="users.length < 1" class="text-center text-muted">
		<small>No user found</small>
	</div>
</template>
