import React, { useState } from "react";

export default function LocationInput({ directions }) {

  return (
    <>
      {directions.map((step,i) => {
        return <p key={i}>{step}</p>
      })}
    </>
  )
}