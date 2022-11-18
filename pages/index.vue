<template>
  <v-card class="mainPage outlined mx-3">
    <v-row class="pa-4">
      <v-col class="text-h6"> Users </v-col>
      <v-spacer> </v-spacer>
      <v-btn class="blue white--text" @click="userAddMode = true">Create User</v-btn>
    </v-row>
    <v-divider></v-divider>

    <v-sheet outlined>
      <v-data-table
        :headers="Headers"
        :items="listOfUsers"
        fixed-header
        hide-default-footer
        :items-per-page="itemsPerPage"
      >
        <template #[`item.num`]="{ item }">
          <span class="number-style">
            {{ listOfItems.indexOf(item) + 1 }}
          </span>
        </template>
        <template #[`item.actions`]="{ item }">
          <div class="d-flex">
            <v-btn class="crudButtonPrimary pa-2" @click="editUser(item)"> Edit </v-btn>
            <v-btn color="grey" class="pa-2" @click="deleteUserDialog(item)">
              Delete
            </v-btn>
          </div>
        </template></v-data-table
      ></v-sheet
    >
    <div class="pt-2 pb-2">
      <v-pagination class="mt-4 mb-4" v-model="page" :length="pageCount"> </v-pagination>
    </div>
    <v-dialog
      v-if="userAddMode"
      v-model="userAddMode"
      persistent
      max-width="600"
      :retain-focus="false"
      ><add-user @submitForm="addUser" @cancel="userAddMode = false"></add-user
    ></v-dialog>
    <delete-dialog
      :show="deleteDialog"
      :userName="userName"
      @agree="deleteUser"
      @close="deleteDialog = false"
    ></delete-dialog>
  </v-card>
</template>

<script>
import { Headers } from "~/helpers/tableHeaders.js";
import addUser from "~/components/addUser.vue";
import DeleteDialog from "~/components/deleteDialog.vue";
export default {
  components: { addUser, DeleteDialog },

  data() {
    return {
      Headers: Headers,
      listOfUsers: [],

      pageCount: 0,
      userAddMode: false,
      deleteDialog: false,
      userName: "",
      itemsPerPage: 10,
    };
  },
  // computed: {
  //   data() {
  //     return
  //   },
  // },
  mounted() {
    this.initialise();
  },
  methods: {
    initialise() {
      debugger;
      this.$axios.get("/users").then((res) => {
        this.listOfUsers = res.data;
      });
    },
    addUser(user) {
      debugger;
      this.$axios
        .post("/users", user)

        .then((res) => {
          this.initialise();
        });
      this.userAddMode = false;
    },

    editUser(item) {
      this.$router.push({
        path: "/editUser",
        query: { id: this.listOfUsers.indexOf(item) },
      });
    },

    deleteUserDialog(item) {
      this.userName = item.name;
      this.deleteDialog = true;
      this.userToBeDeletedId = item.id;
    },
    deleteUser() {
      this.$axios.delete(`/users/${this.userToBeDeletedId}`).then((res) => {
        this.userToBeDeletedId = "";
        this.deleteDialog = false;
        this.initialise();
      });
    },
  },
};
</script>

<style>
.mainPage {
  background-color: #ffffff;
}
.crudButtonPrimary {
  background-color: #3497fa !important ;
  color: #ffffff !important;
}
</style>
