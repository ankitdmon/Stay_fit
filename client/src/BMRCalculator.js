
import { useContext, useState } from 'react';
import { Card } from "react-bootstrap";
import { Button } from 'reactstrap'
import ActivityLevel from './ActivityLevel';
import "./BmrForm.css";
import BmrForm from './BmrForm';
import DietPlan from './DietPlan';
import MealSuggestions from './MealsComponents/MealSuggestions';
import UserContext from './UserContext';

function BMRCalculator() {

    const INTIAL_DATA = {
        weight: "",
        height: "",
        gender: "Male",
        age: "",
        activityLevel: "",
        dietPlan: "Maintain current weight; 0 calories deficit"
    }

    const [bmrData, setBmrData] = useState(INTIAL_DATA);
    const [bmr, setBmr] = useState('');
    const { calories, caloriesCount, dietcalories, caloriesCountAfterDietPlan } = useContext(UserContext);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setBmrData(data => ({
            ...data,
            [name]: value
        }));
    }

    /**Women: BMR = 655 + (4.35 x weight in pounds) + (4.7 x height in inches) - (4.7 x age in years)

       Men: BMR = 66 + (6.23 x weight in pounds) + (12.7 x height in inches) - (6.8 x age in years) */

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let bmr;
        let weight = data.get('weight');
        let gender = data.get("gender");
        let age = data.get('age');
        let height = data.get('height');
        let h = height * 12;

        if (gender === 'female') {
            bmr = 655 + (4.35 * (weight)) + (4.7 * h) - (4.7 * (age));
            setBmr(bmr.toFixed(2));
        }
        else if (gender === 'male') {
            bmr = 66 + (6.23 * weight) + (12.7 * h) - (6.8 * age);
            setBmr(bmr.toFixed(2));
        }
        setBmrData(INTIAL_DATA);
    };

    const handleBMRSubmit = (event) => {
        event.preventDefault();
        let totalCalories;
        const data = new FormData(event.currentTarget);
        const dataValue = data.get('activityLevel');
        if (dataValue === 'little or no exercise') {
            totalCalories = Math.floor(bmr * 1.2);
            caloriesCount(totalCalories);

        }
        else if (dataValue === 'light exercise/sports 1-3 days/week') {
            totalCalories = Math.floor(bmr * 1.375);
            caloriesCount(totalCalories);
        }
        else if (dataValue === 'moderate exercise/sports 3-5 days/week') {
            totalCalories = Math.floor(bmr * 1.55);
            caloriesCount(totalCalories);
        }
        else if (dataValue === 'hard exercise/sports 6-7 days a week') {
            totalCalories = Math.floor(bmr * 1.725);
            caloriesCount(totalCalories);
        }
        else if (dataValue === 'very hard exercise/sports and physical job or 2x training') {
            totalCalories = Math.floor(bmr * 1.9);
            caloriesCount(totalCalories);
        }
    }

    const handleDietPlanSubmit = (event) => {
        event.preventDefault();
        let totalCalories = calories;
        const data = new FormData(event.currentTarget);
        const dietPlanValue = data.get('dietPlan');

        if (dietPlanValue === 'Maintain current weight; 0 calories deficit') {
            caloriesCountAfterDietPlan(totalCalories);
        }
        else if (dietPlanValue === 'Gain .5lb per week; 250 calories surplus') {
            totalCalories += 250;
            caloriesCountAfterDietPlan(totalCalories);
        }
        else if (dietPlanValue === 'Gain 1lb per week; 500 calories surplus') {
            totalCalories += 500;
            caloriesCountAfterDietPlan(totalCalories);
        }
        else if (dietPlanValue === 'Gain 1.5lb per week; 750 calories surplus') {
            totalCalories += 750;
            caloriesCountAfterDietPlan(totalCalories);
        }
        else if (dietPlanValue === 'Lose .5lb per week; 250 calories deficit') {
            totalCalories -= 250;
            caloriesCountAfterDietPlan(totalCalories);
        }
        else if (dietPlanValue === 'Lose 1lb per week; 500 calories deficit') {
            totalCalories -= 500;
            caloriesCountAfterDietPlan(totalCalories);
        }
        else if (dietPlanValue === 'Lose 1.5lb per week; 750 calories deficit') {
            totalCalories -= 750;
            caloriesCountAfterDietPlan(totalCalories);
        }
    }

    const props = {
        weight: bmrData.weight,
        height: bmrData.height,
        age: bmrData.age,
        gender: bmrData.gender
    };
    return (
        <>
            <Card style={{ width: '22rem' }}>
                <h4 className="Title">BMR &amp; Calories Calculator</h4>
                <BmrForm
                    // value={bmrData.weight, bmrData.height, bmrData.age, bmrData.gender}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}{...props}
                />
                {bmr ?
                    <div><Button className="Btn"
                        color="success"
                        size="md"
                        block >
                        Your BMR : {bmr}
                    </Button>
                    </div>
                    : null}
                {bmr ?
                    <ActivityLevel
                        name="activityLevel"
                        value={bmrData.activityLevel}
                        handleChange={handleChange}
                        handleBMRSubmit={handleBMRSubmit} /> : null
                }
                {calories ?
                    <div>
                        <Button className="Btn"
                            color="success"
                            size="md"
                            block >
                            Total Calories : {calories}
                        </Button>
                    </div>
                    : null}
                {calories ?
                    <DietPlan name="dietPlan"
                        value={bmrData.dietPlan}
                        handleChange={handleChange}
                        handleDietPlanSubmit={handleDietPlanSubmit} />
                    : null}
                {dietcalories ?
                    <div>
                        <Button className="Btn"
                            color="success"
                            size="md"
                            block >
                            Total Calories You need : {dietcalories}
                        </Button>
                    </div>
                    : null}
            </Card>
            <MealSuggestions />
        </>
    );

}
export default BMRCalculator;