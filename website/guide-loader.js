/* Lazy entry point. No provider requests or guide code run until a visitor opens it. */
(() => {
  'use strict';
  const launcher = document.createElement('button');
  launcher.id = 'mission-guide-launcher';
  launcher.type = 'button';
  launcher.className = 'mission-guide-launcher';
  launcher.textContent = '✦ Mission Guide';
  launcher.setAttribute('aria-expanded', 'false');
  launcher.setAttribute('aria-haspopup', 'dialog');
  // Small critical styles keep the entry point usable before the full stylesheet loads.
  const style = document.createElement('style');
  style.textContent = '.mission-guide-launcher{position:fixed;right:max(20px,env(safe-area-inset-right));bottom:max(20px,env(safe-area-inset-bottom));z-index:25;background:#e8ba80;color:#172012;border:1px solid #e8ba80;border-radius:99px;padding:14px 20px;box-shadow:0 8px 35px #0006;font:600 14px Arial,sans-serif;cursor:pointer;min-height:48px}.mission-guide-launcher:focus-visible{outline:3px solid #fff;outline-offset:4px}.mission-guide-load-status{position:fixed;z-index:25;right:20px;bottom:80px;max-width:min(330px,90vw);padding:14px;background:#111a17;color:#eee;border:1px solid #e8ba80;font:14px Arial,sans-serif}';
  document.head.append(style);
  document.body.append(launcher);
  let loaded;
  let loading = false;
  let status;
  function load() {
    if (loaded) return loaded;
    loaded = new Promise((resolve, reject) => {
      const css = document.createElement('link');
      css.rel = 'stylesheet'; css.href = 'guide.css';
      document.head.append(css);
      const script = document.createElement('script');
      script.src = 'guide.js'; script.async = true;
      script.onload = resolve;
      script.onerror = () => { script.remove(); css.remove(); loaded = null; reject(new Error('Guide assets unavailable')); };
      document.body.append(script);
    });
    return loaded;
  }
  launcher.addEventListener('click', async () => {
    if (loading) return;
    if (window.MissionGuide) { window.MissionGuide.toggle(); return; }
    loading = true;
    launcher.setAttribute('aria-busy', 'true');
    if (!status) { status = document.createElement('p'); status.className = 'mission-guide-load-status'; status.setAttribute('role', 'status'); document.body.append(status); }
    status.hidden = false; status.textContent = 'Opening the built-in museum guide…';
    try {
      await load();
      if (!window.MissionGuide) throw new Error('Guide did not initialize');
      status.hidden = true; window.MissionGuide.open();
    } catch {
      status.textContent = 'The guide could not load. Keep guide.js and guide.css beside index.html, then try again. The museum remains available.';
    } finally { loading = false; launcher.removeAttribute('aria-busy'); }
  });
})();

