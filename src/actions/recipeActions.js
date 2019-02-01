import { FETCH_RECIPES } from './types';
import localforage from 'localforage'

export const fetchRecipes = () => dispatch => {
  localforage.getItem('recipes').then(recipes => {
    if(recipes) {
      dispatch({
        type: FETCH_RECIPES,
        payload: recipes
      })
    } else {
      dispatch({
        type: FETCH_RECIPES,
        payload: []
      })
    }
  })
};

export const createRecipe = recipeData => dispatch => {
    localforage.getItem('recipes').then(data => {
      if(data) {
        let newData = [...data, recipeData]
        localforage.setItem('recipes', newData)
      } else {
        localforage.setItem('recipes', [recipeData])
      }
    })
    .catch(e => console.log(e))

    dispatch({
      type: FETCH_RECIPES,
      payload: recipeData
    })
};