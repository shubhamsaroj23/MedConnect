import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PhoneIcon from "@mui/icons-material/Phone";
import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";

import "./video.css";
const socket = io.connect("http://192.168.0.103:5000");

const Video = () => {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const [saudio, setSaudio] = useState(false);
  const [svideo, setSvideo] = useState(false)
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });

    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
    socket.on("callEnded", () => {
      console.log("received call ended");
      setCallEnded(true);
      connectionRef.current.destroy();
      window.location.reload(true);
    });
    
    setName("Patient");
  }, []);



  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });
  }, [saudio, svideo])

  // let intervalId = setInterval(async () => {
  //   try {
  //     const response = await fetch(
  //       `http://127.0.0.1:8000/api/consultation/room/?consultation_id=2`
  //     );
  //     if (response.status === 200) {
  //       const data = await response.json()
  //       setIdToCall(data["room_id"]);
  //       console.log(data["room_id"])
  //       clearInterval(intervalId);
  //     }
  //     console.log("running");
  //   } catch (error) {
  //     // Handle error if needed
  //   }
  // }, 5000);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
    

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const muteCall = () => {
    console.log(stream)
    setSaudio(!saudio);
    console.log("muted")
    stream.getAudioTracks()[0].enabled = saudio;
  }

  const stopVideo = () => {
    console.log(stream);
    setSvideo(!svideo)
    console.log("stoped");
    stream.getVideoTracks()[0].enabled = svideo;
  }
  const leaveCall = () => {
    setCallEnded(true);
    socket.emit("disconnectCall");
    connectionRef.current.destroy();
    window.location.reload(true);
  };

  return (
    <>
      <h1 style={{ textAlign: "center", color: "#fff" }}>
        MedConnect - Patient
      </h1>
      <div className="container">
        <div className="video-container">
          <div className="video">
            {callAccepted && !callEnded ? (
              <video
                playsInline
                ref={userVideo}
                autoPlay
                className="videoElementOut"
              />
            ) : null}
          </div>
          <div className="video">
            {stream && (
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                className="videoElementIn"
              />
            )}
          </div>
        </div>
        <div className="myId">
          <p>Your Id: {me}</p>
          <TextField
            id="filled-basic"
            label="ID to call"
            variant="filled"
            value={idToCall}
            onChange={(e) => setIdToCall(e.target.value)}
          />
          <div className="call-button">
            {callAccepted && !callEnded ? (
              <>
                <Button onClick={muteCall}>Mute</Button>
                <Button onClick={stopVideo}>Stop Video</Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={leaveCall}
                >
                  End Call
                </Button>
              </>
            ) : (
              <IconButton
                color="primary"
                aria-label="call"
                onClick={() => callUser(idToCall)}
              >
                <PhoneIcon fontSize="large" />
              </IconButton>
            )}
            {idToCall}
          </div>
        </div>
        <div>
          {receivingCall && !callAccepted ? (
            <div className="caller">
              <h1>{name} is calling...</h1>
              <Button variant="contained" color="primary" onClick={answerCall}>
                Answer
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Video;
