<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h4 white--text">
            Vue Practical
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in navItems" :key="item.title" link>
          <v-list-item-icon>
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text text-h6">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="mr-6">Dashboard</v-toolbar-title>
      <v-toolbar-title>Users</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn class="elevation-0 bg">
        <v-icon>mdi-help-circle-outline</v-icon>
      </v-btn>
      <v-btn fab dark x-small color="blue" class="mr-6" v-bind="attrs" v-on="on">
        
          <v-icon dark> mdi-bell </v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>

    <v-main app fluid>
      <v-container
        class="outerContainer mt-n3 py-n2"
        style="min-height: 100vh , padding: 0"
      >
        <v-breadcrumbs :items="breadcrums" large></v-breadcrumbs>
       
        <v-container class="innerContainer grey lighten-2 pa-" style="height: 100%">
          <v-container class="mt-5" style="min-height: 90vh">
            <Nuxt />
          </v-container>
        </v-container>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    navItems: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard' },
      { title: 'Users', icon: 'mdi-image' },
    ],
    breadcrums: [
      {
        text: 'Home',
        disabled: false,
      },
      {
        text: 'Users',
        disabled: false,
      },
    ],
  }),
}
</script>
<style>
.v-navigation-drawer {
  background-color: #3c4b64 !important;
}
.outerContainer {
  background-color: white;
}
/* .innerContainer {
  background-color: red;
} */
</style>
