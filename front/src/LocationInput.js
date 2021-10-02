import React, { useState } from "react";

export const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: event => {
        setValue(event.target.value);
      }
    }
  }
}

export default function LocationInput({ navigate }) {
  const { value: from, bind: bindFrom } = useInput('');
  const { value: to, bind: bindTo } = useInput('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    navigate(from, to)
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Origin: <input type="text" {...bindFrom} />
      </label>
      <label>
        Destination <input type="text" {...bindTo} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}