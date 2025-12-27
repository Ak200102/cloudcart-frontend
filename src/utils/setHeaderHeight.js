export function setHeaderHeight() {
  const header = document.getElementById("site-header");
  if (!header) return;
  const height = header.offsetHeight;
  document.documentElement.style.setProperty(
    "--header-height",
    height + "px"
  );
}
