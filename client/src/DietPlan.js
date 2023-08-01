
import { Form } from "react-bootstrap";
import { Button } from 'reactstrap'
import "./BmrForm.css";

function DietPlan({ value, handleChange, handleDietPlanSubmit }) {
    return (
        <Form className="form" onSubmit={handleDietPlanSubmit}>
            <Form.Group className="mb-3">
                <Form.Label><b>Diet Plan</b></Form.Label>
                <Form.Select name="dietPlan"
                    value={value}
                    onChange={handleChange}>
                    <option value="Maintain current weight; 0 calories deficit">
                        Maintain current weight; 0 calories deficit
                    </option>
                    <option value="Gain .5lb per week; 250 calories surplus">
                        Gain .5lb per week; 250 calories surplus
                    </option>
                    <option value="Gain 1lb per week; 500 calories surplus">
                        Gain 1lb per week; 500 calories surplus
                    </option>
                    <option value="Gain 1.5lbs per week; 750 calories surplus">
                        Gain 1.5lbs per week; 750 calories surplus
                    </option>
                    <option value="Lose .5lb per week; 250 calories deficit">
                        Lose .5lb per week; 250 calories deficit
                    </option>
                    <option value="Lose 1lb per week; 500 calories deficit">
                        Lose 1lb per week; 500 calories deficit
                    </option>
                    <option value="Lose 1.5lbs per week; 750 calories deficit">
                        Lose 1.5lbs per week; 750 calories deficit
                    </option>
                </Form.Select>
            </Form.Group>
            <Button type="submit" size="md" block>
                Plan A Diet
            </Button>
        </Form>
    );
}

export default DietPlan;