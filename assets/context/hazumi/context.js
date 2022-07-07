import React from 'react';

const contextKey = '__HAZUMI_CONTEXT__';

export function getHazumiContext() {
  let context = (React.createContext)[contextKey];

  if (!context) {
    Object.defineProperty(React.createContext, contextKey, {
      value: context = React.createContext({}),
      enumerable: false,
      writable: false,
      configurable: true,
    });

    context.displayName = 'HazumiContext';
  }

  return context;
}

export { getHazumiContext as resetHazumiContext }