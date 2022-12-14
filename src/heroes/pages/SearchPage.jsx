import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'

import { useForm } from '../../hook/useForm'
import { HeroCard } from '../components'
import { getHeroByName } from '../helpers'

export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {q=''} = queryString.parse(location.search);
  const heroes = getHeroByName(q);
  const showSearch = (q.trim().length == 0)
  const showError = (q.trim().length > 0 && heroes.length == 0);
  const {searchText, onInputChange} = useForm({
    searchText: q,
  });
  const onSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`?q=${searchText}`)
  }
  return (
    <>
    <h1>Search</h1>
    <hr/>
    <div className="row">

    
    <div className="col-5">
      <h4>Searching</h4>
      <hr/>
      <form onSubmit={onSearchSubmit} data-testid="searchForm">
        <input 
          type="text"
          placeholder='Search a hero'
          className='form-control'
          name="searchText"
          autoComplete='off'
          value={searchText}
          onChange={onInputChange}
        />
        <button className='btn btn-outline-primary mt-1'>Search</button>
      </form>
    </div>
    <div className="col-7">
      <h4>Results</h4>
      <hr/>
      {/* {
        (q.trim().length == 0)  &&
        <div className="alert alert-primary">
            Search a hero
        </div>
      }
      {
        (q.trim().length > 0 && heroes.length === 0) &&
        <div className="alert alert-danger">
          Hero not found <b>{q}!!</b>
        </div>
      } */}
      
      {/* {
        (q.trim().length == 0) 
        ?
        <div className="alert alert-primary">
            Search a hero
        </div>
        : heroes.length === 0 &&
        <div className="alert alert-danger">
          Hero not found <b>{q}!!</b>
        </div>
      } */}

      {/* <div className="alert alert-primary" style={{display: (q.trim().length == 0 ? '':'none') }}>
            Search a hero
      </div>

      <div className="alert alert-danger" style={{display: (q.trim().length > 0 && heroes.length === 0 ? '':'none')}}>
          Hero not found <b>{q}!!</b>
      </div> */}

      <div aria-label='search_hero' className="alert alert-primary animate__animated animate__fadeIn" style={{display: (showSearch ? '':'none') }}>
            Search a hero
      </div>

      <div aria-label='hero_not_found' className="alert alert-danger animate__animated animate__fadeIn" style={{display: (showError ? '':'none')}}>
          Hero not found <b>{q}!!</b>
      </div>
      {
        heroes.map(hero => (
          <HeroCard key={hero.id} {...hero} />
        ))
      }
    </div>
    </div>
    </>
  )
}
