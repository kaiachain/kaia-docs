import React from 'react';
import KaiaChat from '@site/src/components/KaiaChat';

export default function Root({children}) {
  return (
    <>
      {children}
      <KaiaChat />
    </>
  );
}