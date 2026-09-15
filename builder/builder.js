class BuilderWebsiteEmbed {
  constructor({ url, width, height }) {
    this.url = url;
    this.width = width;
    this.height = height;
  }

  render(container) {
    container.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = 'website';
    const iframe = document.createElement('iframe');
    iframe.src = this.url;
    iframe.title = 'Titanium website preview';
    iframe.width = String(this.width);
    iframe.height = String(this.height);
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    wrapper.appendChild(iframe);
    container.appendChild(wrapper);
    return iframe;
  }
}

const canvas = document.querySelector('#canvas');
const url = document.querySelector('#url');
const width = document.querySelector('#width');
const height = document.querySelector('#height');
let current;

function embedWebsite() {
  try {
    const value = new URL(url.value.trim());
    if (!['http:', 'https:'].includes(value.protocol)) throw new Error('Only HTTP and HTTPS websites are supported.');
    current = new BuilderWebsiteEmbed({
      url: value.href,
      width: Math.max(200, Number(width.value) || 900),
      height: Math.max(150, Number(height.value) || 600)
    });
    current.render(canvas);
  } catch (error) {
    alert(error.message);
  }
}

document.querySelector('#embed').addEventListener('click', embedWebsite);
document.querySelector('#addWebsite').addEventListener('click', () => url.focus());

document.querySelector('#devtools').addEventListener('click', () => {
  if (current) current.render(canvas);
  console.info('Titanium Builder Tools: preview refreshed.');
});

canvas.addEventListener('contextmenu', (event) => {
  event.preventDefault();
  document.querySelector('.context')?.remove();

  const menu = document.createElement('div');
  menu.className = 'context';
  menu.style.left = `${event.clientX}px`;
  menu.style.top = `${event.clientY}px`;

  for (const [label, action] of [
    ['Inspect', () => console.log('Titanium Inspect', event.target)],
    ['Reload Preview', () => current?.render(canvas)],
    ['Website Embed', () => url.focus()],
    ['Tools / DevTools', () => console.log('Titanium Builder Tools opened')]
  ]) {
    const button = document.createElement('button');
    button.textContent = label;
    button.onclick = () => { action(); menu.remove(); };
    menu.appendChild(button);
  }

  document.body.appendChild(menu);
  const close = () => { menu.remove(); document.removeEventListener('click', close); };
  setTimeout(() => document.addEventListener('click', close), 0);
});
