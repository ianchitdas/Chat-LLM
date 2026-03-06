import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://10.104.135.189:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userMsg.text }),
      });

      const data = await response.json();
      const llmMsg: Message = {
        sender: "bot",
        text: data.reply || "No response.",
      };
      setMessages((prev) => [...prev, llmMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: Message = {
        sender: "bot",
        text: "⚠️ Could not reach the server.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    }

    setLoading(false);
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        ref={scrollViewRef}
        style={styles.chatBox}
        contentContainerStyle={{
          paddingVertical: 10,
          paddingHorizontal: 12,
          paddingBottom: 130, // 🧱 gives enough room for messages above the lifted input
        }}
      >
        {messages.map((msg, idx) => (
          <View
            key={idx}
            style={[
              styles.messageBubble,
              msg.sender === "user" ? styles.userMsg : styles.botMsg,
            ]}
          >
            <Text
              style={msg.sender === "user" ? styles.userText : styles.botText}
            >
              {msg.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Floating lifted input */}
      <View style={styles.inputWrapper}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            placeholderTextColor="#999"
            value={input}
            onChangeText={setInput}
            editable={!loading}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={sendMessage}
            disabled={loading}
          >
            <Ionicons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  chatBox: {
    flex: 1,
  },
  messageBubble: {
    maxWidth: "80%",
    borderRadius: 16,
    padding: 10,
    marginVertical: 6,
  },
  userMsg: {
    alignSelf: "flex-end",
    backgroundColor: "#000",
  },
  botMsg: {
    alignSelf: "flex-start",
    backgroundColor: "#f0f0f0",
  },
  userText: {
    color: "#fff",
    fontSize: 15,
  },
  botText: {
    color: "#000",
    fontSize: 15,
  },
  inputWrapper: {
    position: "absolute",
    bottom: 60, // ⬆️ lifted 50% more
    left: 0,
    right: 0,
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingVertical: 6,
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  input: {
    flex: 1,
    color: "#000",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  sendButton: {
    backgroundColor: "#000",
    borderRadius: 50,
    padding: 10,
    marginLeft: 8,
  },
});
