import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const getInitialPastes = () => {
  try {
    const storedPastes = localStorage.getItem("pastes");
    return storedPastes ? JSON.parse(storedPastes) : [];
  } catch (error) {
    console.error("Error parsing pastes from localStorage:", error);
    localStorage.removeItem("pastes"); // Clear invalid data
    return [];
  }
};

const initialState = {
  pastes: getInitialPastes(),
};

const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      if (!paste || !paste._id) {
        toast.error("Invalid Note data");
        return;
      }

      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if (index >= 0) {
        toast.error("Note already exists");
        return;
      }

      state.pastes.push(paste);

      try {
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Note added");
      } catch (error) {
        console.error("Error saving to localStorage:", error);
        toast.error("Failed to save Note");
      }
    },

    updatePastes: (state, action) => {
      const paste = action.payload;
      if (!paste || !paste._id) {
        toast.error("Invalid Note data");
        return;
      }

      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if (index >= 0) {
        state.pastes[index] = paste;
        try {
          localStorage.setItem("pastes", JSON.stringify(state.pastes));
          toast.success("Note updated");
        } catch (error) {
          console.error("Error saving to localStorage:", error);
          toast.error("Failed to update Note");
        }
      }
    },

    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      if (!pasteId) {
        toast.error("Invalid Note ID");
        return;
      }

      const index = state.pastes.findIndex((item) => item._id === pasteId);

      if (index >= 0) {
        state.pastes.splice(index, 1);
        try {
          localStorage.setItem("pastes", JSON.stringify(state.pastes));
          toast.success("Note deleted");
        } catch (error) {
          console.error("Error saving to localStorage:", error);
          toast.error("Failed to delete Note");
        }
      }
    },

    resetPaste: (state) => {
      state.pastes = [];
      try {
        localStorage.removeItem("pastes");
      } catch (error) {
        console.error("Error clearing localStorage:", error);
      }
    },
  },
});

export const { addToPastes, removeFromPastes, updatePastes, resetPaste } =
  pasteSlice.actions;

export default pasteSlice.reducer;
