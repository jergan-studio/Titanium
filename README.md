# Titanium

Titanium is a Jergan Studio tool for making apps smoother and cleaner.

## JavaScript-only apps

Titanium supports JavaScript-only apps. The main entry point is:

```js
import { Titanium } from 'titanium-smooth';

const smoother = new Titanium({
  intensity: 'ultra',
  fpsTarget: 120
});

smoother.activate();
```

No HTML or Java code is required for a basic Titanium JavaScript app.

### Intensity

- `light` — minimal smoothing
- `medium` — balanced default
- `ultra` — stronger smoothing settings

### Animation

```js
smoother.smooth(element, {
  from: { transform: 'translateX(0px)' },
  to: { transform: 'translateX(100px)' }
});
```

Titanium also provides a Java source-cleaning tool in `java/Titanium.java`. Its purpose is to remove safe, useless whitespace and comments without trying to rewrite program logic.

## Project structure

```text
Titanium/
├── java/
│   └── Titanium.java
├── src/
│   └── Titanium.js
├── main.js
├── package.json
└── README.md
```
