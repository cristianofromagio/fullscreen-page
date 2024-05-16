/**
 * refs:
 *  - https://react.dev/reference/react/Component#render-returns
 *  - https://stackoverflow.com/questions/72011260/draw-svg-with-dynamic-value-on-canvas
 *  - https://stackoverflow.com/questions/41571622/how-to-include-css-style-when-converting-svg-to-png
 *  - https://stackoverflow.com/a/53703704
 */

import './app.css';

import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import ColorView from '@/components/color-view';
import ColorPalette from '@/components/color-palette';

export function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/palette/:colors" element={<ColorPalette />} />
          <Route path="/:color" element={<ColorView />} />
          <Route path="/" element={<ColorView />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
