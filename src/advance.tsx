import React, {Suspense} from "react";
const Memo = React.lazy(() => import("./reduction"))
export default function Sample(): JSX.Element {
    return(
        <Suspense fallback={<div>Loading...</div>}>
            <Memo />
        </Suspense>
    )
}

export function Sample2(): JSX.Element {
    return(
        <Suspense fallback={<div>Loading...</div>}>
            <Memo />
        </Suspense> 
    )
}

