var vm = new Vue({
  el: '#app',
  data: {
    results: []
  },
  created: function() {
    this.fetchData()
  },
  filters: {
    getDate: function(date) {
      let dateObj = new Date(date)
      let localeDate = dateObj.toLocaleDateString()
      return localeDate
    },
    getTime: function(date) {
      let dateObj = new Date(date)
      let localeTime = dateObj.toLocaleTimeString()
      return localeTime
    }
  },
  methods: {
    fetchData: function() {
      let self = this
      let xhr = new XMLHttpRequest
      xhr.open('GET', '/food-energy/query')
      xhr.onload = function() {
        if (this.status == 200) {
          let res = JSON.parse(xhr.response)
          self.results = res
          console.log(res)
        } else {
          console.error('can\'t fetch data')
        }
      }
      xhr.send()
    }
  }
})
