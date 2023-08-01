
import { Card } from "react-bootstrap";
import { Button } from 'reactstrap';
import "./MealSearchedResult.css";
import UserContext from '../UserContext';
import { useContext, useState } from 'react'
import { Link } from "react-router-dom";

function SearchedMealsCard({ id, title, image, nutrition }) {
    const { addMealsToUsers } = useContext(UserContext);

    const [added, setAdded] = useState();
    let mealCalorie = parseInt(nutrition.nutrients[0].amount);


    async function handleSave(evt) {
        evt.preventDefault();
        let data = { mealId: id, mealName: title, cal: mealCalorie, img: image };
        await addMealsToUsers(data);
        setAdded(true);
    }

    return (

        < Card className="MealSuggestionCard mt-4" style={{ width: "22rem" }}>
            <Card.Img variant="top" src={image} alt="recipe" />
            <Card.Body className="cardBody">
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {nutrition.nutrients.map((nutrient) =>
                        <li key={nutrient.title}>{nutrient.name} : {nutrient.amount.toFixed(2)}{nutrient.unit}</li>)}
                </Card.Text>
                <div className="buttons">
                    <Button size="md"
                        block outline onClick={handleSave}
                        color="info">
                        {added ? "Added" : "Add"}
                    </Button>
                </div>
                <div className="buttons">
                    <Link to="/foodJournal">
                        <Button size="md"
                            block outline
                            color="info">
                            Go to Food Journal
                        </Button>
                    </Link>
                </div>

            </Card.Body>
        </Card>
    );

}

export default SearchedMealsCard;