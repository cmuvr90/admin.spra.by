import React, {ReactNode} from 'react';
import {FramePartialProvider} from "@/providers/FramePartialProvider";

export default function LoginLayout({children}: {children: ReactNode}) {
  return <FramePartialProvider>
    {children}
  </FramePartialProvider>
}
