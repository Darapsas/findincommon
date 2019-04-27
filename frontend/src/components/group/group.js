import React, { useState, useEffect, useRef } from "react";
import { getUserGroups, getUserCreatedGroups } from "../../helpers/requests";
import GroupList from "./group-list";
import Loader from "../templates/loader";

// interval hook was borrowed from: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

let _isMounted;
export default props => {
  const [groups, setGroups] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [itemDeleted, setItemDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  useInterval(() => {
    setCount(count + 1);
  }, 5000);

  useEffect(() => {
    _isMounted = true;
    async function fetchData() {
      await getUserGroups(props.currentUser.id)
        .then(data => {
          if (_isMounted) {
            setGroups(data);
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
  }, [itemDeleted, count]);

  useEffect(() => {
    _isMounted = true;
    async function fetchData() {
      await getUserCreatedGroups(props.currentUser.id)
        .then(data => {
          if (_isMounted) {
            setUserGroups(data);
          }
        })
        .catch(error => {
          console.error("Error: ", error);
        });
      setLoading(false);
    }
    fetchData();
    // FIX double rerender, if there will be time
    setItemDeleted(false);
    return () => {
      _isMounted = false;
    };
  }, [itemDeleted, count]);

  const handleDelete = () => {
    setItemDeleted(true);
  };

  if (loading) {
    return (
      <main role="main" style={{ textAlign: "center" }}>
        <Loader />
      </main>
    );
  }

  return (
    <div className="custom w-75">
      <br />
      <h2>Your created groups:</h2>
      <GroupList groups={userGroups} handleDelete={handleDelete} owned={true} />
      <br />
      <br />
      <h2>Other groups:</h2>
      {groups.length !== 0 && <GroupList groups={groups} owned={false} />}
    </div>
  );
};
