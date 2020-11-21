import { useState, useEffect, RefObject, useRef } from 'react';

export function useDebounce<DataT = any>(value: any, delay: number): DataT {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useOnClickOutside(ref: RefObject<any>, handler: (event: MouseEvent | TouchEvent) => void) {
  useEffect(
    () => {
      const listener = (event: MouseEvent | TouchEvent) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}

/**
 * Convert order of items from string to array
 * @param orderString items order in a string
 */
export const getItemsOrderArray = (orderString: string) => orderString.split(',').filter((item) => item && item.length);

export const arrangeDataByOrder = (data?: any[], order?: string): any[] => {
  if (!data || !order) {
    return [];
  }
  const orderArray = getItemsOrderArray(order);
  return orderArray.map((id) => data.find((item) => item._id === id));
};

export function usePrevious(value: any) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}
