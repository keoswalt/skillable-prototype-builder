'use client';

import { Accordion } from './Accordion';

export default function AccordionExample() {
  return (
    <Accordion maxWidth="2xl" className="mt-4">
      <details>
        <summary>Typography</summary>
        <p className="pt-2">
          Sample body content for typography section goes here. You can put any HTML you
          like inside.
        </p>
      </details>

      <details>
        <summary>Typography</summary>
        <p className="pt-2">Another sample body content area.</p>
      </details>

      <details>
        <summary>Typography</summary>
        <p className="pt-2">Yet another sample body content area.</p>
      </details>
    </Accordion>
  );
} 