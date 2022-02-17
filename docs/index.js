onload = () => {
	var main = document.getElementById("main"), contents = document.getElementById("contents");
	Array.from(main.querySelectorAll("h1")).forEach(elm => {
		elm.id = elm.innerText.replace(" ", "_");
		var li = document.createElement("li");
		li.innerHTML = `<a href="#${elm.id}">${elm.innerText}</a>`;
		contents.appendChild(li);
	});
	Array.from(main.querySelectorAll("h2")).forEach(elm => {
		var previousSibling = elm.previousSibling;
		while (previousSibling && previousSibling.nodeName.toLowerCase() != "h1") {
			previousSibling = previousSibling.previousSibling;
		}
		elm.id = previousSibling.id + "." + elm.innerText.substring(0, Math.min(elm.innerText.indexOf(" "), elm.innerText.indexOf(":")));
	})
	Array.from(main.querySelectorAll("pre, code")).forEach(hljs.highlightElement);
}