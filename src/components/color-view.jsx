import {
  useParams,
  useLocation,
  useSearchParams,
} from 'react-router-dom';

import { validateColorValue } from '@/utils';
import DynamicFaviconTitle from '@/components/dynamic-favicon';

export default function ColorView({}) {
  const { color } = useParams();
  const { hash } = useLocation();
  const [ searchParams ] = useSearchParams();

  function failSafeValidate() {
    let validColor =
      validateColorValue(hash) ||
      validateColorValue(color) ||
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
