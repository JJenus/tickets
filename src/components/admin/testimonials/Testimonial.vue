<script setup>
	import { onMounted, ref } from "vue";
	import axios from "axios";
	import { alert, util } from "@/stores/utility";

	const env = import.meta.env;
	const props = defineProps({
		testimonial: {
			required: true,
		},
		admin: {
			required: false,
		},
	});

	async function del() {
		let config = {
			method: "DELETE",
			url: `${env.VITE_BE_API}/testimonials/${props.testimonial.id}`,
		};

		axios
			.request(config)
			.then((response) => {
				console.log(response.data);
				alert.success();
				window.location.reload();
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	onMounted(() => {});
</script>

<template>
	<figure class="d-flex flex-column h-100 px-2 px-sm-0 mb-0 mx-2 testimony">
		<div class="card h-100 position-relative border-0 shadow-sm pt-4">
			<span
				class="btn btn-icon btn-primary shadow-primary pe-none position-absolute top-0 start-0 translate-middle-y ms-4"
			>
				<i class="bx bxs-quote-left"></i>
			</span>
			<button
				v-if="admin"
				@click="del()"
				class="btn btn-icon btn-sm btn-outline-danger shadow-primary position-absolute top-0 end-0 translate-middle-y ms-4"
			>
				<i class="bx bxs-trash-alt"></i>
			</button>
			<blockquote class="card-body pb-3 mb-0">
				<p class="mb-0">
					{{ testimonial.testimony }}
				</p>
			</blockquote>
			<div class="card-footer border-0 text-nowrap pt-0">
				<i
					:class="testimonial.rating >= 1 ? 'text-warning' : ''"
					class="bx bxs-star"
				></i>
				<i
					:class="testimonial.rating >= 2 ? 'text-warning' : ''"
					class="bx bxs-star"
				></i>
				<i
					:class="testimonial.rating >= 3 ? 'text-warning' : ''"
					class="bx bxs-star"
				></i>
				<i
					:class="testimonial.rating >= 4 ? 'text-warning' : ''"
					class="bx bxs-star"
				></i>
				<i
					:class="testimonial.rating >= 5 ? 'text-warning' : ''"
					class="bx bxs-star"
				></i>
			</div>
		</div>
		<figcaption class="d-flex align-items-center ps-4 pt-4">
			<img
				:src="testimonial.imgUrl || util.avatar"
				width="48"
				class="rounded-circle"
				alt="Albert Flores"
			/>
			<div class="ps-3">
				<h6 class="fs-sm fw-semibold mb-0">
					{{ testimonial.userName }}
				</h6>
				<span class="fs-xs text-muted d-none"></span>
			</div>
		</figcaption>
	</figure>
</template>
