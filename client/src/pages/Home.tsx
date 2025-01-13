import React, { useState } from "react";
import { Box, Grid, Paper, TextField, Typography, IconButton, Divider } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import { fetchAuth } from "../utils/globals";
import Layout from "./Layout";

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim()) {
      // Add user's message
      setMessages((prevMessages) => [...prevMessages, { sender: "user", text: input }]);

      // Get bot messages
      fetchAuth("chat/", {
        method: "POST",
        body: JSON.stringify({ question: input, context: JSON.stringify(messages) }),
      })
        .then((res) => res.json())
        .then((content) => {
          console.log(content);
          setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: content }]);
        });

      setInput("");
    }
  };

  return (
    <Layout>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100vh", backgroundColor: "#f5f5f5", padding: 2 }}
      >
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "80vh",
              padding: 2,
              boxShadow: 3,
              borderRadius: 2,
              backgroundColor: "#fff",
            }}
          >
            {/* Chat Header */}
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                marginBottom: 2,
                fontWeight: "bold",
                color: "#1976d2",
              }}
            >
              Chatbot Interaction
            </Typography>

            {/* Chat Area */}
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                padding: 2,
                backgroundColor: "#f9f9f9",
                borderRadius: 1,
                boxShadow: "inset 0 0 5px rgba(0,0,0,0.1)",
              }}
            >
              {messages.map((message, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: message.sender === "bot" ? "flex-start" : "flex-end",
                    marginBottom: 2,
                  }}
                >
                  <Paper
                    sx={{
                      padding: 1.5,
                      borderRadius: 2,
                      maxWidth: "70%",
                      backgroundColor: message.sender === "bot" ? "#e0e0e0" : "#1976d2",
                      color: message.sender === "bot" ? "#000" : "#fff",
                    }}
                  >
                    <Typography variant="body1">{message.text}</Typography>
                  </Paper>
                </Box>
              ))}
            </Box>

            {/* Divider */}
            <Divider sx={{ marginY: 2 }} />

            {/* Input Area */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
                sx={{ marginRight: 1 }}
              />
              <IconButton color="primary" onClick={handleSendMessage} disabled={!input.trim()}>
                <SendIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ChatbotPage;
