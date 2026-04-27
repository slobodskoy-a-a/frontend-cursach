let host;

export function createToastHost(parent) {
  host = document.createElement("div");
  host.className = "toast-host";
  parent.append(host);
}

export function toast(text, { timeout = 1600 } = {}) {
  if (!host) return;

  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = text;

  host.append(el);

  setTimeout(() => {
    el.classList.add("toast--hide");
    setTimeout(() => el.remove(), 250);
  }, timeout);
}
