<template>
	<div class="container-fluid px-0 mx-0">
		<div
			id="bovada"
			style="margin: -3px; margin-top: 5px"
			class="p-0 d-flex flex-row justify-content-center position-relative"
		>
			<!-- WATER MARK -->
			<div class="pt-2 px-0 mx-0">
				<div v-for="i in 5" class="p-0 m-0">
					<div class="p-0 logo-stamp fw-bold">
						<!-- <-- width="300" -->
						<span class="h-text">#LOTTO</span>
					</div>

					<div class="p-0 logo-stamp">
						<span class="h-text">Bayern</span>
					</div>

					<!-- Next -->
				</div>

				<!-- Next -->
			</div>

			<!-- MAIN TABLE -->
			<div class="d-flex flex-row justify-content-center my-5 w-100">
				<div class="w-100 mt-0">
					<div class="d-flex mb-3 flex-column text-center w-100">
						<div class="mb-3 w-100">
							<!-- <-- width="300" -->
							<img
								width="250"
								src="/tickets/oddset/oddset-black.png"
								alt=""
							/>
						</div>
					</div>

					<div class="mt-5 mb-2 fw-bold text-center">
						<span>Es bediente Sie Frau Leiko</span>
					</div>

					<div class="px-3">
						<table
							class="table table-borderless fw-bold align-bottom mb-0"
						>
							<thead class="tb-divider">
								<tr>
									<td>Nr</td>
									<td>Spiel / Ereignis</td>
								</tr>
							</thead>
							<tbody class="tb-divider">
								<tr class="">
									<td class="">1</td>
									<td>
										<div>
											<span class="me-3">44</span>
											<span
												>Greuther Furth -
												Paderborn</span
											>
										</div>

										<div class="p-0 m-0">
											<table
												class="table table-borderless p-0 m-0"
											>
												<tr class="inner">
													<td>
														<span class="me-4">
															Tip:
														</span>
														5:0
													</td>
													<td>Quote:</td>
													<td class="text-end">
														16.50
													</td>
												</tr>
											</table>
										</div>
										<div>Exalors Ergebnis?</div>
									</td>
								</tr>
							</tbody>
							<tfoot class="tb-divider">
								<tr style="padding-bottom: 0px">
									<td colspan="2">
										<div class="d-flex">
											<div class="text-center me-5">
												<div>System</div>
												<span>2</span>
											</div>

											<div class="text-center ms-5 ps-3">
												<div>Wetten</div>
												<span>1</span>
											</div>
										</div>
									</td>
								</tr>

								<tr>
									<td colspan="2">
										<div class="d-flex">
											<div class="me-5">
												<div>Anzahl</div>
												<span>Einsatz pro wette</span>
											</div>

											<div class="text-center">
												<div>1</div>
												<span>300,00 $</span>
											</div>
										</div>
									</td>
								</tr>
							</tfoot>
						</table>

						<table
							class="table mt-2 table-borderless fw-bold align-bottom mb-0"
						>
							<tbody>
								<tr>
									<td>Gewinnabholung ab:</td>
									<td class="text-end">30/07/23</td>
								</tr>
								<tr>
									<td>
										<div class="d-flex flex-column">
											<span>Max. mogi. Gewin:</span>
											<span> Gesambeinsatz: </span>
											<span> BETRAG inkl. Gebühr: </span>
										</div>
									</td>
									<td>
										<div
											class="d-flex flex-column text-end"
										>
											<span>68 062,50 $</span>
											<span> 3000,00 $ </span>
											<span> 300,80 $ </span>
										</div>
									</td>
								</tr>
								<tr>
									<td class="pt-3">
										<span class="me-2">Kartennummer:</span>
										203625887
									</td>
								</tr>

								<tr>
									<td colspan="2">
										<div class="text-center">
											Gewinnabholung nach Beendigung des
											stattfindenden Wetter genusses, ens
											jedoch nach dem oben ngegebenen
											Termin
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<!-- WATER MARK -->
			<div class="pt-2 px-0 mx-0">
				<div v-for="i in 2" class="p-0 m-0">
					<div class="p-0 logo-stamp fw-bold">
						<!-- <-- width="300" -->
						<span class="v-text"> Bitte Rückseite Spalten </span>
					</div>

					<div class="p-0 logo-stamp">
						<div
							class="bg-dark mx-auto"
							style="
								height: 10px;
								width: 10px;
								border-radius: 50%;
							"
						></div>
					</div>

					<!-- Next -->

					<div class="p-0 logo-stamp fw-bold">
						<!-- <-- width="300" -->
						<span class="v-text"> Mit Verrantworrug </span>
					</div>

					<div class="p-0 logo-stamp">
						<div
							class="bg-dark mx-auto"
							style="
								height: 10px;
								width: 10px;
								border-radius: 50%;
							"
						></div>
					</div>
				</div>

				<!-- Next -->
			</div>
		</div>
	</div>
</template>

<style scoped>
	.v-text {
		writing-mode: vertical-rl; /* or vertical-lr for left-to-right */
		text-orientation: unset; /* Ensures characters are upright */
	}

	.h-text {
		font-weight: bold;
		writing-mode: vertical-rl; /* or vertical-lr for left-to-right */
		text-orientation: unset; /* Ensures characters are upright */
		transform: rotate(180deg);
		/* transform-origin: bottom; */
	}
	table {
		font-size: 13px !important;
	}
	tr > td {
		vertical-align: top;
		padding-left: 0;
		padding-right: 0;
		font-family: Helvetica, Arial, sans-serif;
	}
	/* .fontloader body {
		font-size: 16px/1.6;
		font-family: Helvetica, Arial, sans-serif;
		letter-spacing: -0.006em;
	} */

	.logo-stamp {
		margin: 0px;
		padding: 0px;
		margin-bottom: 10px;
	}

	.logo-stamp .h-text {
		margin-bottom: 0;
		margin-top: 10px;
	}

	.logo-img {
		height: 100px;
	}

	.inner td {
		margin: 0px !important;
		padding: 0;
	}

	.tb-divider {
		border-top: 2px solid #666666 !important;
		border-bottom: 2px solid #333 !important;
	}
</style>
