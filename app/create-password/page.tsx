"use client";
import { Suspense } from "react";
import CreatePass from "./create";





export default function Page() {
  return(
      <Suspense fallback={<div>Chargement...</div>}>
        <CreatePass />
      </Suspense>
  )

}



