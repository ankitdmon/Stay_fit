import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import RoutesComponents from './RoutesComponents';
import MyfitnessApi from "./api";
import NavBar from './NavBar';
import { Fragment, useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";
import jwt_decode from "jwt-decode"
import UserContext from "./UserContext";
import LoadingSpinner from "./LoadingSpinner";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "myfitness-token";

function App() {

  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [currentUser, setCurrentUser] = useState(null);
  const [calories, setCalories] = useState(2000);
  const [dietcalories, setDietCalories] = useState('');
  const [infoLoaded, setInfoLoaded] = useState(false);

  useEffect(function loadUserInfo() {
    async function getCurrentUser() {
      if (token) {
        try {
          let user = jwt_decode(token, { complete: true });
          MyfitnessApi.token = token;
          let currentUser = await MyfitnessApi.getCurrentUser(user.username);
          setCurrentUser(currentUser);
        } catch (error) {
          console.error(error);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  async function login(logindata) {
    try {
      let token = await MyfitnessApi.login(logindata);
      setToken(token);
      return { success: true };
    } catch (error) {
      console.error("login failed", error);
      return { success: false, error };
    }

  }

  async function signUp(signdata) {
    try {
      let token = await MyfitnessApi.signup(signdata);
      setToken(token);
      return { success: true };
    } catch (error) {
      console.error("signUp failed", error);
      return { success: false, error };
    }
  }

  //Keep track of the calories
  function caloriesCount(calorie) {
    setCalories(calorie);
  }
  function caloriesCountAfterDietPlan(calorie) {
    setDietCalories(calorie);
  }

  // Handle logout
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  async function addMealsToUsers(data) {

    await MyfitnessApi.addToFoodJournal(currentUser.username, data);

  }

  async function getMeals() {
    let meal = await MyfitnessApi.getMeals(currentUser.username);
    return meal;
  }

  async function removeMealsFromList(mealId) {
    await MyfitnessApi.remove(currentUser.username, mealId);
  }

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <div className="App">
      <Router>
        <Fragment>
          <UserContext.Provider
            value={{
              currentUser, setCurrentUser,
              calories, caloriesCount,
              dietcalories,
              caloriesCountAfterDietPlan,
              addMealsToUsers, getMeals, removeMealsFromList
            }}>
            <NavBar logout={logout} />
            <RoutesComponents login={login} signUp={signUp} />
          </UserContext.Provider>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;
