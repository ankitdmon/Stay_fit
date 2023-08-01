
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';
import UserContext from '../UserContext';
import { useContext, useState } from 'react';

function MealCard({ imageUrl, mealData, nutrients, title, id }) {

    const { addMealsToUsers } = useContext(UserContext);
    const [added, setAdded] = useState();

    let showSomeNurtients = nutrients.slice(0, 5);
    let mealCalorie = parseInt(showSomeNurtients[0].amount);

    async function handleSave(evt) {
        evt.preventDefault();
        let data = { mealId: id, mealName: title, cal: mealCalorie, img: imageUrl };
        await addMealsToUsers(data);
        setAdded(true);
    }


    return (
        <Col xs={12} sm={6} md={4} lg={3}>
            <Card className="MealSuggestionCard" style={{ width: "22rem" }} >
                <Card.Img variant="top" src={imageUrl} alt="recipe" />
                <Card.Body className="cardBody">
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        {showSomeNurtients.map((nutrient) =>
                            <li key={nutrient.name}> {nutrient.name} : {nutrient.amount}{nutrient.unit}
                            </li>)}
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
                    <div><Button className="Btn" href={mealData.sourceUrl} color="info" size="md" block>Read more about it</Button></div>
                </Card.Body>
            </Card>
        </Col >
    );
}

export default MealCard;