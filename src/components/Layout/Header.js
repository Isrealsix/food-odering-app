import React from 'react';
import classes from './Header.module.css';
import mealsImage from '../assets/meals.jpg';

const Header = props => {
	return (
		<React.Fragment>
			<header className={classes.header}>
				<h1>PlaceMeals</h1>
				<button>Cart</button>
			</header>

			<div className={classes['main-image']}>
				<img src={mealsImage} alt="A table full of food" />
			</div>
		</React.Fragment>
	);
};

export default Header;
