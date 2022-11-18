<template>
  <div>
    <v-form id="addIssueForm" ref="form">
      <v-card class="pa-6">
        <v-card-title class="text-h5 font-weight-bold">{{ title }}</v-card-title>
        <v-divider></v-divider>
        <v-row class="mt-2">
          <v-col md="6">
            <v-text-field
              v-model="form.name"
              outlined
              dense
              :rules="rules.name"
              label="Name"
            ></v-text-field>
          </v-col>
          <v-col md="6">
            <v-text-field
              v-model="form.sur_name"
              outlined
              dense
              :rules="[rules.name]"
              label="Sur Name"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="12">
            <v-text-field
              v-model="form.e_mail"
              outlined
              dense
              :rules="[rules.email]"
              label="E Mail"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="6">
            <v-text-field
              v-model="form.phone_number"
              outlined
              dense
              :rules="[rules.mobile, rules.mobileLength]"
              label="Phone Number"
            ></v-text-field>
          </v-col>
          <v-col md="6">
            <v-combobox
              outlined
              dense
              v-model="form.activate"
              label="Activate"
              :items="activationItems"
            ></v-combobox>
          </v-col>
        </v-row>
        <v-footer class="d-flex bg justify-end white">
          <v-btn color="blue" class="mr-5 white--text" depressed @click="updateUser()"
            >Update</v-btn
          >
          <v-btn color="grey lighten-1" class="mr-5 white--text" depressed @click="cancel"
            >Cancel</v-btn
          >
        </v-footer>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import { rules } from "~/helpers/formValidation.js";
import addUser from "~/components/addUser.vue";
export default {
  components: { addUser },
  data() {
    return {
      userId: this.$route.query.id,
      rules,
      form: {},
      activationItems: ["Free", "Premium", "Family", "Elite", "platinum"],
    };
  },

  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.$axios.get(`/users/${this.userId}`).then((res) => {
        this.form = { ...res.data };
      });
    },
    updateUser() {
      debugger;
      this.$axios
        .put(`/users/${this.userId}`, this.form)

        .then((res) => {
          this.$refs.form.reset();
          this.$router.push("/");
        });
    },
  },
};
</script>

<style scoped></style>
