export function downloadFileHTML ({
  contents,
  name = 'download.txt',
  type = 'text/plain',
  lang = 'en',
}) {
  const _a = document.createElement('a');

  const htmlDocument = document.implementation.createHTMLDocument(name);
  const wrapper = `<div class="page-content svelte-1mdlt3n" id="view-report">${contents.innerHTML}</div>`
  htmlDocument.body.innerHTML = wrapper;
  let file;

  // set charset
  const meta = document.createElement('meta');
  meta.setAttribute('charset', 'utf-8');
  htmlDocument.head.appendChild(meta);
  const styleLinks =
    `<meta name="theme-color" content="#333333" />
    <!-- WAI Website Components: https://wai-website-theme.netlify.app/components/ -->
    <link rel="stylesheet" href="https://w3.org/WAI/assets/css/style.css?1573220675560713000" />
    <!-- Generated styles -->
    <link href="{__BASEPATH__}/bundles/global.css" rel="stylesheet" />
    <link href="{__BASEPATH__}/bundles/main.css" rel="stylesheet" />
    <link rel="icon" type="image/png" href="{__BASEPATH__}/images/favicon.png" />`;

  htmlDocument.head.innerHTML += styleLinks;

  // set lang
  htmlDocument.documentElement.setAttribute('lang', lang);

  // remove certain elements
  Array.from(
    htmlDocument.querySelectorAll('button, input, aside, footer, .Controls, #site-header, .Nav, .strip'),
  ).forEach((el) => {
    el.parentNode.removeChild(el);
  });

  // remove certain attributes
  Array.from(
    htmlDocument.querySelectorAll('[tabindex], [class]'),
  ).forEach((el) => {
    el.removeAttribute('tabindex');
    // el.removeAttribute('class');
  });

  // add CSS
  const styleEl = document.createElement('style');
  const styleElContents = document.createTextNode(`
  .default-grid {
    display: flex
  }
  `);
  styleEl.appendChild(styleElContents);
  htmlDocument.head.append(styleEl);

  file = new Blob(
    [`<!doctype HTML>${htmlDocument.documentElement.outerHTML}`],
    {
      type: 'text/html',
    },
  );

  _a.href = URL.createObjectURL(file);

  _a.download = name;

  _a.click();
}

export function downloadFileJSON ({
  contents,
  name = 'download.txt',
  type = 'text/plain',
}) {
  const _a = document.createElement('a');
  const file = new Blob([contents], {type});

  _a.href = URL.createObjectURL(file);
  _a.download = name;

  _a.click();
}

export async function saveJsonToServer ({
  contents,
  name = 'download.txt',
}) {
  const res = await fetch('__SERVERPATH__/api/audit-report', {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      data: contents,
      filename: name,
    }),
  });
  return res.json();
}
