import ENV from '../../app_keys'

const recipes = "";

fetch(ENV.BASE_URL + "/api/v1/recipes", {
  headers: {
    'CLIENT_KEY': ENV.CLIENT_KEY
  }
})
.then(response => response.json())
.then(json => { recipes = json })

export default () => recipes
