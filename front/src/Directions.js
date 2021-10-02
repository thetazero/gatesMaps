export default function Directions({ directions }) {
  return (
    <div className="directions">
      {directions.map((step, i) => {
        return <p key={i}>{step}</p>
      })}
    </div>
  )
}