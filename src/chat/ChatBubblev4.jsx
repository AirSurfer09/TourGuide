import "./index.css";
import React from "react";
import { useRef, useEffect, useState } from "react";
import logo from "../assets/ConvaiLogo.png";
import ThumbsUp_fill from "../assets/Thumbsup_fill.png";
import Thumbsdown_fill from "../assets/Thumbsdown_fill.png";
import Thumbsup_outline from "../assets/Thumbsup_outline.png";
import Thumbsdownoutline from "../assets/Thumbsdownoutline.png";

const ChatBubblev4 = (props) => {
  var {
    userText,
    npcText,
    messages,
    chatHistory,
    keyPressed,
    setEnter,
    userInput,
    npcName,
    userName,
  } = props;

  const containerRef = useRef(null);
  const [value, setValue] = useState("");
  const [feedbacks, setFeedbacks] = useState(Array(messages.length).fill(0));

  //To keep the scroll bar fixed to the bottom
  useEffect(() => {
    const container = containerRef.current;
    container.scrollTop = container.scrollHeight;
  }, [npcText]);

  //Handles the input from the textBox
  const handleChange = (e) => {
    e.stopPropagation();
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userInput(value);
    setEnter(1);
    setValue("");
  };
  return (
    <section
      className="container"
      style={{
        position: "absolute",
        top: "11vh",
        width: "32vw",
        height: "40vw",
        borderRadius: "10px",
        background: "rgba(0, 0, 0, 0.7)",
      }}
    >
      {chatHistory === "Show" ? (
        <div
          className="container-chat1"
          ref={containerRef}
          style={{
            width: "100%",
            height: "90%",
            overflow: "auto",
            marginBottom: "25px",
            marginTop: "10px",
            textAlign: "left",
          }}
        >
          {messages.map((message, idx) => {
            const isUserMessage = message.sender === "user";
            const nextMessage = messages[idx + 1];
            const isNextMessageUser =
              !nextMessage || nextMessage.sender === "user";
            const isNextMessageNpc =
              !nextMessage || nextMessage.sender === "npc";

            const messageStyle = {
              color: "#FFFFFF",
              paddingLeft: "15px",
              // marginBottom: isNextMessageUser ? "0px" : 0,
            };

            return (
              <section key={idx}>
                {message.sender === "user" && isNextMessageNpc
                  ? message.content && (
                      <div
                        style={{
                          display: "flex",
                          marginBottom: "-12px",
                          marginTop: "-10px",
                        }}
                      >
                        <p
                          style={{
                            color: "rgba(243,167,158,255)",
                            paddingLeft: "20px",
                            marginRight: "-10px",
                            fontWeight: "bold",
                          }}
                        >
                          {userName}:
                        </p>
                        <p style={messageStyle}>{message.content}</p>
                      </div>
                    )
                  : message.sender === "npc" && isNextMessageUser
                  ? message.content && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "15px",
                          marginLeft: "20px",
                        }}
                      >
                        <div>
                          <span
                            style={{
                              color: "rgba(127,210,118,255)",
                              marginRight: "-10px",
                              fontWeight: "bold",
                            }}
                          >
                            {npcName}:
                          </span>
                          <span style={messageStyle}>{message.content}</span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            marginLeft: "7px",
                            marginRight: "20px",
                          }}
                        >
                          <img
                            style={{ paddingRight: "10px" }}
                            src={
                              feedbacks[idx] === 1
                                ?  ThumbsUp_fill 
                                :  Thumbsup_outline 
                            }
                            alt=""
                            height="17px"
                            onClick={() => {
                              const newFeedbacks = [...feedbacks];
                              newFeedbacks[idx] = feedbacks[idx] === 1 ? 0 : 1;
                              setFeedbacks(newFeedbacks);
                            }}
                          ></img>
                          <img
                            src={
                              feedbacks[idx] === 2
                                ?  Thumbsdown_fill 
                                :  Thumbsdownoutline 
                            }
                            alt=""
                            height="17px"
                            onClick={() => {
                              const newFeedbacks = [...feedbacks];
                              newFeedbacks[idx] = feedbacks[idx] === 2 ? 0 : 2;
                              setFeedbacks(newFeedbacks);
                            }}
                          ></img>
                        </div>
                      </div>
                    )
                  : ""}
              </section>
            );
          })}
        </div>
      ) : (
        <div
          className="container-chat1"
          ref={containerRef}
          style={{
            width: "100%",
            height: "90%",
            overflow: "auto",
            marginBottom: "25px",
            marginTop: "10px",
            textAlign: "left",
          }}
        >
          {userText && (
            <div>
              <div
                style={{
                  display: "flex",
                  marginBottom: "-12px",
                  marginTop: "10px",
                }}
              >
                <p
                  style={{
                    color: "rgba(243,167,158,255)",
                    paddingLeft: "20px",
                    marginRight: "-10px",
                    fontWeight: "bold",
                  }}
                >
                  User:
                </p>
                <p style={{ color: "#FFFFFF", paddingLeft: "15px" }}>
                  {userText}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "15px",
                  marginLeft: "20px",
                }}
              >
                <div>
                  <span
                    style={{
                      color: "rgba(127,210,118,255)",
                      marginRight: "-10px",
                      fontWeight: "bold",
                    }}
                  >
                    Npc:
                  </span>
                  <span style={{ color: "#FFFFFF", paddingLeft: "15px" }}>
                    {npcText}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginLeft: "7px",
                    marginRight: "20px",
                  }}
                >
                  <img
                    style={{ paddingRight: "10px" }}
                    src="Thumbsup_outline.png"
                    alt=""
                    height="17px"
                  ></img>
                  <img src="Thumbsdownoutline.png" alt="" height="17px"></img>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div
        className="container-textBox"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {keyPressed && (
          <div className="icon" style={{ marginBottom: "20px" }}>
            <span className="span-prop" />
            <span className="span-prop" />
            <span className="span-prop" />
          </div>
        )}
        {!keyPressed && (
          <form onSubmit={handleSubmit} style={{ width: "80%" }}>
            <input
              className="placeholder1"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.01)",
                borderWidth: "0px",
                width: "80%",
                color: "white",
                marginLeft: "20px",
              }}
              onChange={handleChange}
              value={value}
              placeholder="Press [T] to talk or type your response here"
              type="text"
            />
          </form>
        )}

        <div
          className="logo"
          style={{
            alignSelf: "end",
            marginRight: "20px",
            marginBottom: "15px",
          }}
        >
          <img src={logo} height="25px" width="80px" alt=""></img>
        </div>
      </div>
    </section>
  );
};

export default ChatBubblev4;
