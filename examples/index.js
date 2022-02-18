onload = () => {
	var url = "";
	setInterval(() => {
		if (url != document.URL) {
			if (!document.URL.includes("#")) {
				location.replace(document.querySelectorAll("#contents li a")[1].href);
			}
			url = document.URL;
			document.getElementById("main").src = url.substring(url.indexOf("#") + 1) + ".html";
			if (document.querySelector("#contents li.selected"))
				document.querySelector("#contents li.selected").removeAttribute("class");
			document.querySelector(`#contents li a[href='${url.substring(url.indexOf("#"))}']`).parentElement.classList.add("selected");
		}
	}, 50);
}