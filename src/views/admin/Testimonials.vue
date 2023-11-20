<script setup>
	import { onMounted, ref } from "vue";
	import axios from "axios";
	import Testimonial from "../../components/admin/testimonials/Testimonial.vue";

	import { util } from "../../stores/utility";
	import { alert } from "../../stores/utility";

	const env = import.meta.env;
	const testimonials = ref([]);
	const searchKey = ref(null);
	const form = ref({
		testimony: null,
		rating: null,
		userName: null,
	});

	const loading = ref(false);

	function save($event) {
		if (!$event.target.checkValidity()) {
			return;
		}

		loading.value = true;
		let config = {
			method: "POST",
			url: `${env.VITE_BE_API}/testimonials`,
			data: form.value,
		};

		axios
			.request(config)
			.then((response) => {
				console.log(response.data);
				loadTestimonies();
				alert.success();
				$event.target.reset();
				form.value.rating = null;
				form.value.userName = null;
				form.value.testimony = null;
			})
			.catch(function (error) {
				console.log(error);
				alert.error("Failed");
			})
			.finally(() => {
				loading.value = false;
			});
	}

	async function loadTestimonies() {
		let config = {
			method: "GET",
			url: `${env.VITE_BE_API}/testimonials`,
		};

		axios
			.request(config)
			.then((response) => {
				console.log(response.data);
				testimonials.value = response.data;
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	function search() {
		console.log(searchKey.value);
		util.search(".testimony", searchKey.value);
	}

	onMounted(() => {
		loadTestimonies();
	});
</script>

<template>
	<div
		class="pis-md-3 d-flex justify-content-between align-items-end ps-lg-0 mt-md-2 pt-md-4 pb-md-2"
	>
		<div class="me-5">
			<h1 class="h2 pt-xl-1 mb-3 pb-2 pb-lg-3">Testimonials</h1>
		</div>
	</div>

	<div class="mb-3 border-bottom pb-3">
		<h1 class="fs-6">Add testimonial</h1>

		<form
			@submit.prevent="save($event)"
			class="needs-validation"
			novalidate
		>
			<div class="form-floating mb-4">
				<input
					class="form-control"
					type="text"
					id="fl-text"
					placeholder="Name"
					v-model="form.userName"
					required
				/>
				<label for="fl-text">Name</label>
			</div>

			<!-- Floating label: Select -->
			<div class="form-floating mb-4">
				<select
					v-model="form.rating"
					class="form-select"
					id="fl-select"
					required
				>
					<option value="1" selected>1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
				</select>
				<label for="fl-select">Rating</label>
			</div>

			<!-- Floating label: Textarea -->
			<div class="form-floating mb-3">
				<textarea
					class="form-control"
					id="fl-textarea"
					style="height: 8rem"
					placeholder="Your Testimony"
					v-model="form.testimony"
					required
				></textarea>
				<label for="fl-textarea">Testimony</label>
			</div>

			<div class="col-12 col-md-2 col-lg-1">
				<button
					:class="loading ? 'disabled' : ''"
					type="submit"
					class="btn btn-outline-secondary w-100"
				>
					<span v-if="!loading"> Save </span>
					<span v-else>
						<span
							class="spinner-grow spinner-grow-sm"
							role="status"
							aria-hidden="true"
						></span>
						Please wait...
					</span>
				</button>
			</div>
		</form>
	</div>

	<div class="d-flex justify-content-between align-items-end mb-5">
		<div class="me-5">
			<h1 class="h6 pt-xl-1 mb-3 pb-2 pb-lg-3">Testimonies</h1>
		</div>
		<div>
			<form class="input-group mb-4">
				<input
					type="text"
					placeholder="Search testimonials..."
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
		<div
			v-for="testimonial in testimonials"
			class="col-12 col-md-6 col-lg-4 testimony mb-5"
		>
			<Testimonial :testimonial="testimonial" :key="testimonial.id" :admin="true"></Testimonial>
		</div>
	</div>

	<div v-if="testimonials.length < 1" class="text-center text-muted">
		<small>No testimonies found</small>
	</div>
</template>
