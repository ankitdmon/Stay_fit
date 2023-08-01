import { Form } from "react-bootstrap";
import { Button } from 'reactstrap'
import "./BmrForm.css";



function ActivityLevel({ value, handleChange, handleBMRSubmit }) {

    return (
        <Form className="form" onSubmit={handleBMRSubmit}>
            <Form.Group className="mb-3">
                <Form.Label><b>Activity Level</b></Form.Label>
                <Form.Select name="activityLevel"
                    id="activityLevel"
                    value={value}
                    onChange={handleChange}>
                    <option value="little or no exercise">
                        Little or no exercise
                    </option>
                    <option value="light exercise/sports 1-3 days/week">
                        Light exercise/sports 1-3 days/week
                    </option>
                    <option value="moderate exercise/sports 3-5 days/week">
                        Moderate exercise/sports 3-5 days/week
                    </option>
                    <option value="hard exercise/sports 6-7 days a week">
                        Hard exercise/sports 6-7 days a week
                    </option>
                    <option value="very hard exercise/sports and physical job or 2x training">
                        Very hard exercise/sports and physical job or 2x training
                    </option>
                </Form.Select>
            </Form.Group>
            <Button type="submit" size="md" block>
                Calculate Calories
            </Button>
        </Form>
    )
}



export default ActivityLevel;