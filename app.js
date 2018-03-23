var x = 2;
const Foo = {
  template:`<div style='color:red;'>Ciao sono Foo</div>`
}
const User = {
  template: `<table style="width:100%">
  <tr>
    <th>Firstname</th>
    <th>Lastname</th>
    <th>id</th>
  </tr>
  <tr>
    <td>{{user.name}}</td>
    <td>{{user.surname}}</td>
    <td>{{ $route.params.id }}</td>
  </tr>
</table>`,
  methods: {
    loadUser: function() {
      this.$http.get(`http://localhost:3001/users/${this.$route.params.id}`)
      .then(response => {
          this.user = response.body;
      })
    }
  },
  created: function() {
      this.user = {
        name:''
      }
      this.loadUser();
  },
  watch: {
    '$route' (to, from) {
      this.loadUser();
    }
  }
}
var routes = [
  {
    path:'/foo', component: Foo
  }, {
    path:'/bar',
    component: {
      template:`<div>Ciao sono Bar${x}</div>`
    }
  }, {
    path:'/users/:id', component: User
  }
];

var router = new VueRouter(
  {
    //routes
    routes:routes
  }
);


var vm = new Vue({
  data: {
    message:'Hello Vue'
  },
  router: router
}).$mount('#app')
