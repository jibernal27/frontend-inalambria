<template>
  <b-row>
    <b-col cols="12">
      <h1 class="text-center">Busqueda de canciones</h1>
    </b-col>
    <b-col cols="12">
      <search-track />
    </b-col>
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
