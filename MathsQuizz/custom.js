document.addEventListener("DOMContentLoaded", function () {
	// Wait until H5P has rendered
	const interval = setInterval(function () {
		const container = document.querySelector("body");
		
		if (container) {
			// Get the first content block
			const firstKey = Object.keys(H5PIntegration.contents)[0];
			const metadata = H5PIntegration.contents[firstKey].metadata;

			// Example: Insert the metadata.title
			if (metadata && metadata.title) {
				if (!container.querySelector(".custom-h5p-title")) {
					const heading = document.createElement("h2");
					heading.className = "custom-h5p-title";
					heading.innerText = "Quiz : " + metadata.title;
					// heading.innerText = metadata.title;

					container.insertBefore(heading, container.firstChild);
				}

				// for (const key in dataa) {
					// 	// if (Object.hasOwnProperty.call(metadata, key)) { // Important for avoiding inherited properties
					// 	// 	const value = metadata[key];
					// 	// 	console.log(`${key}: ${value}`);
					// 	// }
					// 	console.log(dataa);
					// }
					
					// console.log(dataa["extraTitle"]);
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

			clearInterval(interval); // stop checking
		}

	}, 500);
});