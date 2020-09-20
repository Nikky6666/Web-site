import React from "react";

export function withSuspense<WSP>(WrappedComponent: React.ComponentType) {
    return (props: WSP) => {
     return <React.Suspense fallback={<div>Loading...</div>}>
         <WrappedComponent {...props} />
     </React.Suspense>
    }
}