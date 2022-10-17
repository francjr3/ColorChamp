// Pallette Generator

class Color {
	constructor(hex, element) {
		this.hex = hex;
		this.element = element;
		this.locked = false;
	}


	setHex(hex) {
		this.hex = hex;
		this.element.style.backgroundColor = hex;
		this.element.querySelector(".color-input").value = hex;
	}


	setLocked(locked) {
		this.locked = locked;
		if (locked) {
			this.element.querySelector(".lock-toggle").classList.add("is-locked");
            this.element.querySelector("img").src = "images/closed_lock.svg";
		} else {
			this.element.querySelector(".lock-toggle").classList.remove("is-locked");

			this.element.querySelector("img").src = "images/open_lock.svg";
		}
	}


	toggleLocked() {
		this.setLocked(!this.locked);
	}


	generateHex() {
		if (this.locked) {
			return
		}
		const chars = "0123456789ABCDEF";
		let color = "#";
		for (let i = 0; i < 6; i++) {
			color += chars[Math.floor(Math.random() * 16)];
		}
		this.setHex(color);
	}


	copyToClipboard() {
		const input = this.element.querySelector(".color-input");
		input.select();
		document.execCommand("copy");
		input.blur();

		this.element.classList.add("copied");
		setTimeout(() => {
			this.element.classList.remove("copied");
		}, 1000);
	}
}

const color_elements = document.querySelectorAll('.colors .color');

const colors = [];

for (let i = 0; i < color_elements.length; i++) {
	const color_element = color_elements[i];

    // Get HTML objects
	const input = color_element.querySelector(".color-input");
	const lock_toggle = color_element.querySelector(".lock-toggle");
	const copy_btn = color_element.querySelector(".copy-hex");
	const hex = input.value;
	const color = new Color(hex, color_element);

    // Add event listeners to objects
	input.addEventListener('input', (e) => color.setHex(e.target.value));
	lock_toggle.addEventListener('click', () => color.toggleLocked());
	copy_btn.addEventListener('click', () => color.copyToClipboard());

    // Store class instances for future reference
	color.generateHex();
	colors.push(color);
}

document.querySelector(".generator-button").addEventListener("click", () => {
	for (let i = 0; i < colors.length; i++) {
        if (!colors[i].islocked) {
		    colors[i].generateHex();
        }
	}
});

document.addEventListener('keypress', (e) => {
	if (e.code.toLowerCase() === "space") {
		document.querySelector(".generator-button").click();
	}
})
