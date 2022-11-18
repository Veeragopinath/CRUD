<template>
  <v-card class="mainPage outlined mx-3 px-4">
    <v-row class="px-3 py-2">
      <v-col class="font-weight-bold heading-4"> Users </v-col>
      <v-spacer> </v-spacer>
      <v-btn class="blue white--text px-3 py-1" @click="userAddMode = true"
        >Create User</v-btn
      >
    </v-row>
    <v-divider></v-divider>
    <v-row class="mt-3">
      <v-col md="5">
        <v-text-field
          v-model="search"
          label="search by text"
          outlined
          dense
          hint="Search by Name, Surname, email, username, phonenumber"
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-combobox
          outlined
          dense
          label="Select Status"
          :items="activationItems"
        ></v-combobox>
      </v-col>
    </v-row>
    <v-sheet outlined class="mt-1">
      <v-data-table
        :headers="Headers"
        :items="listOfUsers"
        fixed-header
        :search="search"
        hide-default-footer
        :items-per-page="itemsPerPage"
        :page.sync="page"
      >
        <!-- <template #[`item.num`]="{ item }">
          <span class="number-style">
            {{ listOfItems.indexOf(item) + 1 }}
          </span>
        </template> -->
        <template #[`item.actions`]="{ item }">
          <div class="d-flex">
            <v-btn class="crudButtonPrimary px-3 py-0 mr-2" @click="editUser(item)">
              Edit
            </v-btn>
            <v-btn color="grey" class="px-3 py-0" @click="deleteUserDialog(item)">
              Delete
            </v-btn>
          </div>
        </template></v-data-table
      ></v-sheet
    >
    <div class="pt-1 pb-1">
      <v-pagination
        class="mt-2 mb-2"
        v-model="page"
        :total-visible="5"
        :length="pageCount"
      >
      </v-pagination>
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
      search: "",
      pageCount: 3,
      userAddMode: false,
      deleteDialog: false,
      userName: "",
      itemsPerPage: 5,
      page: 1,
      activationItems: ["Free", "Premium", "Family", "Elite", "platinum"],
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
        query: { id: item.id },
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
