/**
 * Script tag ID and type used to embed ISR state.
 * @internal
 */
export const ISR_SCRIPT_ID = 'isr-state';
export const ISR_SCRIPT_TYPE = 'application/json';

/**
 * Interface for the expected data structure within the ISR script tag.
 */
export interface ISRData {
  revalidate: number | null;
  errors?: string[]; // Make errors optional
}

/**
 * Extracts ISR configuration data (revalidate time, errors) embedded in a specific script tag within the HTML.
 * Uses a regular expression for extraction and includes error handling for parsing.
 *
 * @param html The HTML string to parse.
 * @returns An object containing the extracted `revalidate` time (or null if not found/invalid) and any `errors`.
 * Returns `{ revalidate: null, errors: [] }` if the script tag is not found or parsing fails.
 * @example
 * ```typescript
 * const { revalidate, errors } = getRouteISRDataFromHTML(html);
 * if (revalidate !== null) {
 *   console.log(`Revalidate time: ${revalidate} seconds`);
 * }
 * ```
 */
export function getRouteISRDataFromHTML(html: string): ISRData & { errors: string[] } {
  const defaultResult: ISRData & { errors: string[] } = { revalidate: null, errors: [] };

  if (!html || typeof html !== 'string') {
    return defaultResult;
  }

  // Regex to find the script tag and capture its content
  // - Looks for <script id="isr-state" type="application/json" ... >
  // - Allows for other attributes and whitespace variations
  // - Captures content between tags non-greedily
  const regex = new RegExp(
    `<script\\s+id=["']${ISR_SCRIPT_ID}["']\\s+type=["']${ISR_SCRIPT_TYPE}["'](?:\\s+[^>]*)?>([\\s\\S]*?)<\\/script>`,
    'i' // Case-insensitive matching
  );

  const match = html.match(regex);

  if (!match || !match[1]) {
    // Script tag not found or empty
    return defaultResult;
  }

  const jsonContent = match[1].trim();

  if (!jsonContent) {
    // Content is empty
    return defaultResult;
  }

  try {
    const parsedData = JSON.parse(jsonContent) as Partial<ISRData>; // Use Partial for safety

    // Validate the 'revalidate' property
    let revalidate: number | null = null;
    if (parsedData.revalidate === null || (typeof parsedData.revalidate === 'number' && parsedData.revalidate >= 0)) {
      revalidate = parsedData.revalidate;
    } else if (parsedData.revalidate !== undefined) {
      console.warn(`Invalid 'revalidate' value found in ISR data: ${parsedData.revalidate}. Using null.`);
    }

    const errors = Array.isArray(parsedData.errors) ? parsedData.errors : [];

    return { revalidate, errors };

  } catch (error) {
    console.error(`Failed to parse ISR JSON state from script tag. Content: "${jsonContent}"`, error instanceof Error ? error : undefined);
    return { ...defaultResult, errors: ['Failed to parse ISR JSON state.'] };
  }
}
