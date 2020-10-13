import React, { useEffect, useState } from 'react';
import './App.css';
import Person from './components/Person/Person';
import NotFound from './components/404/404';
import styled from 'styled-components';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "./store/actions";

/*
App that uses fetch API, hooks, styled components, router, redux
*/

const Button = styled.button`
  margin: 5px;
  padding: 10px 20px;
  background-color: #000;
  color: #fff;
  cursor: pointer;
`;

const FormHolder = styled.div`
  input {
    padding: 10px;
  }

  label {
    margin: 0 10px;
  }
`;

const usePeopleNum = (people) => {
  return people.length;
}

const App = () => {
  const people = useSelector(state => state.people);
  const peopleNum = usePeopleNum(people);
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState({ personName: "", craft: "" });
  let history = useHistory();

  const fetchUrl = (url) => {
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        return json
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    fetchUrl('http://api.open-notify.org/astros.json').then(result => {
      dispatch({
        type: actionTypes.ADD_PEOPLE,
        people: result.people.map((person, index) => {
          return {
            id: index,
            ...person
          }
        })
      });
    });
  }, []) // empty array means it only runs once - mount

  useEffect(() => {
    console.log(peopleNum)
  }, [people])

  const removePerson = (id) => {
    dispatch({
      type: actionTypes.REMOVE_PERSON,
      personId: id
    });
    redirectTo('/');
  }

  const redirectTo = (path) => {
    history.push(path);
  }

  const getPeople = () => {
    return [...people];
  }

  const addNewPerson = () => {
    if (inputData.personName !== "" && inputData.craft !== "") {
      dispatch({
        type: actionTypes.ADD_PERSON,
        person: {
          id: new Date().valueOf(),
          name: inputData.personName, craft: inputData.craft
        }
      });
      setInputData({ personName: "", craft: "" });
      redirectTo('/');
    }
  }

  const renderPersonRoute = (props, getPeople) => {
    const newPeople = getPeople();
    if (newPeople && props.match.params.id) {
      const foundPerson = newPeople.find(person => person.id == props.match.params.id);
      if (foundPerson) {
        return (
          <div>
            <Person remove={() => removePerson(foundPerson.id)} name={foundPerson.name} craft={foundPerson.craft} />
            <div>
              <Link to="/">Go back</Link>
            </div>
          </div>
        )
      } else {
        redirectTo('/');
      }
    }
  }

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          {people && people.length !== 0 ? <div><p>There are {people.length} astronauts in space right now.</p><p>They are:</p></div> : <p>There are no astronauts in space right now.</p>}
          {people && people.map((person, index) =>
            <Person key={index} remove={() => removePerson(person.id)} id={person.id} name={person.name} craft={person.craft} />
          )}
          <div>
            <Link to="/addNew">Add New Person</Link>
          </div>
        </Route>
        <Route exact path="/addNew">
          <div>
            <FormHolder>
              <label htmlFor="PersonName">Person Name</label>
              <input name="PersonName" required type="text" value={inputData.personName} onChange={(e) => setInputData({ ...inputData, personName: e.target.value })} />
              <label htmlFor="Craft">Craft</label>
              <input name="Craft" required type="text" value={inputData.craft} onChange={(e) => setInputData({ ...inputData, craft: e.target.value })} />
              <Button type="button" onClick={addNewPerson}>Add New Person</Button>
            </FormHolder>
            <Link to="/">Go back</Link>
          </div>
        </Route>
        <Route exact path="/person/:id" render={(props) => ((getPeople) => renderPersonRoute(props, getPeople))(getPeople)}></Route>
        <Route component={NotFound}></Route>
      </Switch>
    </div >
  );
}

export default App;
