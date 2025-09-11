document.addEventListener("DOMContentLoaded", function () {
	// Wait until H5P has rendered
	const interval = setInterval(function () {
		const container = document.querySelector("body");
		
		if (container) {
			// Get the first content block
			const firstKey = Object.keys(H5PIntegration.contents)[0];
			const metadata = H5PIntegration.contents[firstKey].metadata;

			if (metadata && metadata.title) {
				if (!container.querySelector(".custom-h5p-title")) {
					const heading = document.createElement("h2");
					heading.className = "custom-h5p-title";
					heading.innerText = "Quiz : " + metadata.title;
					// heading.innerText = metadata.title;

					container.insertBefore(heading, container.firstChild);
				}
			}

			var dataa = H5PIntegration.contents[firstKey].jsonContent;
			var questions = document.querySelectorAll(".question-container");
			if (questions && dataa) {
				dataa  = JSON.parse(dataa);
				questions.forEach((question, index) => {
					// Create a new div for the question number
					const questionNumberDiv = document.createElement("div");
					questionNumberDiv.className = "question-chapiter-title";
					questionNumberDiv.innerText = dataa.questions[index].metadata.extraTitle;


					// Insert the question number div at the beginning of the question container
					question.insertBefore(questionNumberDiv, question.firstChild);
				});
			}

			const prevBtn = document.querySelector('[aria-label="Retour"]');
			const nextBtn = document.querySelector('[aria-label="Suivant"]');

			document.addEventListener("keydown", function (event) {
				if (event.key === "ArrowLeft" && prevBtn) {
					prevBtn.click();
				}
				if (event.key === "ArrowRight" && nextBtn) {
					nextBtn.click();
				}
			});

			clearInterval(interval); // stop checking
		}

	}, 500);
});