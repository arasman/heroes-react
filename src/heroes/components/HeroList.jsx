import React from 'react'
import { getHeroesByPublisher } from '../helpers/getHeroesByPublisher'

export const HeroList = ({publisher}) => {
  const heroes = getHeroesByPublisher(publisher);
  return (
    <>
      <ul>
        {heroes.map((h) => {
          return <li key={h.id}>{h.superhero}</li>
        })}
      </ul>
    </>
  )
}
