<template>
  <div>
    <b-table
      striped
      hover
      responsive
      :items="items"
      :fields="fields"
      show-empty
    >
      <template v-slot:empty="">
        <h4>{{ emptyMessage }}</h4>
      </template>
      <template v-slot:cell(artist)="data">
        <span>{{ data.value.name }}</span>
      </template>
      <template v-slot:cell(release_date)="data">
        <span>{{ data.value | moment("LL") }}</span>
      </template>
      <template v-slot:cell(duration)="data">
        <span>{{ $moment.utc(data.value * 1000) | moment("HH:mm:ss") }}</span>
      </template>
      <template v-slot:cell(actions)="data">
        <slot name="actions" v-bind:data="data.item"></slot>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      required: true,
      type: Array
    },
    emptyMessage: {
      required: false,
      type: String,
      default: "No hay resultados"
    }
  },
  computed: {
    fields() {
      const first = this.items[0]
      const fields = [
        { key: 'title', label: 'Titutlo' },
        { key: 'artist', label: 'Autor' },
        { key: 'duration', label: 'Duración' }]
      if (first && first.release_date) {
        fields.push({ key: 'release_date', label: 'Estreno' })
      }
      fields.push({ key: 'actions', label: 'Acciones' })
      return fields
    }
  },
}
</script>
