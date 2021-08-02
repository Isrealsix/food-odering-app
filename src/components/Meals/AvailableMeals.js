import React, { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

// hi

const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		const fetchMeals = async () => {
			setIsLoading(true);
			const response = await fetch(
				'https://appseven-9144b-default-rtdb.firebaseio.com/meals.json'
			);
			const responseData = await response.json();

			const loadedMeals = [];

			for (const key in responseData) {
				loadedMeals.push({
					id: key,
					name: responseData[key].name,
					description: responseData[key].description,
					price: responseData[key].price,
				});
			}
			setMeals(loadedMeals);
			setIsLoading(false);
		};

		fetchMeals();
	}, []);
	const mealsList = meals.map(meal => (
		<MealItem
			key={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
			id={meal.id}
		/>
	));

	if (isLoading) {
		return (
			<section>
				<p className={classes.loading}>Loading...</p>
			</section>
		);
	}
	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
