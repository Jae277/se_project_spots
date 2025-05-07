export function setButtontext(btn, isLoading, loadingText = "Saving...", defaultText = "Save") {
    if (isLoading) {
        btn.textContent = isLoading ? loadingText : defaultText;
    } else {
        btn.disabled = isLoading; 
    }
}
