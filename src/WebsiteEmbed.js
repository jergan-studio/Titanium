export class WebsiteEmbed {
  constructor(options = {}) {
    this.url = options.url || 'about:blank';
    this.width = options.width || 800;
    this.height = options.height || 600;
    this.title = options.title || 'Embedded Website';
    this.container = options.container || null;
    this.iframe = null;
  }

  mount(container = this.container) {
    if (typeof document === 'undefined') return null;
    if (!container) throw new Error('Titanium WebsiteEmbed needs a container.');

    const iframe = document.createElement('iframe');
    iframe.src = this.url;
    iframe.title = this.title;
    iframe.width = String(this.width);
    iframe.height = String(this.height);
    iframe.style.border = '0';
    iframe.style.display = 'block';
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');

    container.appendChild(iframe);
    this.container = container;
    this.iframe = iframe;
    return iframe;
  }

  setURL(url) {
    if (typeof url !== 'string' || !url.trim()) throw new Error('A website URL is required.');
    this.url = url.trim();
    if (this.iframe) this.iframe.src = this.url;
    return this;
  }

  reload() {
    if (this.iframe) this.iframe.contentWindow.location.reload();
    return this;
  }

  remove() {
    this.iframe?.remove();
    this.iframe = null;
    return this;
  }
}
