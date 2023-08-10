import "./index.css";
import React from "react";
import { useState } from "react";
import logo from "../assets/ConvaiLogo.png";
import ThumbsUp_fill from "../assets/Thumbsup_fill.png";
import Thumbsdown_fill from "../assets/Thumbsdown_fill.png";
import Thumbsup_outline from "../assets/Thumbsup_outline.png";
import Thumbsdownoutline from "../assets/Thumbsdownoutline.png";

const ChatBubblev3 = (props) => {
  var { userText, npcText, keyPressed, npcName, userName } = props;
  const [feedback, setFeedback] = useState(0);

  const speaking = {
    marginRight: "20px",
    borderColor: "rgba(219,168,66,255)",
    borderStyle: "solid",
    borderWidth: "3px",
    borderRadius: "100%",
  };

  return (
    <section
      className="container"
      style={{
        position: "absolute",
        top: "87vh",
        left: "3.5vw",
        display: "flex",
        flexDirection: "row",
        width: "92vw",
        height: "50px",
        borderRadius: "10px",
        background: "rgba(0, 0, 0, 0.7)",
      }}
    >
      <div style={{ marginLeft: "20px", alignSelf: "center" }}>
        <img src={logo} height="30px" width="100px" alt=""></img>
      </div>
      <div className="container-chat" style={{ textAlign: "center" }}>
        {userText === "" ? (
          <p
            style={{
              maxHeight: "300px",
              width: "100%",
              color: "rgba(219,168,66,255)",
              marginTop: "13px",
              marginLeft: "15px",
              marginRight: "15px",
            }}
          >
            Press [T] to talk
          </p>
        ) : 
        npcText ? (
          <div
            style={{
              width: "100%",
              marginTop: "8px",
              marginLeft: "20px",
              marginRight: "20px",
            }}
          >
            <span
              style={{ color: "rgba(127,210,118,255)", fontWeight: "bold" }}
            >
              {npcName}:
            </span>
            <span
              style={{
                maxHeight: "38px",
                width: "100%",
                color: "white",
                lineHeight: "2",
              }}
            >
              {npcText}
            </span>
          </div>
        ) : (
          <div style={{ width: "100%", marginTop: "14px" }}>
            <span
              style={{ color: "rgba(243,167,158,255)", fontWeight: "bold" }}
            >
              {userName}:
            </span>
            <span
              style={{
                maxHeight: "300px",
                width: "90%",
                color: "#FFFFFF",
              }}
            >
              {userText}
            </span>
          </div>
        )}
      </div>
      {npcText === "" ? (
        keyPressed ? (
          <div
            className="icon"
            style={{ marginRight: "20px", marginTop: "19px" }}
          >
            <span className="span-prop" />
            <span className="span-prop" />
            <span className="span-prop" />
          </div>
        ) : (
          <div>
            <div
              style={{
                display: "flex",
                marginTop: "14px",
                marginLeft: "15px",
              }}
            >
              <img
                style={keyPressed ? speaking : { marginRight: "20px" }}
                src="mic.png"
                alt=""
                height="20px"
              ></img>
            </div>
          </div>
        )
      ) : (
        <div
          style={{
            display: "flex",
            marginTop: "14px",
            paddingRight: "20px",
            marginLeft: "10px",
          }}
        >
          <img
            style={{ paddingRight: "10px" }}
            src={feedback === 1 ?  ThumbsUp_fill  :  Thumbsup_outline }
            alt=""
            height="20px"
            onClick={
              feedback === 1 ? () => setFeedback(0) : () => setFeedback(1)
            }
          ></img>
          <img
            src={feedback === 2 ?  Thumbsdown_fill  :  Thumbsdownoutline }
            alt=""
            height="20px"
            onClick={
              feedback === 2 ? () => setFeedback(0) : () => setFeedback(2)
            }
          ></img>
        </div>
      )}
    </section>
  );
};

export default ChatBubblev3;
