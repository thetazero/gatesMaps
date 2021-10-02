import { useState } from "react"


export default function GatesMap({ camX, camY, path }) {
  let [img, setImg] = useState('')
  let [canvas, setCanvas] = useState('')
  let [ctx, setCtx] = useState('')
  function magic() {
    console.log('hello')
    let c = document.getElementById("canvas")
    setCanvas(c)
    let ct = c.getContext('2d')
    setCtx(ct)
    let image = new Image()
    image.onload = () => {
      ct.drawImage(this, 0, 0)
    }
    image.src = 'data:image/svg+xml,' + escape(floor7)
    ct.drawImage(floor7, 33, 71, 104, 124, 21, 20, 87, 104)

  }
  return (
    <>
      <button onClick={magic}>magic</button>
      <canvas id="canvas"></canvas>
    </>
  )
}