import { ISROptions } from '../models';

// this script tag will be included in the page if one of the routes on the page
// has `revalidate` key in its route data
const isrScriptTag = '<script id="isr-state" type="application/json">';

export function getISROptions(html: string): ISROptions {
  const indexOfScriptTag = html?.indexOf(isrScriptTag);

  // check if script tag is not included
  if (!html || indexOfScriptTag === -1) {
    return { revalidate: null, errors: [] };
  }

  const isrScript = html.substring(indexOfScriptTag); // start from script till the end of html file
  const indexOfCloseScriptTag = isrScript.indexOf("</script>"); // first occurrence of closing script tag

  const val = isrScript
    .substring(0, indexOfCloseScriptTag) // remove close script tag
    .replace(isrScriptTag, "") // remove start script tag

  return JSON.parse(val);
}
