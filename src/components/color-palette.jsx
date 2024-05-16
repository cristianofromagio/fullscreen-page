import { useEffect } from 'preact/hooks';
import { useParams } from 'react-router-dom';

import { validateColorValue } from '@/utils';
import { DynamicFaviconTitleGradient } from '@/components/dynamic-favicon';

export default function ColorPalette({}) {
  const { colors } = useParams();

  function failSafeValidate(color) {
    return validateColorValue(color) || 'transparent';
  }

  let validatedColors = [];

  const palette = colors.split('-')
    .map((el) => { return {name: el, key: window.crypto.randomUUID() }})
    .map((color) => {
      const validated = failSafeValidate(color.name);
      validatedColors.push(validated);
      return <div
        key={color.key}
        style={{
          backgroundColor: validated,
        }}
        className={`validate-color ${validated === 'transparent' ? 'invalid-color-code' : ''}`}></div>
    });

  useEffect(() => {
    document.querySelector("#app").style.flexDirection = "row";
  }, []);

  return (
    <>
      {palette}
      <DynamicFaviconTitleGradient colors={validatedColors}/>
    </>
  );
}
