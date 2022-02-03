const app = Vue.createApp({
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io/v2',
      reqData: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    login() {
      axios.post(`${this.url}/admin/signin`, this.reqData)
      .then((res) => {
        const token = res.data.token;
        const expired = res.data.expired;
        document.cookie = `vueWeek2Token=${token}; expires=${new Date(expired)};`;
        window.location.href = 'product.html';
      })
      .catch((err)=> {
        alert(err);
      })
    },
  },
})

app.mount('#app')