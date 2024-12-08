import lists from "@/utils/lists";
import { getItemsService } from "@/utils/services";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const MODULE_JOBDETAIL = "MODULE_JOBDETAIL";
const initalState = {
  jobDetail: {},
  loading: false,
  selectedTab: "About",
  applicationForms: [],
};

export const handleGetJobDetail = createAsyncThunk(
  `${MODULE_JOBDETAIL}/handleGetJobDetail`,
  async ({ Id }, { rejectWithValue }) => {
    try {
      // Call API
      const job = await getItemsService(lists.Jobs, {
        filter: `Id eq ${Id}`,
        expand: `Recruiter,WorkingModel,JobType,Experience,JobTitle,JobApplications($expand=User($expand=JobTitle))`,
      }).then((res) => res.value[0]);
      return job;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const jobDetailSlice = createSlice({
  name: MODULE_JOBDETAIL,
  initialState: initalState,
  reducers: {
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleGetJobDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleGetJobDetail.fulfilled, (state, action) => {
        state.jobDetail = action.payload;
        state.applicationForms = action.payload?.JobApplications;
        state.loading = false;
      })
      .addCase(handleGetJobDetail.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setSelectedTab } = jobDetailSlice.actions;
export const jobDetailReducer = jobDetailSlice.reducer;
