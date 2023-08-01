import { Form } from "react-bootstrap";
import { Button } from 'reactstrap'
import "./BmrForm.css";


function BmrForm({ weight, height, age, gender, handleChange, handleSubmit }) {
    return (
        <Form className="form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label><b>Weight</b><span>(lbs)</span></Form.Label>
                <Form.Control type="text"
                    placeholder="Enter Your Weight in Pounds"
                    name="weight"
                    required
                    id="weight"
                    autoFocus
                    value={weight}
                    onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label><b>Height</b><span>(Ex.5.0)</span></Form.Label>
                <Form.Control type="text"
                    placeholder="Enter Your Height Ex. 5.0"
                    required
                    id="height"
                    name="height"
                    value={height}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label><b>Age</b></Form.Label>
                <Form.Control type="number"
                    placeholder="Enter Your Age"
                    required
                    id="age"
                    name="age"
                    value={age}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label><b>Gender</b></Form.Label>
                <Form.Select name="gender"
                    value={gender}
                    onChange={handleChange}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </Form.Select>
            </Form.Group>
            <Button type="submit" size="md" block>
                Calculate BMR
            </Button>
        </Form>
    )
}



export default BmrForm;