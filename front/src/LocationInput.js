import React, { useState } from "react";
import { ip } from "./config";

export const useInput = (initialValue) => {
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
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (started) {
      resetFrom()
      resetTo()
      navigate('', '')
    } else {
      navigate(from, to)
    }
    setStarted(!started)
  }

  const { value: from, bind: bindFrom, reset: resetFrom } = useInput('');
  const { value: to, bind: bindTo, reset: resetTo } = useInput('');

  const [started, setStarted] = useState(false)

  return (
    <form onSubmit={handleSubmit} className="main-input">
      <input className = "inputBox" placeholder="From" type="text" {...bindFrom} />
      <input className= "inputBox" placeholder="To" type="text" {...bindTo} />
      <br />
      <input className="inputBox2" type="submit" value={started ? "Finish" : "Start"} />
    </form>
  );
}