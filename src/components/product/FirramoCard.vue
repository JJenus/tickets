<script setup></script>

<template>
	<div class="position-relative">
		<div class="circles">
			<div class="circle circle-1"></div>
			<div class="circle circle-2"></div>
		</div>

		<div class="card-group">
			<div class="card">
				<div class="logo">
					<img
						src="/logo/feramo-logo-mini.png"
						alt="Visa"
					/>
				</div>
				<div class="chip">
					<img
						src="https://raw.githubusercontent.com/dasShounak/freeUseImages/main/chip.png"
						alt="chip"
					/>
				</div>
				<div class="number">0123 4567 8910 1112</div>
				<div class="name">Even Better</div>
				<div class="from">12/22</div>
				<div class="to">01/25</div>
				<div class="ring"></div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	/* Background circles start */
	.circle {
		position: absolute;
		border-radius: 50%;
		background: radial-gradient(#006db3, #29b6f6);
	}
	.circles {
		position: absolute;
		height: 270px;
		width: 450px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.circle-1 {
		height: 180px;
		width: 180px;
		top: -50px;
		left: -60px;
	}
	.circle-2 {
		height: 200px;
		width: 200px;
		bottom: -90px;
		right: -90px;
		opacity: 0.8;
	}
	/* Background circles end */

	/* .card-group {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	} */

    @media (min-width: 576px) {
        .card {
            width: 450px;
        }
    }

	.card {
		position: relative;
		height: 270px;
		border-radius: 25px;
		background: rgba(201, 153, 207, 0.2);
		backdrop-filter: blur(10px);
		border: 2px solid rgba(255, 255, 255, 0.1);
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
		overflow: hidden;
	}

	.logo img,
	.chip img,
	.number,
	.name,
	.from,
	.to,
	.ring {
		position: absolute; /* All items inside card should have absolute position */
	}

	.logo img {
		top: 35px;
		right: 40px;
		width: 80px;
		height: auto;
		/* opacity: 0.8; */
	}

	.chip img {
		top: 120px;
		left: 40px;
		width: 50px;
		height: auto;
	}

	.number,
	.name,
	.from,
	.to {
		/* color: rgba(255, 255, 255, 0.8); */
        /* font-style: bold; */
		font-weight: 400;
		letter-spacing: 2px;
	}

	.number {
        font-size: 20px;
		left: 40px;
		bottom: 65px;
		font-family: "Nunito", sans-serif;
	}

	.name {
		font-size: 0.75rem;
		left: 40px;
		bottom: 35px;
	}

	.from {
		font-size: 0.75rem;
		bottom: 35px;
		right: 110px;
	}

	.to {
		font-size: 0.75rem;
		bottom: 35px;
		right: 40px;
	}

	/* The two rings on the card background */
	.ring {
		height: 500px;
		width: 500px;
		border-radius: 50%;
		background: transparent;
		border: 50px solid rgba(255, 255, 255, 0.1);
		bottom: -250px;
		right: -250px;
		box-sizing: border-box;
	}

	.ring::after {
		content: "";
		position: absolute;
		height: 600px;
		width: 600px;
		border-radius: 50%;
		background: transparent;
		border: 30px solid rgba(255, 255, 255, 0.1);
		bottom: -80px;
		right: -110px;
		box-sizing: border-box;
	}
</style>
