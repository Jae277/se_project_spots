export function setButtontext(btn,isLoading,loadingtext = "Saving...",defaultText = "Save") {
    if(isLoading) {
        btn.textContent = isLoading ? loadingText : defaultText;
    }
    else {
        btn.disabled = isLoading; 
    }
}