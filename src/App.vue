<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import * as userApi from "@/api/permissionsApi.js";
import router, { resetRouter } from "@/router";

export default {
  data() {
    return {};
  },
  methods: {
    preInit() {
      // userData().then(res => {
      //   _that.$store.dispatch("authInfo/updateAuthInfo", res.data.authorities);
      //   resetRouter();
      //   const accessRoutes = _that.$store.state.authInfo.routes;
      //   router.addRoutes(accessRoutes);
      // });

      // userApi
      //   .user()
      //   .then(res => {
      //     console.log(res)
      //     // _that.$store.dispatch(
      //     //   "authInfo/updateAuthInfo",
      //     //   res.data.authorities
      //     // );
      //     // resetRouter();
      //     // const accessRoutes = _that.$store.state.authInfo.routes;
      //     // router.addRoutes(accessRoutes);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    }
  },
  created() {},
  mounted() {
    // this.preInit();
  }
};
</script>

<style>
#app {
  height: 100%;
}
</style>
