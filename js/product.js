const app = Vue.createApp({
    data() {
      return {
        url: 'https://vue3-course-api.hexschool.io/v2',
        apiPath: 'lingxuan',
        isLoading: true,
        successText: '',
        products: [],
        tempProduct: {
          imagesUrl: [],
        },
        modalType: '新增',
      }
    },
    methods: {
      checkLogin() {
        this.isLoading = true;
        axios.post(`${this.url}/api/user/check`)
          .then(() => {
            this.getAllProducts();
          })
          .catch((err) => {
            alert(err.data.message);
            window.location.href = 'index.html';
          })
      },
      getAllProducts() {
        axios.get(`${this.url}/api/${this.apiPath}/admin/products`)
          .then((res) => {
            this.products = res.data.products;
            this.isLoading = false;
          })
          .catch((err) => {
            alert(err.data.message);
            this.isLoading = false;
          })
      },
      postAddProducts() {
        productModal.hide();
        this.isLoading = true;
        axios.post(`${this.url}/api/${this.apiPath}/admin/product`, { data: this.tempProduct })
          .then(() => {
            this.successText = `新增產品成功`;
            this.getAllProducts();
            successAlert.show();
          })
          .catch((err) => {
            alert(err.data.message);
            this.isLoading = false;
          })
      },
      deleteProduct() {
        delProductModal.hide();
        this.isLoading = true;
        axios.delete(`${this.url}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`)
          .then(() => {
            this.successText = `刪除產品成功`;
            this.getAllProducts();
            successAlert.show();
          })
          .catch((err) => {
            alert(err.data.message);
            this.isLoading = false;
          })
      },
      updateProduct() {
        productModal.hide();
        this.isLoading = true;
        axios.put(`${this.url}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`, { data: this.tempProduct })
          .then(() => {
            this.successText = `編輯產品成功`;
            this.getAllProducts();
            successAlert.show();
          })
          .catch((err) => {
            alert(err.data.message);
            this.isLoading = false;
          })
      },
      createImages() {
        this.tempProduct.imagesUrl = [];
        this.tempProduct.imagesUrl.push('');
      },
      openModal(status, item) {
        if(status === 'add') {
          this.modalType = '新增';
          this.tempProduct = {
            imagesUrl: []
          }
          productModal.show();
        } else if(status === 'delete') {
          this.tempProduct = item;
          delProductModal.show();
        } else if(status === 'edit') {
          this.modalType = '編輯';
          this.tempProduct = item;
          productModal.show();
        }
      },
    },
    created() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)vueWeek2Token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      axios.defaults.headers.common['Authorization'] = token;
      this.checkLogin();
    },
    mounted() {
      productModal = new bootstrap.Modal(document.getElementById('productModal'));
      delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'));
      successAlert = new bootstrap.Modal(document.getElementById('successAlert'));
    },
  })
  
  app.use(VueLoading.Plugin);
  app.component('loading', VueLoading.Component)
  app.mount('#app');