
class ColorPicker {
    //
    constructor(root) {
        //
        this.root = root;
        this.colorjoe = colorjoe.rgb(this.root.querySelector(".colorjoe"));
        this.selectedColor = null;
        this.savedColors = this.getSavedColors();
        this.colorjoe.show()
        this.setSelectedColor("#ffffff");
        this.colorjoe.on("change", color => {
            this.setSelectedColor(color.hex(), true);
        });
        this.root.querySelectorAll(".saved-color").forEach((el, i) => {
            this.showSavedColor(el, this.savedColors[i]);
            el.addEventListener("mouseup", e => {
                if (e.button == 1) {
                    this.saveColor(this.selectedColor, i);
                    this.showSavedColor(el, this.selectedColor);
                }
                this.setSelectedColor(el.dataset.color);
            });
        });
    }

    saveColor(color, i) {
        this.savedColors[i] = color;
        localStorage.setItem("colorpicker-saved", JSON.stringify(this.savedColors));
    }

    getSavedColors() {
        const saved = JSON.parse(localStorage.getItem("colorpicker-saved") || "[]");
        return new Array(6).fill("#ffffff").map((defaultColor, i) => {
            return saved[i] || defaultColor;
        });
    }

    setSelectedColor(color, skipCjUpdate = false) {
        this.selectedColor = color;
        this.root.querySelector(".selected-color-text").textContent = color;
        this.root.querySelector(".selected-color").style.background = color;
        if (!skipCjUpdate) {
            this.colorjoe.set(color);
        }
    }

    showSavedColor(element, color) {
        element.style.background = color;
        element.dataset.color = color;
    }
}
const cp = new ColorPicker(document.querySelector(".container"));