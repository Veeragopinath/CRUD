<template>
  <v-card class="mainPage outlined mx-3">
    <v-row class="pa-4">
      <v-col class="text-h6"> Users </v-col>
      <v-spacer> </v-spacer>
      <v-btn class="blue white--text">Create User</v-btn>
    </v-row>
    <v-divider></v-divider>

    <v-sheet outlined>
      <v-data-table
        :headers="Headers"
        fixed-header
        :page.sync="page"
        class="custom_table_class"
        hide-default-footer
        @page-count="pageCount = $event"
      ></v-data-table
    ></v-sheet>
    <div class="pt-2 pb-2">
      <v-pagination class="mt-4 mb-4" v-model="page" :length="pageCount">
      </v-pagination>
    </div>
  </v-card>
</template>

<script>
export default {
  // import { Headers } from './helpers/tableHeaders.js' ;
  data() {
    return {
      page: 1,
      pageCount: 0,
      Headers: [
        {
          text: 'Name',
          align: 'start',
          value: 'name',
          class: ' font-weight-bold',
        },
        {
          text: 'Sur Name',
          value: 'sur_name',
          class: ' font-weight-bold',
        },
        {
          text: ' EMail',
          value: 'e_mail',
          class: ' font-weight-bold',
        },
        {
          text: 'Phone Number',
          value: 'phone_number',
          class: ' font-weight-bold',
        },
        {
          text: 'Activate',
          value: 'activate',
          class: ' font-weight-bold',
        },
        {
          text: 'Action',

          value: 'Action',
          class: ' font-weight-bold',
        },
      ],
    }
  },
}
</script>

<style scoped>
.mainPage {
  background-color: #ffffff;
}
</style>