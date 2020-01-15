import React from 'react';
import { productsAPI } from './productsAPI';
import Loader from './Loader';

export const handleErrors = response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
}

export const requestServer = (reqName, method, body)  => (
  new Request(productsAPI(reqName), {
      method,
      headers: new Headers({
          'Authorization': 'Bearer ' + localStorage.token,
          'Content-Type': 'application/json'
      }),
      body: JSON.stringify(body)
  })
)

export const fetchData = (req, setElem, ...args) => {
  fetch(req)
    .then(res => res.json())
    .then(elem => {
      setElem(elem);
      args[0] && args[0]();
    })  
    .catch(e => console.log(e))
}

export const LoaderModal = props => {
  return(
    <div className="loading-container" style={props.style}>
      <Loader size="big"/>
    </div>
  )
}

export const displayStatus = (id, status) => document.getElementById(id).style.display = status;