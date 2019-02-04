import { FETCH_RECIPES, NEW_RECIPE } from './types'
import { db } from '../services/firebase'

export const fetchRecipes = userId => dispatch => {
  let recipes = []
  db.collection('recipes').where('createdBy', '==', userId).get()
  .then(query => {
    query.forEach(doc => {
      recipes.push(doc.data())
    })
    console.log(recipes)
    dispatch({
      type: FETCH_RECIPES,
      payload: recipes
    })
  })
  .catch(e => e)
}

export const createRecipe = recipeData => dispatch => {
  return new Promise((resolve, reject) => {
    db.collection('recipes').doc().set(recipeData)
    .then(() => {
      dispatch({
        type: NEW_RECIPE,
        payload: recipeData
      })
      return resolve('done')
    })
    .catch(e => reject(e))
  })
}