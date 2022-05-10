import { NgxIsrService, NgxIsrState } from '../ngx-isr.service';

export function addIsrDataBeforeSerialized(isrService: NgxIsrService, doc: Document): () => Promise<void> {
  return () => addISRDataToBody(doc, isrService.getState());
}

// append script with revalidate and errors data for the current route
function addISRDataToBody(doc: Document, { revalidate, errors }: NgxIsrState): Promise<void> {
  return new Promise<void>(resolve => {
    const script = doc.createElement('script');
    script.id = 'isr-state';
    script.setAttribute('type', 'application/json');
    script.textContent = JSON.stringify({ revalidate, errors });
    doc.body.appendChild(script);
    resolve();
  })
}
