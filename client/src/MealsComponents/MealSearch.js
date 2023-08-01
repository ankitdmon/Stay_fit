import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./MealSearch.css"
import MealSearchedResult from "./MealSearchedResult";
import Constants from '../Config';
import Alert from 'react-bootstrap/Alert'

function MealSearch() {

    const [query, setQuery] = useState("");
    const [searchedMeals, setSearchedMeals] = useState("");
    const [error, setError] = useState(false);

    async function getSearchMeals() {
        let results = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${Constants.API_KEY}&query=${query}&maxCalories=800&maxProtein=100&maxFat=100&maxCarbs=100&maxSaturatedFat=100&number=12`);
        if (results.data.results.length === 0) {
            setError(true);
        }
        else {
            setError(false);
        }
        setSearchedMeals(results.data.results);

    }
    const handleSubmit = (evt) => {
        evt.preventDefault();
        getSearchMeals();
    }

    const handleChange = (evt) => {
        setQuery(evt.target.value);
    }
    return (
        <>
            <div className="searchMealInput">
                {error ? <Alert variant="danger">
                    No Results found
                </Alert> : null}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label><h2>Search Meal 🥗 </h2></Form.Label>
                        <Form.Control type="text"
                            placeholder="Example: pasta"
                            name="query"
                            required
                            id="meal"
                            value={query}
                            onChange={handleChange} />
                    </Form.Group>
                    <Button type="submit">Search</Button>
                </Form>
            </div>
            {searchedMeals && <MealSearchedResult searchedMeals={searchedMeals} />}
        </>
    );
}

export default MealSearch;