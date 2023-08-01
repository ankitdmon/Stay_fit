
import { Row } from "react-bootstrap";
import "./MealSearchedResult.css";
import SearchedMealsCard from "./SearchedMealsCard";

function MealSearchedResult({ searchedMeals }) {
    // console.log(searchedMeals);

    return (
        <Row className="mt-3">
            {searchedMeals.map((meal) =>
                <SearchedMealsCard
                    key={meal.id}
                    id={meal.id}
                    title={meal.title}
                    image={meal.image}
                    nutrition={meal.nutrition} />
            )
            }
        </Row >
    )
}
export default MealSearchedResult;