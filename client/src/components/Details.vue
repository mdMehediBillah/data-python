<template>
  <div v-if="selectedRow">
    <h2>Country Details</h2>
    <table border="1">
      <tbody>
        <tr v-for="(value, key) in selectedRow" :key="key">
          <td>
            <strong>{{ key }}</strong>
          </td>
          <td>{{ value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getSelectedRow"]),
    selectedRow() {
      return this.getSelectedRow;
    },
  },
};
</script>
