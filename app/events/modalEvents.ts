export const triggerLoginModal = () => {
  const event = new CustomEvent("triggerLogin");
  window.dispatchEvent(event);
};
