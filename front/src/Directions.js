export default function Directions({ directions }) {
  return (
    <>
      {directions.map((step,i) => {
        return <p key={i}>{step}</p>
      })}
    </>
  )
}