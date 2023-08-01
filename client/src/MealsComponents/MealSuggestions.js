import { Card, Button } from "react-bootstrap";
import "./MealSuggestion.css"
import { Link } from "react-router-dom";

function MealSuggestions() {

    return (
        <div>
            <h3 className="heading">Meals Suggestions</h3>
            <Card className="MealSuggestionCard" style={{ width: "22rem" }}>
                <Card.Img variant="top" src="https://images.unsplash.com/photo-1589010588553-46e8e7c21788?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80" />
                <Card.Body>
                    <Card.Title>Plan Your Meal</Card.Title>
                    <Card.Text>
                        In my food world, there is no fear or guilt, only joy and balance.
                        So no ingredient is ever off-limits. Rather,
                        all of the recipes here follow my Usually-Sometimes-Rarely philosophy.
                        Notice there is no Never.
                    </Card.Text>
                    <Link to="/meals">
                        <Button size="md"
                            block outline
                            color="info">
                            Choose Your Meal
                        </Button>
                    </Link>
                </Card.Body>
            </Card>
        </div>
    );
}

export default MealSuggestions;