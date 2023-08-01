import { useEffect, useState } from 'react';

//   const [myThing, setMyThing] = useLocalStorage("myThing")

function useLocalStorage(key, firstValue = null) {
    const INITIAL_VALUE = localStorage.getItem(key) || firstValue;

    const [item, setItem] = useState(INITIAL_VALUE);

    useEffect(function setKeyInLocalStorage() {

        if (item === null) {
            localStorage.removeItem(key);
        }
        else {
            localStorage.setItem(key, item);
        }
    }, [key, item]);
    return [item, setItem];
}


export default useLocalStorage;