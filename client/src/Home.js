import { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import "./App.css"
import UserContext from "./UserContext";

function Home() {

    const { currentUser } = useContext(UserContext);
    // console.debug("Homepage", "currentUser=", currentUser);

    return (<>
        {currentUser
            ? <h2 className="mb-4 font-weight-bold homeTitle">
                Welcome Back, {currentUser.firstName || currentUser.username} !
                <p className="quote">To ensure good health: eat lightly, breathe deeply, live moderately, cultivate cheerfulness, and maintain an interest in life</p>
            </h2 >
            : (
                <Card style={{ width: '22rem' }}>
                    <Card.Body>
                        <Card.Text className="font-weight-bold" style={{ fontSize: '2rem' }}>
                            Fitness starts with what you eat.
                        </Card.Text>
                        <Card.Text style={{ fontSize: '0.8rem' }}>
                            Want to eat more mindfully? Track meals, learn about your habits, and reach your goals with MyFitness.
                        </Card.Text>
                        <Button variant="secondary" size="sm" href="/login">Login</Button>{' '}
                        <Button variant="secondary" size="sm" href="/signup">Signup</Button>
                    </Card.Body>
                </Card>
            )
        }
    </>
    )
}


export default Home;