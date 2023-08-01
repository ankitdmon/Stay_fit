import axios from "axios";
import { useState, useEffect } from "react"
import Constants from "../Config";
import MealCard from "./MealCard";
import LoadingSpinner from "../LoadingSpinner";

function Meal({ meal }) {

    const [imageUrl, setImageUrl] = useState("");
    const [mealData, setMealData] = useState("");
    const [nutrients, setNutrients] = useState("");
    const [mealLoaded, setMealLoaded] = useState(false);

    const URL = `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=${Constants.API_KEY}&includeNutrition=true`;
    useEffect(() => {
        async function getMealInfo() {
            try {
                let result = await axios.get(URL);
                setImageUrl(result.data.image);
                setMealData(result.data);
                setNutrients(result.data.nutrition.nutrients);
            } catch (error) {
                console.log(error);
            }
            setMealLoaded(true);
        }
        getMealInfo();
        setMealLoaded(false);
    }, [meal.id])
    if (!mealLoaded) return <LoadingSpinner />;
    return (
        <>
            {imageUrl && mealData && nutrients &&
                <MealCard
                    key={meal.id}
                    id={meal.id}
                    title={meal.title}
                    imageUrl={imageUrl}
                    mealData={mealData}
                    nutrients={nutrients} />}
        </>
    );
}

export default Meal;