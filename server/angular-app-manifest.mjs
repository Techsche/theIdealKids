
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 25376, hash: '1c8e23592aa398f93bd7abb032f7855ca479566e6f4bc14a589dbcf9417b3852', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17892, hash: '1cfe32ba1cd52ceffcba8adee89b9fe8aca3cecf5fb57af0f3f881b934fdaa15', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 143097, hash: 'edbf927d4587064bc412707e5eeb45ef7f2b1832d0001c0e070e4f9695b9abae', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-OPUTW5UJ.css': {size: 8043, hash: 'i68XcmjPijU', text: () => import('./assets-chunks/styles-OPUTW5UJ_css.mjs').then(m => m.default)}
  },
};
