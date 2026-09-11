// Files under public/ are served relative to the app's path prefix: with
// ROOT_URL https://magic.earthref.org/MagIC, Meteor strips a leading /MagIC from
// every request before looking in public/, so a hardcoded src="/MagIC/people/x.jpg"
// resolves to public/people/x.jpg and 404s. Prepend the runtime prefix (empty when
// the app is served from the host root, e.g. local `meteor` on :3000).
export default function assetUrl(path) {
  const prefix = __meteor_runtime_config__.ROOT_URL_PATH_PREFIX || '';
  return `${prefix}${path}`;
}
