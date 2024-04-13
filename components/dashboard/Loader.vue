<template>
    <div id="app">
       <fulfilling-bouncing-circle-spinner
            :animation-duration="2000"
            :size="150"
            :color="'#0000ff'"
       />
       <div class="mt-8">Retrieving data...</div>
    </div>
  </template>
  
  <script>
import {FulfillingBouncingCircleSpinner} from 'epic-spinners'
    export default {
      components: {
        FulfillingBouncingCircleSpinner
      }
    }
  </script>