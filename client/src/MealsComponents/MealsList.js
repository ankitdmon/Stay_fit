import { Button, Row } from 'react-bootstrap';
import Meal from './Meal';
import "./Meal.css";
import MealSearch from './MealSearch';

function MealsList({ mealData }) {

    const nutrients = mealData.nutrients;
    return (
        <main>
            <div className="Nutrients">
                <h2 className='Macros'>Macros</h2>
                <div>
                    <Button variant="success">Calories : {nutrients.calories.toFixed(0)}</Button>{' '}
                    <Button variant="success">Carbohydrates : {nutrients.carbohydrates.toFixed(0)}</Button>{' '}
                    <Button variant="success">Fat : {nutrients.fat.toFixed(0)}</Button>{' '}
                    <Button variant="success">Protein : {nutrients.protein.toFixed(0)}</Button>
                </div>
            </div>
            <h3 className='suggestMeal'>Suggested Meals For A Day Based on Your Calories.</h3>
            <Row className='MealsRow'>
                {mealData.meals.map((meal) => {
                    return <Meal key={meal.id} meal={meal} />
                })}
            </Row>
            <MealSearch />
        </main>
    );
}

export default MealsList;