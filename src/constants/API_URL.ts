import { Platform } from "react-native";

export const API_URL = Platform.OS === "android"
    ? "http://{IP}:8081" // Android fisico
    : "http://localhost:8081";   // Web