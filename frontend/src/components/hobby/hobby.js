import React, { useState, useEffect } from "react";
import { getUserHobbies, getHobbies } from "../../helpers/requests";
import HobbiesList from "./hobbies-list";
import Loader from "../templates/loader";

let _isMounted;
export default props => {
  const [hobbies, setHobbies] = useState([]);
  const [availableHobbies, setAvailableHobbies] = useState([]);
  const [itemsChanged, setItemsChanged] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    _isMounted = true;
    async function fetchData() {
      await getUserHobbies(props.currentUser.id)
        .then(data => {
          if (_isMounted) {
            setHobbies(data);
          }
        })
        .catch(error => {
          console.error("Error: ", error);
        });
      setLoading(false);
    }
    fetchData();
    return () => {
      _isMounted = false;
    };
  }, [itemsChanged]);

  useEffect(() => {
    _isMounted = true;
    async function fetchData() {
      await getHobbies()
        .then(data => {
          if (_isMounted) {
            setAvailableHobbies(data);
          }
        })
        .catch(error => {
          console.error("Error: ", error);
        });
      setLoading(false);
    }
    setItemsChanged(false);
    fetchData();
    return () => {
      _isMounted = false;
    };
  }, [itemsChanged]);

  if (loading) {
    return (
      <main role="main" style={{ textAlign: "center" }}>
        <Loader />
      </main>
    );
  }

  const handleChange = () => {
    props.handleHobbiesListChange();
    setItemsChanged(true);
  };

  return (
    <div className="custom w-75">
      <br />
      <h2>Your hobbies:</h2>
      <HobbiesList
        hobbies={hobbies}
        handleChange={handleChange}
        owned={true}
        currentUser={props.currentUser}
      />
      <br />
      <br />
      <br />
      <h2>Available hobbies:</h2>
      <HobbiesList
        hobbies={props.hobbies.length === 0 ? availableHobbies : props.hobbies}
        handleChange={handleChange}
        owned={false}
        currentUser={props.currentUser}
      />
    </div>
  );
};
