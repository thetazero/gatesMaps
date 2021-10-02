import React, { useState } from "react";

export default function LocationInput({ directions }) {

  return (
    <>
      {directions.map(step => {
        return <p>{step}</p>
      })}
    </>
  )
}