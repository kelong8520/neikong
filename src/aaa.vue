<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
import { specialLoadData } from '@/api/caigouruku'
import router, { resetRouter } from '@/router'
export default {
  name: 'App',
  data() {
    return {
      isRouterAlive: true
    }
  },
  created() {
    try {
      document.body.removeChild(document.getElementById('appLoading'))
      setTimeout(function() {
        document.getElementById('app').style.display = 'block'
      }, 500)
    } catch (e) {

    }
  },
  mounted() {
    this.preInit()
  },
  provide() {
    return {
      reloadPage: this.reloadPage,
      foo: 'test'
    }
  },
  methods: {
    reloadPage() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    },
    preInit() {
      const _that = this
      return new Promise(resolve => {
        let token_key = ''
        window.addEventListener('message', function(evt) {
          const msg = evt.data.data
          sessionStorage.setItem('access_token', msg.access_token)
          sessionStorage.setItem('employeeId', msg.employeeId)
          sessionStorage.setItem('employeeName', msg.employeeName)
          sessionStorage.setItem('contractBody', msg.contractBody)
          token_key = msg.access_token
          const url = '/user?access_token=' + msg.access_token
          specialLoadData(url).then(res => {
            _that.$store.dispatch('authInfo/updateAuthInfo', res.data.authorities)
            resetRouter()
            const accessRoutes = _that.$store.state.authInfo.routes
            router.addRoutes(accessRoutes)
          })
        })
      })
    }
  }
}
</script>
<style lang="scss">

@import '@/styles/variables.scss';

</style>