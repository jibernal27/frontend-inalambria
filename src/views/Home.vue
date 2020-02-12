<template>
  <b-row class="justify-content-center">
    <b-col cols="12">
      <h1 class="text-center">Busqueda de canciones</h1>
    </b-col>
    <search-track />
  </b-row>
</template>

<script>
// @ is an alias to /src
import SearchTrack from "@/components/SearchTrack.vue";

export default {
  name: "Home",
  components: {
    SearchTrack
  }
};
</script>
