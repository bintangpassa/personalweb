import { useState, useRef, useEffect } from 'react';

type ExpandableContentProps = {
  children: React.ReactNode;
  className?: string;
  maxHeight?: string;
};

export default function ExpandableContent({
  children,
  className = 'prose dark:prose-invert prose-sm',
  maxHeight = '9rem',
}: ExpandableContentProps) {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current && !expanded) {
      contentRef.current.style.maxHeight = maxHeight;
    } else if (contentRef.current) {
      contentRef.current.style.maxHeight = contentRef.current.scrollHeight + 'px';
    }
  }, [expanded]);

  return (
    <>
      <div
        ref={contentRef}
        className={`max-h-32 overflow-hidden transition-all duration-300 ease-in-out ${className}`}
      >
        {children}
      </div>
      <button
        type="button"
        className="mt-2 text-sm"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Show less' : 'Show more'}
      </button>
    </>
  );
}