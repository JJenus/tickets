<script setup>
	import { ref } from "vue";
	import FirramoCardVue from "./FirramoCard.vue";

	const email = ref("support@firramo.com");
	const AppName = import.meta.env.VITE_APP_NAME;
	function signUp() {
		document.getElementById("sign-up").click();
	}
</script>

<template>
	<section
		class="light-mode bg-light bg-size-cover bg-repeat-0 bg-position-center position-relative overflow-hidden py-5 mb-4"
		style="
			background-image: url(assets/img/landing/digital-agency/hero-bg.svg);
		"
	>
		<div
			class="container position-relative zindex-2 pt-5 pb-md-2 pb-lg-4 pb-xl-5"
		>
			<div class="row pt-3 pb-2 py-md-4">
				<!-- Text -->
				<div
					class="col-xl-5 col-md-6 pt-lg-5 text-center text-md-start mb-4 mb-md-0"
				>
					<h1 class="display-3 pb-2 pb-sm-3">
						Welcome to {{ AppName }}
					</h1>
					<p
						class="fs-lg d-md-none d-xl-block pb-2 pb-md-0 mb-4 mb-md-5"
					>
						An easy-to-use platform and a dedicated team, here to
						support you every step of the way.
					</p>
					<div
						class="d-flex justify-content-center justify-content-md-start pb-2 pt-lg-2 pt-xl-0"
					>
						<a
							@click="signUp()"
							data-bs-toggle="modal"
							data-bs-target="#auth-modal"
							class="btn btn-lg btn-primary shadow-primary me-3 me-sm-4"
							>Join {{ AppName }}</a
						>
					</div>
					<div
						class="d-flex align-items-center justify-content-center justify-content-md-start text-start pt-4 pt-lg-5 mt-xxl-5"
					>
						<div class="d-flex d-none me-3">
							<div
								class="d-flex align-items-center justify-content-center bg-light rounded-circle"
								style="width: 52px; height: 52px"
							>
								<img
									src="/assets/img/avatar/14.jpg"
									class="rounded-circle"
									width="48"
									alt="Avatar"
								/>
							</div>
							<div
								class="d-flex align-items-center justify-content-center bg-light rounded-circle ms-n3"
								style="width: 52px; height: 52px"
							>
								<img
									src="/assets/img/avatar/08.jpg"
									class="rounded-circle"
									width="48"
									alt="Avatar"
								/>
							</div>
							<div
								class="d-flex align-items-center justify-content-center bg-light rounded-circle ms-n3"
								style="width: 52px; height: 52px"
							>
								<img
									src="/assets/img/avatar/15.jpg"
									class="rounded-circle"
									width="48"
									alt="Avatar"
								/>
							</div>
						</div>
						<div class="text-primaryy">
							<strong>400k+</strong> users already with us
						</div>
					</div>
				</div>

				<!-- Parallax gfx -->
				<div class="col-xl-7 col-md-6 d-md-flex justify-content-around">
					<div class="parallax" style="max-width: 675px">
						<FirramoCardVue></FirramoCardVue>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
