import React, { createContext, useEffect, useState } from "react";
import Axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Landing } from './pages/landing/index';
import { Start } from "./pages/start";
import { Team } from "./pages/team";

import { Navbar } from "./components/navbar";


export const DataContext = createContext([])

const App = () => {
  const [data, setData] = useState(
    {
      trainers: [],
      teams: [],
      data: [],
      team: []
    }
  )
  
  const addToTeam = (name, type, front_sprite) => setData({...data, team: [...data.team, { name, type, front_sprite }] }) 
  const removeToTeam = (name) => setData({...data, team: data.team.filter(el => el.name !== name) }) 

  const requestSearchPokemon = (pokemon) => {
    Axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemon)
        .then(res => 
            setData({ ...data, data: [ ...data.data, { name: res.data.name, front_sprite: res.data.sprites.front_default, type: res.data.types[0].type.name }] })
        )
        .catch(err => console.log('Erro!'))
  } 

  const setLocalstorageJsonData = (key, val) => localStorage.setItem(key, JSON.stringify(val))

  const requestAllData = async () =>{
    const getTeams = await Axios.get(process.env.REACT_APP_API_URL + '/teams')
    const getTrainers = await Axios.get(process.env.REACT_APP_API_URL + '/trainers')

    setData({ 
      ...data,
      trainers: getTrainers.data, 
      teams: getTeams.data,
    })
  } 

  useEffect(() => {
    requestAllData()
  }, [])

      
  useEffect(() => {
    if (data.data.length > 0) {
        setLocalstorageJsonData('data', data.data)
    }
  }, [data.data])

  useEffect(() => {
      if (data.team.length > 0) {
          setLocalstorageJsonData('team', data.team)
      }
  }, [data.team])

  useEffect(() => {
    if (localStorage.getItem('data')) {
        setData({
          ...data,
          data: JSON.parse(localStorage.getItem('data'))
        })
    }
    
    if (localStorage.getItem('team')) {
        console.log('ok: ', localStorage.getItem('team'))
        setData({
          ...data,
          team: JSON.parse(localStorage.getItem('team'))
        })
    }
  }, [])

  return (
    <>
      <DataContext.Provider value={{ data, addToTeam, removeToTeam, requestSearchPokemon }}>
        <Router>
          <Navbar/>
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/start" exact component={Start} />
            <Route path="/team/:id" exact component={Team} />
            {/* <Route path="/pick_trainer" exact component={PickTrainer} /> */}
          </Switch>
        </Router>
      </DataContext.Provider>
    </>
  )
}

export default App