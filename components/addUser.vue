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
              v-model="form.surname"
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
          <v-btn color="blue" class="mr-5 white--text" depressed @click="saveUser()"
            >Save</v-btn
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
export default {
  props: {
    title: {
      type: String,
      default: " ADD USER",
    },
    // type: {
    //   type: String,
    //   default: 'cancel',
    // },
  },
  data() {
    return {
      rules,
      form: {},
      activationItems: ["Free", "Premium", "Family", "Elite", "platinum"],
    };
  },
  methods: {
    saveUser() {
      debugger;
      if (this.$refs.form.validate()) {
        this.$emit("submitForm", this.form);
        this.$refs.form.reset();
      }
    },
    cancel() {
      this.$refs.form.reset();
      this.$emit("cancel");
    },
  },
};
</script>

<style lang="scss" scoped></style>
