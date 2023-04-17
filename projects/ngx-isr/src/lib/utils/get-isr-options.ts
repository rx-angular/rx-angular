/**
 * Get ISR options from html string
 * @param html
 * @returns
 * @example
 * ```typescript
 * const { revalidate, errors } = getISROptions(html);
 * ```
 * @internal
 */
export function getRouteISRDataFromHTML(html: string): {
  revalidate: number | null;
  errors: string[];
} {
  const indexOfScriptTag = html?.indexOf(ISR_SCRIPT_TAG);

  // check if script tag is not included
  if (!html || indexOfScriptTag === -1) {
    return { revalidate: null, errors: [] };
  }

  // start from script till the end of html file
  const isrScript = html.substring(indexOfScriptTag);

  // first occurrence of closing script tag
  const indexOfCloseScriptTag = isrScript.indexOf('</script>');

  const val = isrScript
    .substring(0, indexOfCloseScriptTag) // remove close script tag
    .replace(ISR_SCRIPT_TAG, ''); // remove start script tag

  return JSON.parse(val);
}

/**
 * Script tag that will be included in the page if one of the routes on the page
 * has `revalidate` key in its route data
 *
 * @internal
 */
const ISR_SCRIPT_TAG = '<script id="isr-state" type="application/json">';
