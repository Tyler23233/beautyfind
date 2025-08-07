export async function loadComponent(id, file) {
  const el = document.getElementById(id);
  if (!el) return;
  try {
    const res = await fetch(`/templates/${file}`);
    const html = await res.text();
    el.innerHTML = html;
  } catch (e) {
    console.error('Failed to load component', file, e);
  }
}
