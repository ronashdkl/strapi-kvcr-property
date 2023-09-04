import { createSlice } from '@reduxjs/toolkit'

export const propertySlice = createSlice({
  name: 'kvcr-property_property',
  initialState: {
    isLoading:false,
    propertyAmenities: [],
    amenities:[]
  },
  reducers: {
    setLoading:(state, action)=>{
        state.isLoading = action?.payload ??true;
    },
    setPropertyAmenities: (state, action) => {
      state.propertyAmenities = action.payload
      state.isLoading = false;
    },
    setAmenities: (state, action) => {
        state.amenities = action.payload;
        state.isLoading = false;
    },
    setAllData:(state, action)=>{
        state.propertyAmenities = action.payload.propertyAmenities
        state.amenities = action.payload.amenities;
        state.isLoading = false;
    },
    clearPropertyAmenities:state=>{
      state.propertyAmenities = []
    }
  }
})

// Action creators are generated for each case reducer function
export const { setPropertyAmenities,setAmenities,setLoading,setAllData,clearPropertyAmenities } = propertySlice.actions

export default propertySlice.reducer