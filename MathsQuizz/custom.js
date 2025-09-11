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
					questionNumberDiv.innerText =  "Question " + (index + 1) + " : " + dataa.questions[index].metadata.extraTitle;
					
					
					// Insert the question number div at the beginning of the question container
					question.insertBefore(questionNumberDiv, question.firstChild);
				});
			}

			const prevBtns = document.querySelectorAll('.h5p-question-prev.h5p-joubelui-button');
			const nextBtns = document.querySelectorAll('.h5p-question-next.h5p-joubelui-button');
			var quesIn = 0;

			document.addEventListener("keydown", function (event) {
				const grandPn = nextBtns[quesIn]?.parentElement?.parentElement;
				const grandPp = prevBtns[quesIn - 1]?.parentElement?.parentElement;
				if (event.key === "ArrowLeft" && prevBtns[quesIn - 1] && grandPp && getComputedStyle(grandPp).display !== "none") {
					prevBtns[quesIn - 1].click();
					quesIn--;
				}
				if (event.key === "ArrowRight" && nextBtns[quesIn] && grandPn && getComputedStyle(grandPn).display !== "none") {
					nextBtns[quesIn].click();
					quesIn++;
				}
			});


			clearInterval(interval); // stop checking
		}

	}, 500);
});