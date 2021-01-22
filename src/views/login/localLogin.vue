<template>
  <div>
    <p />
  </div>
</template>

<script>
import * as permissionsApi from "@/api/permissionsApi.js";
import querystring from "querystring";

export default {
  name: "login",
  data() {
    return {
      state: "",
      code: "",
      token: ""
    };
  },
  created() {
    // this.loadpromiss();
  },
  methods: {
    loadpromiss() {
      var code = this.GetQueryString("code");
      console.log("code:" + code);
      if (code != null && code !== "") {
        let _data = {
          grant_type: "authorization_code",
          client_id: "erp_v",
          client_secret: "erpVietnam",
          redirect_uri: "http://127.0.0.1:8080/首页",
          code: code
        };
        console.log("1111122")
        permissionsApi
          .authentication(querystring.stringify(_data))
          .then(res => {
            console.log(res);
            if (res.data != null) {
              var at = data.access_token;
              sessionStorage.setItem("at", this.at);
              console.log(at);
              // if (this.at != null && this.at !== "") {
                // this.$router.push("/首页");
                // this.$router.push({
                //   name: "index"},
                //   path= "/首页"
                // );
              // }
            }
          })
          .catch(err => {
            // window.location.href =
            //   "http://120.78.186.60:8087/oauth/authorize?client_id=erp_v&redirect_uri=http://127.0.0.1:8521/login.html&response_type=code&state=123";
          });
      } else {
        // this.$router.push("/首页");
        // this.$router.push({
        //   name: "index",
        //   path: "/首页"
        // });
      }
    },
    GetQueryString(name) {
      let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      let r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }

  }
};
</script>

<style>
</style>

