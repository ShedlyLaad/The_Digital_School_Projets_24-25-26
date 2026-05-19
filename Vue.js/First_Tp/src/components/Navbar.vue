<template>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand href="#">Project</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Accueil</b-nav-item>
          <b-nav-item to="/Card">MovieCard</b-nav-item>
          <b-nav-item to="/Tableau">Table</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </template>
  
  <script>
 
  export default {
    name: 'MyNavbar'
  };
  </script>
  
  <style>
  </style>
  