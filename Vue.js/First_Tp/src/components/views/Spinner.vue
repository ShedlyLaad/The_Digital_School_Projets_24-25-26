<template>
  <div class="overflow-auto">

    <b-table
      id="my-table"
      :items="processedItems"
      :per-page="perPage"
      :current-page="currentPage"
      small
    >
      <template #cell(count)="data">
        <b-form-input
          v-model.number="data.item.count"
          type="number"
          :max="10"
          @input="onCountChange(data.item)"
        ></b-form-input>
      </template>
    </b-table>

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>

    <p class="mt-3">Current Page: {{ currentPage }}</p>

  </div>
</template>

<script>
import { BPagination, BTable, BFormInput } from 'bootstrap-vue'

export default {
  name: 'Tableau',
  components: {
    BPagination,
    BTable,
    BFormInput
  },
  data() {
    return {
      perPage: 3,
      currentPage: 1,
      items: [
        { id: 1, first_name: 'Ahmed', last_name: 'Ahmed', count: 0 },
        { id: 2, first_name: 'Oussema', last_name: 'Abid', count: 0 },
        { id: 3, first_name: 'Shedly', last_name: 'Shedly', count: 0 },
        { id: 4, first_name: 'Winek', last_name: 'Hani', count: 0 },
        { id: 5, first_name: 'Chedy', last_name: 'Ouerghi', count: 0 },
        { id: 6, first_name: 'Amin', last_name: 'Amin', count: 0 },
        { id: 7, first_name: 'Moufid', last_name: 'Bih', count: 0 },
        { id: 8, first_name: 'Khouloud', last_name: 'Madame', count: 0 },
        { id: 9, first_name: 'Khaw', last_name: 'Aad', count: 0 }
      ]
    }
  },
  computed: {
    rows() {
      return this.items.length
    },
    processedItems() {
      return this.items.map(item => {
        if (item.count > 10) item.count = 10;
        if (item.count < 0) item.count = 0;
        return item;
      });
    }
  },
  methods: {
    onCountChange(item) {
      if (item.count > 10) {
        item.count = 10;
      }
      if (item.count < 0) {
        item.count = 0;
      }
    }
  },
  watch: {
    items: {
      handler(newItems) {
        newItems.forEach(item => {
          if (item.count > 10) {
            item.count = 10;
          }
          if (item.count < 0) {
            item.count = 0;
          }
        });
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.overflow-auto {
  overflow: auto;
  max-height: 500px;
  padding: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  background-color: #f8f9fa;
}

#my-table {
  width: 100%;
  margin-bottom: 1rem;
  background-color: white;
  border: 1px solid #dee2e6;
  border-collapse: collapse;
  text-align: left;
}

#my-table th, #my-table td {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}

#my-table th {
  background-color: #f2f2f2;
  border-bottom: 2px solid #dee2e6;
}

#my-table tbody tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}

#my-table tbody tr:hover {
  background-color: #f1f1f1;
}

.b-pagination {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.mt-3 {
  margin-top: 1rem;
}
.pagination {
 


}
</style>
