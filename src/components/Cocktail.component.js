import React from 'react';
import image1 from '../assets/search-icon.png'
import image2 from '../assets/cocktail-logo.jpg'
import '../components/Cocktail.component.css'
import { useState } from 'react'
import axios from 'axios'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
const Cocktail=()=>{
    const [timeoutid,settimeoutid]=useState( );
    const[recipeList,setrecipeList]=useState([]);
    const[details,setDetails]=useState([ ])
    const[open1,setOpen1]=useState(false);
    const[open2,setOpen2]=useState(false);
    const fetchRecipe=async(searchstring)=>{
    const response=await axios.get(`https://thecocktaildb.com/api/json/v1/1/filter.php?i=${searchstring}`)
      setrecipeList(response.data.drinks);
    }
    const fetchIngredients=async(id)=>{
    const res=await axios.get(`https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    console.log(res);
    setDetails(res.data.drinks);
    setOpen1(true);
  }
  const arrayLength = recipeList ? recipeList.length : 0;
  const textChange=(event)=>{
      clearTimeout(timeoutid);
      const timeout=setTimeout(()=>fetchRecipe(event.target.value),500);
      settimeoutid(timeout);
    }
  const fetchInstructions=async(id)=>{
    const res=await axios.get(`https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    console.log(res);
    setDetails(res.data.drinks);
    setOpen2(true);
  }
return(
    <>
    <div className='container'>
    <div>
    <div className='header'>
    <div className='appName'><img className='image2' src={image2} alt="logo"/>Cocktail Recipe Finder</div>
    <div className='search'><img className="image1" src={image1} alt="search"/><input className='search-bar' onChange={textChange} placeholder='Search Your Cocktail Recipe' /></div>
    </div>
    </div>
    <div>
      <div className='recipeList'>
        {arrayLength>0 ?( recipeList.map((recipeObject)=>(
        <div recipeobject={recipeObject} key={recipeObject.idDrink} className='recipe'>
          <img className='cover' src={recipeObject.strDrinkThumb} alt="picture1" />
          <span className='recipeName'>{recipeObject.strDrink}</span>
          <span className='ingredient' onClick={()=>fetchIngredients(recipeObject.idDrink)} >INGREDIENTS</span>
          <span className='instruction' onClick={()=>fetchInstructions(recipeObject.idDrink)}>INSTRUCTIONS</span>
        </div>
        ))
        ):(
          <div className='placeholder'></div>
        )}
       </div>
      </div> 
    </div> 
  <Dialog  open={open1}>
  <DialogTitle style={{backgroundColor:'rgb(126, 174, 30)',border:'solid',borderStyle:'double',borderColor:'rgb(126, 174, 30)'}}>INGREDIENTS</DialogTitle>
      <div style={{border:'solid',borderStyle:'double',borderColor:'rgb(126, 174, 30)'}} >
  <DialogContent style={{backgroundColor:'black',color:'white',fontFamily:'cursive'}}>
      {details.map((ingre)=>
      <p>{ingre.strIngredient1}:{ingre.strMeasure1}<br/>{ingre.strIngredient2}:{ingre.strMeasure2}<br/>{ingre.strIngredient3}:{ingre.strMeasure3}</p>)}
  </DialogContent>
  <DialogActions style={{backgroundColor:'black'}}>
      <button style={{backgroundColor:'rgb(126, 174, 30)',color:'black'}} onClick={() => setOpen1("")}>Close</button>
  </DialogActions></div>
  </Dialog>
  <Dialog open={open2}>
      <div style={{border:'solid',borderStyle:'double',borderColor:'rgb(126, 174, 30)'}} >
  <DialogTitle style={{backgroundColor:'rgb(126, 174, 30)',border:'solid',borderStyle:'double',borderColor:'rgb(126, 174, 30)'}}>INSTRUCTIONS</DialogTitle>
  <DialogContent style={{backgroundColor:'black',color:'white',fontFamily:'cursive'}}>
      {details.map((instr)=>
      <p>{instr.strInstructions}</p>)}
  </DialogContent>
  <DialogActions style={{backgroundColor:'black'}}>
       <button  style={{backgroundColor:'rgb(126, 174, 30)',color:'black'}} onClick={() => setOpen2("")}>Close</button>
  </DialogActions></div>
  </Dialog>
  </>
)
}
export default Cocktail;