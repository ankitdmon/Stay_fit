import { Card, Col } from "react-bootstrap";
import "./Meal.css";
import { Button } from 'reactstrap';
import UserContext from "../UserContext";
import { useContext } from "react";

function SavedMealsCard({ mealId, mealName, calories, img, handleRemove }) {

    return (
        <Col className='MealsRow1'>
            <Card className="MealsCard" style={{ width: "14rem" }} >
                <Card.Img variant="top" src={img} alt="recipe" />
                <Card.Body className="cardBody">
                    <Card.Title>{mealName}</Card.Title>
                    <Card.Text>
                        <Button size="md"
                            block
                            color="success">
                            Calories:  {calories}
                        </Button>
                        <Button size="md"
                            block onClick={() => handleRemove(mealId)}
                            color="warning">
                            Delete
                        </Button>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default SavedMealsCard;