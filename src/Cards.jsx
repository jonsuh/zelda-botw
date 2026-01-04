import { RECIPE_CATEGORIES } from "./recipeCategories"
import "./Cards.css"

export default function Cards({ type = "", data = [], filter = "" }) {
  return (
    <>
      {data
        .filter(
          (item) =>
            item.name.toLowerCase().includes(filter) ||
            item.ingredients.toLowerCase().includes(filter),
        )
        .map((item, i) => (
          <Card key={i} type={type} {...item} />
        ))}
    </>
  )
}

export function Card({
  type = "",
  name = "",
  ingredients = "",
  hearts = "",
  effect = "",
  duration = "",
  price,
  strength = "",
  notes = "",
}) {
  const ingredientsArray = ingredients.split(", ")
  const icon = RECIPE_CATEGORIES[type]?.icon || ""

  const stats = [
    { value: hearts, icon: "💗" },
    { value: duration, icon: "⏱" },
    { value: price, icon: "💰" },
    { value: strength, icon: "💪" },
  ]

  return (
    <div className={`card card--${type}`}>
      <div className="card__content">
        <div className="card__left">
          <h3 className="card-name">
            {icon} {name}
          </h3>
          {effect && <div className="card-effect">{effect}</div>}
          <ul
            className={`card-ingredients ${
              ingredientsArray.length > 1 ? "card-ingredients--columns" : ""
            }`}
          >
            {ingredientsArray.map((item, key) => {
              return <li key={key}>{item}</li>
            })}
          </ul>
        </div>
        <div className="card__right">
          {stats.map(
            (stat, index) =>
              stat.value && (
                <div key={index} className="has-icon" data-icon={stat.icon}>
                  {stat.value}
                </div>
              ),
          )}
        </div>
        <div className="card__bottom">
          <div className="card-notes">{notes}</div>
        </div>
      </div>
    </div>
  )
}
