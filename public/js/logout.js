// const { application } = require("express");
// const { json } = require("sequelize");

async function logout() {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': application / json },
  })

  //checking to see if all works
  if (response.ok) {
    document.location.replace('/')
  } else {
    alert(response.statusText)
  }
}
// adding eventlisteners
document.querySelector('#logout-btn').addEventListener('click', logout)
