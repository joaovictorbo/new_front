import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Action
export const fetchTodos = createAsyncThunk("fetchTodos", async (url) => {
  if ((url)){
    const response = await fetch(url,
      { 
        method: 'GET', 
        headers: new Headers({
            'Authorization': `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik5vdGlmaWNhdGlvbiB1c2VyIn0.CqzRyO-ZpnSEJQJebvFDmfFsb-dOUSGCHTPAhLTVqGRFqmG7PyU1bgLJW7LG-n1vELaHek-beaKnunWvwo47fA`, 
            'Content-Type': 'application/x-www-form-urlencoded'
        }) 
        }
      
      );
    
    return response.json();

  }else{
    const response = await fetch("https://votacaocode.snctjp.com.br/api/turma/",
    { 
      method: 'GET', 
      headers: new Headers({
          'Authorization': `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik5vdGlmaWNhdGlvbiB1c2VyIn0.CqzRyO-ZpnSEJQJebvFDmfFsb-dOUSGCHTPAhLTVqGRFqmG7PyU1bgLJW7LG-n1vELaHek-beaKnunWvwo47fA`, 
          'Content-Type': 'application/x-www-form-urlencoded'
      }) 
      }
    );
    
    
    return response.json();

  }
});

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default todoSlice.reducer;

