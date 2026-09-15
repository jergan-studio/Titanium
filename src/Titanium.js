import { WebsiteEmbed } from './WebsiteEmbed.js';

export class Titanium {
  constructor(options = {}) {
    const allowed = ['light', 'medium', 'ultra'];
    this.intensity = allowed.includes(options.intensity) ? options.intensity : 'medium';
    this.fpsTarget = Number.isFinite(options.fpsTarget) ? Math.max(30, Math.min(240, options.fpsTarget)) : 60;
    this.active = false;
    this._raf = null;
    this._last = 0;
    this._boundFrame = this._frame.bind(this);
  }

  activate() {
    if (this.active) return this;
    this.active = true;
    if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
      this._last = performance.now();
      this._raf = window.requestAnimationFrame(this._boundFrame);
    }
    return this;
  }

  deactivate() {
    this.active = false;
    if (this._raf !== null && typeof window !== 'undefined' && typeof window.cancelAnimationFrame === 'function') {
      window.cancelAnimationFrame(this._raf);
    }
    this._raf = null;
    return this;
  }

  _frame(now) {
    if (!this.active) return;
    const delta = now - this._last;
    this._last = now;
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('titanium:frame', { detail: { delta, fpsTarget: this.fpsTarget, intensity: this.intensity } }));
      this._raf = window.requestAnimationFrame(this._boundFrame);
    }
  }

  smooth(element, properties = {}) {
    if (!element || typeof element.animate !== 'function') return null;
    const durationByIntensity = { light: 180, medium: 140, ultra: 100 };
    return element.animate([properties.from ?? {}, properties.to ?? {}], {
      duration: properties.duration ?? durationByIntensity[this.intensity],
      easing: properties.easing ?? 'ease-out',
      fill: 'both'
    });
  }

  embed(options = {}) {
    if (options.type !== 'website') throw new Error('Titanium currently supports website embeds with type: website.');
    return new WebsiteEmbed(options);
  }
}
