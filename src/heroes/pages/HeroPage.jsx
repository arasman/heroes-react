import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { getHeroById } from '../helpers';

export const HeroPage = () => {
  const {id} = useParams();
  
  const hero = getHeroById(id);
  if (!hero) {
    // return <>404 - Not found</>
    return <Navigate to="/marvel"/>
  }
  return (
    <h1>Hero</h1>
  )
}
