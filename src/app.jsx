/**
 * refs:
 *  - https://react.dev/reference/react/Component#render-returns
 *  - https://stackoverflow.com/questions/72011260/draw-svg-with-dynamic-value-on-canvas
 *  - https://stackoverflow.com/questions/41571622/how-to-include-css-style-when-converting-svg-to-png
 *  - https://stackoverflow.com/a/53703704
 */

import { useEffect, useMemo } from 'preact/hooks';
import validateColor from 'validate-color';
import {
  BrowserRouter,
  Route,
  Routes,
  useParams,
  useLocation,
  useSearchParams,
} from 'react-router-dom';

import './app.css';

function DynamicFaviconTitle({ color = "black" }) {

  const faviconStr = useMemo(
    () => `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.345834 15.345834" width="16" height="16">
        <path id="background" fill="#fff" d="M1.05833 0H14.2875c.58631 0 1.05833.472017 1.05833 1.058334V14.2875c0 .586317-.47202 1.058334-1.05833 1.058334H1.05833C.47201 15.345834 0 14.873817 0 14.2875V1.058334C0 .472017.47201 0 1.05833 0z" paint-order="markers stroke fill"/>
        <path id="fullscreen" d="M1.05833 14.287501V9.682827h1.47676v3.127919h3.12792v1.476755zm0-8.618981V1.058334h4.60468v1.482265H2.53509V5.66852zm8.61898 8.618981v-1.476755h3.12792V9.682827h1.48227v4.604674zm3.12792-8.618981V2.540599H9.67731V1.058334h4.61019V5.66852z"/>
        <path id="droplet" fill="${( color == "transparent") ? "black" : color }" d="M7.64764 12.439955c-1.02488 0-1.89311-.358586-2.60484-1.075773-.71169-.717214-1.06748-1.596148-1.06748-2.636805 0-.79399.16741-1.543884.50147-2.249691.3343-.705772.74601-1.373035 1.235-2.001773L7.65792 1.96094l1.97604 2.514973c.45906.628738.86327 1.296001 1.21256 2.001773.34946.705807.52399 1.455701.52399 2.249691 0 1.04065-.36424 1.919591-1.09281 2.636805-.72859.717182-1.60527 1.075773-2.63006 1.075773z"/>
      </svg>
    `,
    [color]
  );

  useEffect(() => {
    let canvas = document.createElement("canvas");
    canvas.height = 16;
    canvas.width = 16;

    let ctx = canvas.getContext("2d");

    let DOMURL = window.URL || window.webkitURL || window;
    let svgBlob = new Blob([ faviconStr ], { type: 'image/svg+xml' });
    let url = DOMURL.createObjectURL(svgBlob);

    let imgFav = new Image();
    imgFav.src = url;
    imgFav.onload = () => {
      ctx.drawImage(imgFav, 0, 0);

      let faviconEl = document.querySelector("link[rel*='icon']");
      faviconEl.href = canvas.toDataURL();

      DOMURL.revokeObjectURL(url);
    };

    document.title = color;
  }, [ faviconStr ]);

  return false;
}

function ColorView() {
  const { color } = useParams();
  const { hash } = useLocation();
  const [ searchParams ] = useSearchParams();

  function validateColorCheck(colorString) {
    if (colorString && colorString !== '' && validateColor(colorString)) {
      return true;
    }
    return false;
  }

  function validateColorValue(colorVal) {
    if (colorVal && colorVal !== '' && validateColor(colorVal)) {
      return colorVal;
    }
    return false;
  }

  function failSafeValidate() {
    let validColor =
      validateColorValue(color) ||
      validateColorValue(hash) ||
      validateColorValue(searchParams.get('color')) ||
      'transparent';
    return validColor;
  }

  return (
    <>
      <div
        style={{
          backgroundColor: failSafeValidate(),
        }}
        className={`validate-color ${failSafeValidate() === 'transparent' ? 'invalid-color-code' : ''}`}
      ></div>

      <DynamicFaviconTitle color={failSafeValidate()}/>

    </>
  );
}

export function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/:color" element={<ColorView />} />
          <Route path="/" element={<ColorView />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
