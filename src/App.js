import React, { useState } from "react";
import "./App.css";
import Button from "./component/button";
import axios from "axios";

function App() {
  let [userData, setUserData] = useState([]);
  let [loading, setLoading] = useState(false);
  let [activeUser, setActiveUser] = useState(false);
  let [phrase, setPhrase] = useState(0);

  //button click function
  let onClickHandler = async () => {
    setLoading(true);
    try {
      let rawData = await axios.get("https://randomuser.me/api/");
      setUserData(rawData.data.results);
      console.log(rawData.data.results);
    } catch (err) {
      setLoading(true);
      console.log(err);
    } finally {
      setLoading(false);
      setActiveUser(true);
    }
  };

  //fonts
  let icons = [
    <i class="fas fa-user fa-4x"></i>,
    <i class="fas fa-envelope fa-4x"></i>,
    <i class="fas fa-calendar fa-4x"></i>,
    <i class="fas fa-map-marker fa-4x"></i>,
    <i class="fas fa-phone fa-4x"></i>,
  ];

  let PhraseGenerator = ({ data }) => {
    let phraseWords = [
      `Name : ${data.name.first} ${data.name.last}`,
      `Email : ${data.email}`,
      `D.O.B : ${data.dob.date.slice(0, 10)}`,
      `Country : ${data.location.country}`,
      `Phone : ${data.phone}`,
    ];
    return <h3>{phraseWords[phrase]}</h3>;
  };

  //handle phrase on mouse hover
  let handlePhrase = (index) => setPhrase(index);
  return (
    <div className="App">
      <h1>GitHub Random User</h1>
      {loading ? (
        <h2>Loading... ... ... ... ... ...</h2>
      ) : (
        <div className="app_user">
          {userData.map((item) => {
            return (
              <div key={item.id.value}>
                <div className="image">
                  <img src={item.picture.medium} alt={item.email} />
                </div>
                <br />
                <div class="phraseGenerator">
                  <PhraseGenerator data={item} />
                </div>
                <br />
                <div className="app_icons">
                  {icons.map((item, index) => (
                    <li key={index} onMouseEnter={() => handlePhrase(index)}>
                      {item}
                    </li>
                  ))}
                </div>
              </div>
            );
          })}
          <br />
          <div className="button">
            <Button isActive={activeUser} clicked={onClickHandler} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
