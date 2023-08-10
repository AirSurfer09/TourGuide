import React from "react";
import { useState, useEffect, useRef } from "react";
import { ConvaiClient } from "convai-web-sdk";
import ChatBubblev3 from "./ChatBubblev3";
import ChatBubblev2 from "./ChatBubblev2";
import ChatBubblev1 from "./ChatBubblev1";
import ChatBubblev4 from "./ChatBubblev4";
import ChatHistory from "./ChatHistory";
import reset from "../assets/reset.png";
import axios from "axios";
import "./index.css";

export function useConvaiClient(characterId, apiKey) {
  const [userText, setUserText] = useState("");
  const [npcText, setNpcText] = useState("");
  const [isTalking, setIsTalking] = useState(false);
  const [enter, setEnter] = useState(0);
  const [audioPlay, setAudioPlay] = useState(false);
  const [keyPressed, setKeyPressed] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [npcName, setNpcName] = useState("Npc");
  const [userName, setUserName] = useState("User");
  const [gender, setGender] = useState("MALE");
  const [userEndOfResponse, setUserEndOfResponse] = useState(false);
  const npcTextRef = useRef();
  const convaiClient = useRef(null);
  const finalizedUserText = useRef();

  //Intializing the convai Client
  useEffect(() => {
    convaiClient.current = new ConvaiClient({
      apiKey: apiKey,
      characterId: characterId,
      enableAudio: true, // use false for text only.
    });

    convaiClient.current.setResponseCallback((response) => {
      if (response.hasUserQuery()) {
        var transcript = response.getUserQuery();
        setUserEndOfResponse(transcript.getEndOfResponse());
        if (transcript.getIsFinal()) {
          finalizedUserText.current += " " + transcript.getTextData();
          transcript = "";
        }
        if (transcript) {
          setUserText(finalizedUserText.current + transcript.getTextData());
        } else {
          setUserText(finalizedUserText.current);
        }
      }

      if (response.hasAudioResponse()) {
        var audioResponse = response?.getAudioResponse();
        npcTextRef.current += " " + audioResponse.getTextData();
        setNpcText(npcTextRef.current);
        if (audioResponse) {
          setIsTalking(true);
        }
      }
    });

    const fetchData = async () => {
      try {
        const url = "https://api.convai.com/character/get";
        const payload = {
          charID: characterId,
        };
        const headers = {
          "CONVAI-API-KEY": apiKey,
          "Content-Type": "application/json",
        };

        const response = await axios.post(url, payload, { headers });

        if (avatar !== response.data.model_details.modelLink) {
          setAvatar(response.data.model_details.modelLink);
          setNpcName(response.data.character_name);
          setGender(response.data.voice_type);
        }
      } catch (error) {
        console.error("Error fetching character:", error);
      }
    };

    fetchData();

    //Triggers when npc starts speaking
    convaiClient.current.onAudioPlay(() => {
      setAudioPlay(true);
    });

    //Triggers when npc stops speaking
    convaiClient.current.onAudioStop(() => {
      setAudioPlay(false);
    });
  }, []);

  useEffect(() => {
    if (!audioPlay) {
      setIsTalking(false);
    }
  }, [audioPlay]);

  function handleKeyPress(event) {
    //To check whether the user is not inside the the input area
    if (
      document.activeElement.tagName === "INPUT" ||
      document.activeElement.tagName === "TEXTAREA" ||
      document.activeElement.isContentEditable
    ) {
      // If the user is focused on an input field, return without activating the mic
      return;
    }
    if (convaiClient.current && event.keyCode === 84 && !keyPressed) {
      setKeyPressed(true);
      finalizedUserText.current = "";
      npcTextRef.current = "";
      setUserText("");
      setNpcText("");
      convaiClient.current.startAudioChunk();
    }
  }

  function handleKeyRelease(event) {
    if (
      document.activeElement.tagName === "INPUT" ||
      document.activeElement.tagName === "TEXTAREA" ||
      document.activeElement.isContentEditable
    ) {
      // If the user is focused on an input field, return without activating the mic
      return;
    }
    if (convaiClient.current && event.keyCode === 84 && keyPressed) {
      setKeyPressed(false);
      convaiClient.current.endAudioChunk();
    }
  }

  //Sends user's message to the convai client
  function sendText() {
    if (convaiClient.current) {
      finalizedUserText.current = "";
      npcTextRef.current = "";
      setNpcText("");
      convaiClient.current.sendTextChunk(userText);
      setEnter(0);
    }
  }

  //Handles textBox messages
  useEffect(() => {
    if (
      document.activeElement.tagName === "INPUT" ||
      document.activeElement.tagName === "TEXTAREA" ||
      document.activeElement.isContentEditable
    ) {
      if (userText !== "" && enter) {
        sendText();
      }
    }
  }, [enter]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("keyup", handleKeyRelease);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("keyup", handleKeyRelease);
    };
  }, [keyPressed]);

  const client = {
    convaiClient,
    npcText,
    userText,
    keyPressed,
    characterId,
    setEnter,
    setUserText,
    setNpcText,
    npcName,
    userName,
    gender,
    avatar,
    isTalking,
    userEndOfResponse,
  };

  return { client };
}

const ChatBubble = (props) => {
  const { chatHistory, chatUiVariant, client } = props;
  const [isHovered, setIsHovered] = useState(false);
  const [history, setHistory] = useState(1);
  const [session, setSession] = useState("-1");
  const [messages, setMessages] = useState([]);

  //Toggle History panel
  const showHistory = () => {
    setHistory(!history);
  };

  //Takes User text from the textBox
  const userInput = (text) => {
    client?.setUserText(text);
  };

  //Reset Session
  const ResetHistory = () => {
    const storedData = localStorage.getItem("messages");
    if (storedData) {
      // Parse the retrieved data from JSON format
      const parsedData = JSON.parse(storedData);
      // Update the messages for the current character ID in the stored data
      parsedData[client?.characterId] = {
        sessionID: -1,
        message: [""],
      };
      // Update the stored data in localStorage
      localStorage.setItem("messages", JSON.stringify(parsedData));
    }
    if (client?.convaiClient?.current) {
      client?.convaiClient.current.resetSession();
    }
    setSession("-1");
    setMessages([]);
    client?.setUserText("");
    client?.setNpcText("");
  };

  //Retrieve Latest chat history of a particular character
  useEffect(() => {
    // Retrieve stored data from localStorage
    const storedData = localStorage.getItem("messages");

    if (client?.characterId) {
      if (storedData) {
        // Parse the retrieved data from JSON format
        const parsedData = JSON.parse(storedData);

        const characterIDs = Object.keys(parsedData);

        // Check if character ID matches the stored character ID
        if (characterIDs.includes(client?.characterId)) {
          // Retrieve the sessionID for the current character ID
          const parsedSessionID = parsedData[client?.characterId].sessionID;
          if (parsedSessionID) {
            // Update the sessionID state
            setSession(parsedSessionID);
          }

          // Retrieve the messages for the current character ID
          const parsedMessage = parsedData[client?.characterId].message;
          if (parsedMessage) {
            const storedMessages = JSON.parse(parsedMessage);

            // Update the messages state
            setMessages(storedMessages);
          }
        } else {
          // No stored messages for the current character ID
          setMessages([]);
        }
      } else {
        // No stored data
        setSession("-1");
        setMessages([]);
      }
    }
  }, [client?.characterId]);

  //Store latest User and Npc Messages into the chat history
  useEffect(() => {
    //Used to set the session Id on the 1st interaction
    if (
      client?.convaiClient?.current &&
      session === "-1" &&
      client?.convaiClient?.current?.sessionId
    ) {
      setSession(client.convaiClient.current.sessionId);
    }
    if (client?.characterId && messages.length) {
      const messagesJSON = JSON.stringify(messages);
      const storedData = localStorage.getItem("messages");

      if (storedData) {
        // Parse the retrieved data from JSON format
        const parsedData = JSON.parse(storedData);

        // Update the messages for the current character ID in the stored data
        parsedData[client.characterId] = {
          sessionID: session,
          message: messagesJSON,
        };
        // Update the stored data in localStorage
        localStorage.setItem("messages", JSON.stringify(parsedData));
      } else {
        // No stored data, create a new entry for the current character ID
        const messagesData = {
          [client.characterId]: {
            sessionID: session,
            message: messagesJSON,
          },
        };
        localStorage.setItem("messages", JSON.stringify(messagesData));
      }
    }
  }, [client.characterId, messages, session]);

  // Stores User message
  useEffect(() => {
    const newMessage = {
      sender: "user",
      content: client.userText,
    };

    if (client.userText !== "" && client.userEndOfResponse)
      setMessages((prevMessages) => [...prevMessages, newMessage]);
  }, [client?.userText, client.userEndOfResponse]);

  // Stores Npc's message
  useEffect(() => {
    const newMessage = {
      sender: "npc",
      content: client.npcText,
    };
    if (client.npcText !== "" && !client.isTalking)
      setMessages((prevMessages) => [...prevMessages, newMessage]);
  }, [client?.npcText, client.isTalking]);

  const chat = new Map([
    ["Toggle History Chat", 1],
    ["Unified Compact Chat", 2],
    ["Sequential Line Chat", 3],
    ["Expanded Side Chat", 4],
  ]);

  return (
    <section className="ChatBubble">
      <div style={{ display: "flex" }}>
        <div
          style={{
            backgroundColor: isHovered
              ? "rgba(0, 0, 0, 1)"
              : "rgba(0, 0, 0, 0.7)",
            borderRadius: "10px",
            width: "8vw",
            height: "2.5vw",
            color: "white",
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
            marginBottom: "10px",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={ResetHistory}
        >
          <div
            style={{
              alignSelf: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <img src={reset} height="20vw" width="20vw" alt=""></img>
          </div>
          <div
            style={{
              alignSelf: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginLeft: "7px",
              fontWeight: "bold",
            }}
          >
            <p style={{ fontSize: "0.78vw" }}>Reset Session</p>
          </div>
        </div>
      </div>
      {chatHistory === "Show" &&
        (chat.get(chatUiVariant) === 3 || chat.get(chatUiVariant) === 1) && (
          <ChatHistory
            history={history}
            messages={messages}
            showHistory={showHistory}
            npcName={client.npcName ? client.npcName : "Npc"}
            userName={client.userName ? client.userName : "User"}
          ></ChatHistory>
        )}
      {chat.get(chatUiVariant) === 1 ? (
        <ChatBubblev1
          npcText={client.npcText}
          userText={client.userText}
          messages={messages}
          keyPressed={client.keyPressed}
        ></ChatBubblev1>
      ) : chat.get(chatUiVariant) === 2 ? (
        <ChatBubblev2
          chatHistory={chatHistory}
          npcText={client.npcText}
          userText={client.userText}
          messages={messages}
          userInput={userInput}
          keyPressed={client.keyPressed}
          setEnter={client.setEnter}
          npcName={client.npcName ? client.npcName : "Npc"}
          userName={client.userName ? client.userName : "User"}
        ></ChatBubblev2>
      ) : chat.get(chatUiVariant) === 3 ? (
        <ChatBubblev3
          npcText={client.npcText}
          userText={client.userText}
          messages={messages}
          keyPressed={client.keyPressed}
          npcName={client.npcName ? client.npcName : "Npc"}
          userName={client.userName ? client.userName : "User"}
        ></ChatBubblev3>
      ) : (
        <ChatBubblev4
          chatHistory={chatHistory}
          npcText={client.npcText}
          userText={client.userText}
          messages={messages}
          keyPressed={client.keyPressed}
          userInput={userInput}
          setEnter={client.setEnter}
          npcName={client.npcName ? client.npcName : "Npc"}
          userName={client.userName ? client.userName : "User"}
        ></ChatBubblev4>
      )}
    </section>
  );
};

export default ChatBubble;
