document.addEventListener("DOMContentLoaded", function () {
	// Wait until H5P has rendered
	const interval = setInterval(function () {
		const container = document.querySelector("body");
		
		if (container) {
			console.log("Check here")
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
			}

			clearInterval(interval); // stop checking
		}

	}, 500);
});