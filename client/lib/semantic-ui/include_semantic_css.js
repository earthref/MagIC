// The compiled Semantic UI stylesheet is served out of public/, so unlike Meteor's
// own bundled CSS its URL does not get the app's path prefix applied for us
// (ROOT_URL is https://magic.marfik.earthref.org/MagIC on marfik). A static <link>
// in the head can't know that prefix, so build the tag at runtime instead.

const cssPath = 'lib/semantic-ui/compiled/2.4.2/semantic.css';

export default function includeSemanticCss() {
  const prefix = __meteor_runtime_config__.ROOT_URL_PATH_PREFIX || '';
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = `${prefix}/${cssPath}`;

  // Resolve once the stylesheet is in, so the app can hold off rendering and never
  // paints unstyled the way a <link> in the head would have prevented.
  const loaded = new Promise((resolve) => {
    link.onload = resolve;
    link.onerror = resolve;
  });

  document.head.appendChild(link);
  return loaded;
}
