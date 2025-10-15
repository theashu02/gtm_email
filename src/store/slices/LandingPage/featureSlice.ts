import { createSlice } from "@reduxjs/toolkit";
import first from "../../../assets//productinfo/1.png";

const featureSlice = createSlice({
  name: "feature",
  initialState: {
    openId: 1,
    selectedImage: first,
  },
  reducers: {
    toggleFeature: (state, action) => {
      const { id, image } = action.payload;
      state.openId = state.openId === id ? null : id;
      state.selectedImage = image;
    },
  },
});

export const { toggleFeature } = featureSlice.actions;
export default featureSlice.reducer;