export function setButtontext(
  btn,
  isLoading,
  loadingText = "Saving...",
  defaultText = "Save"
) {
  btn.textContent = isLoading ? loadingText : defaultText;
}

