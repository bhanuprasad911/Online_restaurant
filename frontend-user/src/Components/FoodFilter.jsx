import React from 'react';
import { RiDrinks2Line } from "react-icons/ri";
import { PiHamburger } from "react-icons/pi";
import { GiFullPizza, GiFrenchFries, GiFruitBowl } from "react-icons/gi";
import Styles from '../Styles/ComponentStyles/FoodFilter.module.css';
import { IconContext } from 'react-icons/lib';

function FoodFilter({ name, selected }) {
  return (
    <IconContext.Provider value={{ color: selected ? "white" : "black", size: 25 }}>
      <div className={`${Styles.main} ${selected ? Styles.selected : ""}`}>
        {name === 'Drink' && <RiDrinks2Line />}
        {name === 'Burger' && <PiHamburger />}
        {name === 'Pizza' && <GiFullPizza />}
        {name === 'French fries' && <GiFrenchFries />}
        {name === 'Veggies' && <GiFruitBowl />}
        <p>{name}</p>
      </div>
    </IconContext.Provider>
  );
}

export default FoodFilter;
