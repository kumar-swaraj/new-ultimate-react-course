import { useEffect } from 'react';

export function useKey(key, action) {
  useEffect(
    function () {
      const callback = function (e) {
        if (e.code.toLowerCase() !== key.toLowerCase()) return;

        action();
      };

      document.addEventListener('keydown', callback);

      return () => document.removeEventListener('keydown', callback);
    },
    [action, key]
  );
}
