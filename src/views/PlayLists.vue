<template>
  <b-row class="justify-content-center">
    <b-col cols="12">
      <h1 class="text-center">Tus listas de reporducción</h1>
    </b-col>
    <b-col cols="12">
      <b-modal
        title="Agregar lista"
        v-model="showModal"
        centered
        scrollable
        hide-footer
      >
        <play-list-adder @added="showModal = false" />
      </b-modal>
      <div class="text-center">
        <b-button variant="success" @click="showModal = true"> Crear</b-button>
      </div>
    </b-col>
    <play-list-table />
  </b-row>
</template>

<script>

import PlayListTable from "@/components/PlayListTable.vue";
import PlayListAdder from "@/components/PlayListAdder.vue";

export default {
  components: {
    PlayListTable,
    PlayListAdder
  },
  data() {
    return {
      showModal: false
    }
  }
}
</script>
