import './MealsTable.css';
import { Row } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import "./Meal.css";
import SavedMealsCard from './SavedMealsCard';

function MealsTable({ meals, handleRemove }) {

    return (
        <div className="container">
            <Row className="MealRow1">
                {meals.map((m) =>
                    <SavedMealsCard
                        key={m.id}
                        mealId={m.meal_id}
                        img={m.img}
                        calories={m.calories}
                        mealName={m.meal_name}
                        handleRemove={handleRemove} />
                )}
            </Row>
            <Table striped bordered hover variant='dark' responsive="sm" className='Table' >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Meals</th>
                        <th>Calories</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                {meals.map((m) =>
                    <tbody key={m.id}>
                        <tr>
                            <td>{m.id}</td>
                            <td>{m.meal_name}</td>
                            <td>{m.calories}</td>
                            <td>{new Date(m.created_at).toLocaleString()}</td>
                        </tr>
                    </tbody>
                )}
            </Table>
        </div>
    )
}



export default MealsTable;