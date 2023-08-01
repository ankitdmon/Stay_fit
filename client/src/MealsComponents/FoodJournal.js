import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';
import MealsTable from './MealsTable';
import { Button } from 'reactstrap';
import "./FoodJournal.css";
import image from "../Image/empty-cart.png";

function FoodJournal() {

    const { getMeals } = useContext(UserContext);
    const [userMeals, setUsersMeals] = useState('');
    const { removeMealsFromList } = useContext(UserContext);

    useEffect(() => {
        async function getUserMeals() {
            let m = await getMeals();
            setUsersMeals(m.meals);
        }
        getUserMeals();
    }, [getMeals])

    async function handleRemove(mealId) {
        const newList = userMeals.filter((meal) => meal.meal_id !== mealId);
        await removeMealsFromList(mealId);
        setUsersMeals(newList);
    }

    return (
        <>
            {userMeals ?
                userMeals.length
                    ? <MealsTable meals={userMeals} handleRemove={handleRemove} />
                    : <div className='conatainer FoodJournalTitle'>
                        <img src={image} className='image' />
                        <h6>Looks like you haven't added anything to your Food Journal yet.  </h6>
                        <div>
                            <Link to='/meals'>
                                <Button size="md"
                                    color="success">
                                    Click here to add
                                </Button>
                            </Link>
                        </div>
                    </div>
                : null}
        </>
    )

}

export default FoodJournal;