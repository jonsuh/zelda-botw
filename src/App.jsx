import { useState } from "react"
import Cards from "./Cards"
import { RECIPE_CATEGORIES } from "./recipeCategories"
import "./App.css"

import attack from "./recipes/attack.json"
import cold from "./recipes/cold.json"
import defense from "./recipes/defense.json"
import electric from "./recipes/electric.json"
import elixirs from "./recipes/elixirs.json"
import hearts from "./recipes/hearts.json"
import heartsMax from "./recipes/hearts-max.json"
import heat from "./recipes/heat.json"
import speed from "./recipes/speed.json"
import stamina from "./recipes/stamina.json"
import stealth from "./recipes/stealth.json"

const FILTER_OPTIONS = [
  { ...RECIPE_CATEGORIES.hearts, data: hearts },
  { ...RECIPE_CATEGORIES["hearts-max"], data: heartsMax },
  { ...RECIPE_CATEGORIES.stamina, data: stamina },
  { ...RECIPE_CATEGORIES.speed, data: speed },
  { ...RECIPE_CATEGORIES.stealth, data: stealth },
  { ...RECIPE_CATEGORIES.cold, data: cold },
  { ...RECIPE_CATEGORIES.heat, data: heat },
  { ...RECIPE_CATEGORIES.electric, data: electric },
  { ...RECIPE_CATEGORIES.attack, data: attack },
  { ...RECIPE_CATEGORIES.defense, data: defense },
  { ...RECIPE_CATEGORIES.elixirs, data: elixirs },
]

export default function App() {
  const [filters, setFilters] = useState(
    FILTER_OPTIONS.reduce((acc, filter) => {
      acc[filter.type] = true
      return acc
    }, {}),
  )
  const [filterText, setFilterText] = useState("")

  const updateFilter = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }))
  }

  const clearAllFilters = () => {
    setFilters(
      FILTER_OPTIONS.reduce((acc, filter) => {
        acc[filter.type] = false
        return acc
      }, {}),
    )
  }

  return (
    <>
      <div className="filter">
        <div className="filter__icons">
          {FILTER_OPTIONS.map((filter) => (
            <>
              <input
                key={`input-${filter.type}`}
                type="checkbox"
                id={`filter_${filter.type}`}
                checked={filters[filter.type]}
                onChange={(event) =>
                  updateFilter(filter.type, event.target.checked)
                }
              />
              <label
                key={`label-${filter.type}`}
                htmlFor={`filter_${filter.type}`}
              >
                {filter.icon}
              </label>
            </>
          ))}

          <button type="button" onClick={clearAllFilters}>
            ❌
          </button>
        </div>
        <div className="filter__text">
          <input
            type="text"
            placeholder="Filter by name or ingredient"
            onChange={(event) =>
              setFilterText(event.target.value.toLowerCase())
            }
          />
        </div>
      </div>
      <div className="cards-wrap">
        {FILTER_OPTIONS.map(
          (filter) =>
            filters[filter.type] && (
              <Cards
                key={filter.type}
                type={filter.type}
                data={filter.data}
                filter={filterText}
              />
            ),
        )}
      </div>
    </>
  )
}
