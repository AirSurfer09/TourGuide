import { ConvaiClient } from 'convai-web-sdk';
import { useEffect, useRef, useState } from 'react';
import { useZustStore } from './useStore';
import 'regenerator-runtime/runtime';
import SpeechRecognition from 'react-speech-recognition';
export const useConvaiClient = ({ _apiKey, _characterId }) => {
  const [isProximity, setIsProximity] = useState(false);
  const [talking, setTalking] = useState(false);
  const [keyPressed, setKeyPressed] = useState(false);
  const [userText, setUserText] = useState('');
  const [npcText, setNpcText] = useState('');
  const [actionText, setActionText] = useState('');
  const [currentCharId, setCurrentCharId] = useState('');
  const [enter, setEnter] = useState(0);
  const convaiClient = useRef(null);
  const finalizedUserText = useRef();
  const npcTextRef = useRef();
  const [textChunk, setTextChunk] = useState('');
  const [present, updatePresent, updateActionState] = useZustStore((state) => [
    state.present,
    state.actions.updatePresent,
    state.actions.updateActionState,
  ]);
  useEffect(() => {
    if (isProximity) {
      convaiClient.current = new ConvaiClient({
        apiKey: _apiKey,
        characterId: _characterId,
        enableAudio: true,
      });
      setCurrentCharId(_characterId);
      convaiClient.current.setResponseCallback((response) => {
        if (response.hasUserQuery()) {
          let transcript = response.getUserQuery();
          let isFinal = transcript.getIsFinal();
          if (isFinal) {
            finalizedUserText.current += ' ' + transcript.getTextData();
            transcript = '';
          }
          if (transcript) {
            setUserText(finalizedUserText.current + transcript.getTextData());
          } else {
            setUserText(finalizedUserText.current);
          }
        }
        if (response.hasAudioResponse()) {
          let audioResponse = response?.getAudioResponse();
          npcTextRef.current += ' ' + audioResponse.getTextData();
          setTextChunk(audioResponse.getTextData());
          setNpcText(npcTextRef.current);
          // console.log(phonemes);
        }
        if (response.hasActionResponse()) {
          let actionResponse = response.getActionResponse();
          let parsedActions = actionResponse.getAction().trim().split('\n');
          setActionText(parsedActions[0].split(', '));
          if (parsedActions[0].split(', ') === 'walk') {
            // console.log(present);
            updatePresent(1);
            updateActionState.Maya('walking');
          }
        }
      });

      convaiClient.current.onAudioPlay(() => {
        setTalking(true);
      });

      convaiClient.current.onAudioStop(() => {
        setTalking(false);
      });
    }
  }, [isProximity]);

  const userInput = (text) => {
    setUserText(text);
  };

  const handleTPress = (e) => {
    if (e.keyCode === 84 && !keyPressed) {
      e.stopPropagation();
      e.preventDefault();
      setKeyPressed(true);
      finalizedUserText.current = '';
      npcTextRef.current = '';
      setUserText('');
      setNpcText('');
      convaiClient.current.startAudioChunk();
    }
  };
  const handleTRelease = (e) => {
    if (e.keyCode === 84 && keyPressed) {
      e.preventDefault();
      setKeyPressed(false);
      convaiClient.current.endAudioChunk();
    }
  };

  const sentText = () => {
    finalizedUserText.current = '';
    npcTextRef.current = '';
    setNpcText('');
    convaiClient.current.sendTextChunk(userText);
    setEnter(0);
  };

  useEffect(() => {
    if (talking && !isProximity) {
      convaiClient.current.endAudioChunk();
      console.log('stopped talking out of range');
    }
    if (isProximity) {
      console.log('The Guide is in range');
    } else {
      console.log('The Guide is out of range');
    }
  }, [isProximity]);
  return {
    convaiClient,
    setUserText,
    setNpcText,
    isProximity,
    setIsProximity,
    talking,
    userText,
    npcText,
    keyPressed,
    handleTPress,
    handleTRelease,
    userInput,
    setEnter,
    currentCharId,
    npcTextRef,
    textChunk,
  };
};
