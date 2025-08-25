import React, { useState, useEffect, useRef } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardFooter,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import "../components/cssFiles/Chatbot.css";
import { chatbotAPI } from "../api/chatbot.api";

function getSessionId() {
  let s = localStorage.getItem("chat_session_id");
  if (!s) {
    s = `session_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    localStorage.setItem("chat_session_id", s);
  }
  return s;
}

const Chatbot = ({ user }) => {
  const [messages, setMessages] = useState([

    { sender: "bot", text: "Hello — ask me anything about crops or the system." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const sessionId = useRef(getSessionId());

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const appendMessage = (sender, text) => {
    setMessages((prev) => [...prev, { sender, text }]);
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    appendMessage("user", trimmed); // show user message
    setInput("");
    setLoading(true);

    try {
      const response = await chatbotAPI({ message: trimmed, session_id: sessionId.current });

      if (response && response.reply) {
        appendMessage("bot", response.reply);
      } else {
        appendMessage("bot", "Sorry, I didn't get that. Please try again.");
      }
    } catch (error) {
      appendMessage("bot", "Error communicating with chatbot.");
    } finally {
      setLoading(false);
    }
  };


  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* <DashboardHeader user={user} /> */}
      <div className="container p-3" style={{ marginTop: "3.5rem" }}>

        <MDBContainer fluid className="py-5" style={{ backgroundColor: "#eee" }}>
          <MDBRow className="d-flex justify-content-center">
            <MDBCol md="10" lg="8" xl="6">
              <MDBCard id="chat2" style={{ borderRadius: "15px" }}>
                <MDBCardHeader className="d-flex justify-content-between align-items-center p-3">
                  <h5 className="mb-0">Chat</h5>
                  <MDBBtn color="primary" size="sm" rippleColor="dark">
                    Let's Chat App
                  </MDBBtn>
                </MDBCardHeader>

                {/* Messages area */}
                <div
                  ref={scrollRef}
                  style={{
                    position: "relative",
                    height: "400px",
                    overflowY: "auto",
                    paddingRight: "10px",
                  }}
                >
                  <MDBCardBody>
                    {messages.map((m, i) =>
                      m.sender === "user" ? (
                        <div key={i} className="d-flex flex-row justify-content-end mb-4">
                          <div>
                            <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                              {m.text}
                            </p>
                            <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                              {/* optional timestamp */}
                            </p>
                          </div>
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                            alt="avatar user"
                            style={{ width: "45px", height: "100%" }}
                          />
                        </div>
                      ) : (
                        <div key={i} className="d-flex flex-row justify-content-start mb-4">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                            alt="avatar bot"
                            style={{ width: "45px", height: "100%" }}
                          />
                          <div>
                            <p className="small p-2 ms-3 mb-1 rounded-3" style={{ backgroundColor: "#f5f6f7" }}>
                              {m.text}
                            </p>
                            <p className="small ms-3 mb-3 rounded-3 text-muted">
                              {/* optional timestamp */}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                    {loading && (
                      <div className="d-flex flex-row justify-content-start mb-4">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                          alt="avatar bot"
                          style={{ width: "45px", height: "100%" }}
                        />
                        <div>
                          <p className="small p-2 ms-3 mb-1 rounded-3" style={{ backgroundColor: "#f5f6f7" }}>
                            ...thinking
                          </p>
                        </div>
                      </div>
                    )}
                  </MDBCardBody>
                </div>

                {/* Footer with input + send button */}
                <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                    alt="avatar 3"
                    style={{ width: "45px", height: "100%" }}
                  />
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    rows={1}
                    className="form-control form-control-lg"
                    id="chatInput"
                    placeholder="Type message"
                    style={{ resize: "none", marginLeft: "8px" }}
                  />
                  <a className="ms-1 text-muted" href="#!" onClick={(e) => e.preventDefault()}>
                    <MDBIcon fas icon="paperclip" />
                  </a>
                  <a className="ms-3 text-muted" href="#!" onClick={(e) => e.preventDefault()}>
                    <MDBIcon fas icon="smile" />
                  </a>

                  <MDBBtn
                    color="success"
                    size="sm"
                    className="ms-3 d-flex align-items-center"
                    onClick={handleSend}
                    disabled={loading || input.trim() === ""}
                  >
                    <MDBIcon fas icon="paper-plane" className="me-2" />
                    {loading ? "Sending..." : "Send"}
                  </MDBBtn>
                </MDBCardFooter>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        </div>
        {/* <Footer /> */}
      </>
      );
}

      export default Chatbot;
