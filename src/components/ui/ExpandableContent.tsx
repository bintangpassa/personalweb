// src/components/ExpandableContent.tsx
import { useState, useRef, useEffect } from 'react';

export default function ExpandableContent({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current && !expanded) {
      contentRef.current.style.maxHeight = '9rem';
    } else if (contentRef.current) {
      contentRef.current.style.maxHeight = contentRef.current.scrollHeight + 'px';
    }
  }, [expanded]);

  return (
    <>
      <div
        ref={contentRef}
        className="prose dark:prose-invert prose-sm max-h-32 overflow-hidden transition-all duration-300 ease-in-out"
      >
        {children}
      </div>
      <button
        type="button"
        className="mt-2 text-sm"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Show less' : 'Read more'}
      </button>
    </>
  );
}