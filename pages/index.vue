<template>
  <v-card class="mainPage outlined mx-3">
    <v-row class="pa-4">
      <v-col class="text-h6"> Users </v-col>
      <v-spacer> </v-spacer>
      <v-btn class="blue white--text" @click="userAddMode = true">Create User</v-btn>
    </v-row>
    <v-divider></v-divider>
    {{ listOfUsers }}
    {{ data }}
    <v-sheet outlined>
      <v-data-table
        :headers="Headers"
        :items="listOfUsers"
        fixed-header
        :page.sync="page"
        hide-default-footer
      >
        <template #[`item.actions`]="{ item }">
          <div class="float-right">
            <v-btn icon color="Blue" @click="edit(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              icon
              color="grey"
              @click="(currentUserId = item.id), (deleteDialog = true);"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
        </template></v-data-table
      ></v-sheet
    >
    <div class="pt-2 pb-2">
      <v-pagination class="mt-4 mb-4" v-model="page" :length="pageCount"> </v-pagination>
    </div>
    <v-dialog v-model="userAddMode" persistent max-width="600" :retain-focus="false"
      ><add-user @submitForm="addUser" @cancel="userAddMode = false"></add-user
    ></v-dialog>
  </v-card>
</template>

<script>
import { Headers } from "~/helpers/tableHeaders.js";
import addUser from "~/components/addUser.vue";
export default {
  components: { addUser },

  data() {
    return {
      Headers: Headers,
      listOfUsers: [],
      page: 1,
      pageCount: 0,
      userAddMode: false,
    };
  },
  // computed: {
  //   data() {
  //     return
  //   },
  // },
  // mounted() {
  //   var fs = require("fs");
  //   this.store = fs.readFileSync("store.json");
  // },
  methods: {
    addUser(user) {
      debugger;

      this.listOfUsers.push(user);
      this.data = JSON.stringify(this.listOfUsers);
      // this.listOfUsers = JSON.parse("data");
      // var fs = require("fs");
      debugger;
      try {
        fs.writeFile("store.json", this.data);
      } catch (e) {
        alert("Failed to save the file !");
      }
      this.userAddMode = false;
    },
    edit(item) {
      this.$router.push({
        path: "/editUser",
        query: { id: this.listOfUsers.indexOf(item) },
      });
    },
  },
};
</script>

<style scoped>
.mainPage {
  background-color: #ffffff;
}
</style>
