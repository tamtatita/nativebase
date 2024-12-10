import { CRITERIATYPES } from "@/constants";
import lists from "@/utils/lists";
import { getItemsService } from "@/utils/services";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isGetCriteria: false,
  workingModels: [],
  experiences: [],
  jobTitles: [],
  jobTypes: [],
  salaryRange: [],
  searchText: "",
  selectedWorkingModel: {},
  selectedExperience: {},
  selectedJobTitles: [],
  selectedJobType: {},
  applySalaryRange: [],
  applyWorkingModel: {},
  applyExperience: {},
  applyJobTitles: [],
  applyJobType: {},

  filterJobs: [],
};

export const MODULE_SEARCH = "MODULE_SEARCH";
export const handleGetCriteriaAsyncThunk = createAsyncThunk(
  `${MODULE_SEARCH}/getCriteria`,
  async (_, { getState, rejectWithValue }) => {
    try {
      const { isGetCriteria, workingModels, experiences, jobTitles, jobTypes } =
        getState()[MODULE_SEARCH];
      if (isGetCriteria)
        return {
          workingModels,
          experiences,
          jobTitles,
          jobTypes,
        };
      const criteriasResp = await getItemsService(lists.Criterias).then(
        (res) => res.value
      );
      return {
        workingModels: criteriasResp?.filter(
          (item) => item.CriteriaType === CRITERIATYPES.WORKINGMODEL
        ),
        experiences: criteriasResp?.filter(
          (item) => item.CriteriaType === CRITERIATYPES.EXPERIENCE
        ),
        jobTitles: criteriasResp?.filter(
          (item) => item.CriteriaType === CRITERIATYPES.JOBTITLE
        ),
        jobTypes: criteriasResp?.filter(
          (item) => item.CriteriaType === CRITERIATYPES.JOBTYPE
        ),
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const handleFilter = createAsyncThunk(
  `${MODULE_SEARCH}/filter`,
  async ({ userId }, { getState, rejectWithValue }) => {
    try {
      const {
        searchText,
        salaryRange,
        selectedWorkingModel,
        selectedExperience,
        selectedJobType,
        selectedJobTitles,
      } = getState()[MODULE_SEARCH];
      const conditions = [];
      if (searchText) {
        conditions.push(
          `(contains(Recruiter/CompanyAddress, '${searchText}') or contains(Recruiter/FullName, '${searchText}') or contains(Title, '${searchText}') )`
        );
      }
      if (selectedWorkingModel?.Id) {
        conditions.push(`(WorkingModelId eq ${selectedWorkingModel.Id})`);
      }
      if (selectedExperience?.Id) {
        conditions.push(`(ExperienceId eq ${selectedExperience.Id})`);
      }
      if (selectedJobType?.Id) {
        conditions.push(`(JobTypeId eq ${selectedJobType.Id})`);
      }
      if (selectedJobTitles.length) {
        const jobTitles = selectedJobTitles.map((item) => item.Id).join(",");
        conditions.push(`(JobTitleId in (${jobTitles}))`);
      }
      if (salaryRange[0]) {
        conditions.push(`(MinSalary ge ${salaryRange[0]})`);
      }
      if (salaryRange[1]) {
        conditions.push(`(MaxSalary le ${salaryRange[1]})`);
      }

      const filter = conditions.join(" and ");
      if (!filter) {
        return {
          jobs: [],
          salaryRange,
          selectedWorkingModel,
          selectedExperience,
          selectedJobType,
          selectedJobTitles,
        };
      }
      const jobs = await getItemsService(lists.Jobs, {
        filter,
        expand: `WorkingModel,JobType,Experience,JobTitle,Recruiter,Bookmarks($filter=UserId eq ${userId}),JobApplications($count=true)`,
      }).then((res) => res.value);

      console.log("jobs", jobs);
      return {
        jobs,
        salaryRange,
        selectedWorkingModel,
        selectedExperience,
        selectedJobType,
        selectedJobTitles,
      };
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  }
);

export const searchSlice = createSlice({
  name: MODULE_SEARCH,
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setMinRange: (state, action) => {
      state.salaryRange[0] = action.payload;
    },
    setMaxRange: (state, action) => {
      state.salaryRange[1] = action.payload;
    },
    sortSalaryRange: (state) => {
      if (state.salaryRange[0] && state.salaryRange[1]) {
        state.salaryRange = state.salaryRange.sort((a, b) => a - b);
      }
    },
    setSelectedWorkingModel: (state, action) => {
      state.selectedWorkingModel = action.payload;
    },
    setSelectedExperience: (state, action) => {
      state.selectedExperience = action.payload;
    },
    setSelectedJobType: (state, action) => {
      state.selectedJobType = action.payload;
    },
    addJobTitle: (state, action) => {
      state.selectedJobTitles.push(action.payload);
    },
    removeJobTitle: (state, action) => {
      state.selectedJobTitles = state.selectedJobTitles.filter(
        (item) => item.Id !== action.payload.Id
      );
    },
    resetFilter: (state) => {
      state.salaryRange = [];
      state.selectedWorkingModel = {};
      state.selectedExperience = {};
      state.selectedJobType = {};
      state.selectedJobTitles = [];
    },
    setApplyToSelected: (state) => {
      state.salaryRange = state.applySalaryRange;
      state.selectedWorkingModel = state.applyWorkingModel;
      state.selectedExperience = state.applyExperience;
      state.selectedJobType = state.applyJobType;
      state.selectedJobTitles = state.applyJobTitles;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleGetCriteriaAsyncThunk.fulfilled, (state, action) => {
      state.isGetCriteria = true;
      state.workingModels = action.payload.workingModels;
      state.experiences = action.payload.experiences;
      state.jobTitles = action.payload.jobTitles;
      state.jobTypes = action.payload.jobTypes;
    });
    builder.addCase(handleFilter.fulfilled, (state, action) => {
      state.filterJobs = action.payload.jobs;
      state.applySalaryRange = action.payload.salaryRange;
      state.applyWorkingModel = state.selectedWorkingModel;
      state.applyExperience = state.selectedExperience;
      state.applyJobTitles = state.selectedJobTitles;
      state.applyJobType = state.selectedJobType;
    });
  },
});

export const {
  setSearchText,
  setMinRange,
  setMaxRange,
  sortSalaryRange,
  setSelectedExperience,
  setSelectedJobType,
  setSelectedWorkingModel,
  addJobTitle,
  removeJobTitle,
  resetFilter,
  setApplyToSelected,
} = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
