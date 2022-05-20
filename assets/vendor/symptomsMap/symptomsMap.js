const selectHotspot = (e) => {
    const clickedHotspot = e.target.parentElement;
    const container = clickedHotspot.parentElement;

    // only include hotspots within same image to allow one open hotspot per image; change "container" to "document" to allow only one open hotspot for entire page:
    const hotspots = container.querySelectorAll(".lg-hotspot");
    hotspots.forEach(hotspot => {
        if (hotspot === clickedHotspot) {
            hotspot.classList.toggle("lg-hotspot--selected");
        } else {
            hotspot.classList.remove("lg-hotspot--selected");
        }
    });
}

(() => {
    const buttons = document.querySelectorAll(".lg-hotspot__button");
    buttons.forEach(button => {
        button.addEventListener("click", selectHotspot);
    });
})();