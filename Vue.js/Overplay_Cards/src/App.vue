<template>
  <div id="app">
    <b-container>
      <b-card-group deck>
        <b-card title="Title" img-src="https://www.pinterest.com/pin/42573158971060172/" img-alt="Image" img-top>
          <b-card-text>
            The Ultras Violence
          </b-card-text>
          <template #footer>
            <small class="text-muted">Last updated 3 mins ago</small>
          </template>
        </b-card>

        <b-card title="Title" img-src="https://www.pinterest.com/pin/2181499812816206/" img-alt="Image" img-top>
          <b-card-text>
            Jocker
          </b-card-text>
          <template #footer>
            <small class="text-muted">Last updated 3 mins ago</small>
          </template>
        </b-card>

        <b-card title="Title" img-src="https://www.pinterest.com/pin/3870349670785061/" img-alt="Image" img-top>
          <b-card-text>
            F**** C*** !!
          </b-card-text>
          <template #footer>
            <small class="text-muted">Last updated 4 mins ago</small>
          </template>
        </b-card>
      </b-card-group>
    </b-container>
  </div>
</template>

<script>
import { BContainer, BCardGroup, BCard } from 'bootstrap-vue';

export default {
  name: 'App',
  components: {
    BContainer,
    BCardGroup,
    BCard
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
