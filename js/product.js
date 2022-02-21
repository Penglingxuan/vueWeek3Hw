import componentDeleteModal from "../components/delProductModal.js";
import componentProductModal from "../components/productModal.js";
import componentPagination from "../components/pagination.js";
let productModal = {};
let delProductModal = {};
let successAlert = {};

const app = Vue.createApp({
  components: {
    'delete-modal': componentDeleteModal,
    'product-modal': componentProductModal,
    'pagination': componentPagination,
  },
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
      pageData: {},
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
    getAllProducts(page = 1 ) {
      this.isLoading = true;
      axios.get(`${this.url}/api/${this.apiPath}/admin/products?page=${page}`)
        .then((res) => {
          this.products = res.data.products;
          this.pageData = res.data.pagination;
          this.isLoading = false;
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
    openSuccessModal(type) {
      if(type === 'delete') {
        this.successText = '刪除產品成功';
        delProductModal.hide();
      } else if(type === 'edit') {
        this.successText = '編輯產品成功';
        productModal.hide();
      } else if(type === 'add') {
        this.successText = '新增產品成功';
        productModal.hide();
      }
      successAlert.show();
      this.isLoading = false;
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
        this.tempProduct = {...item};
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