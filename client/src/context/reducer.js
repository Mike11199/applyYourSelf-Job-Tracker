import { 
    DISPLAY_ALERT, 
    CLEAR_ALERT, 
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    HANDLE_CHANGE,
    CLEAR_VALUES,
    CREATE_JOB_BEGIN,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_ERROR,
    GET_JOBS_BEGIN,
    GET_JOBS_SUCCESS,
    SET_EDIT_JOB,
    DELETE_JOB_BEGIN,
    EDIT_JOB_BEGIN,
    EDIT_JOB_SUCCESS,
    EDIT_JOB_ERROR,
    SHOW_STATS_BEGIN,
    SHOW_STATS_SUCCESS,
    CLEAR_FILTERS,
    CHANGE_PAGE,
    CHANGE_JOBS_VIEW,
    HANDLE_CHANGE_ARRAY,
    REFRESH_STATE,
    TOGGLE_DARK_MODE
} from "./actions"

import { initialState } from "./appContext"

const reducer = (state, action) => {    //hook that takes current state as first argument, and action object as second, returning a new state afterwards
    if(action.type === DISPLAY_ALERT){
        return {
            ...state,              //the ... is the spread operator used to return the existing state array and also add/change onto it the values below
            showAlert:true,
            alertType:'danger',
    alertText:'Please provide all values!'
                }
    }
    
    if(action.type === CLEAR_ALERT){
        return {
            ...state,       
            showAlert:false,
            alertType:'',
            alertText:'',
        }
    }
    if(action.type === REGISTER_USER_BEGIN){    
        return { ...state, isLoading: true}         //... unpacks the value of the current state
    }
    if(action.type === REGISTER_USER_SUCCESS){
        return { 
                    ...state,
                    isLoading: false,
                    token:action.payload.token,
                    user:action.payload.user,
                    userLocation:action.payload.location,
                    jobLocation:action.payload.location,
                    showAlert:true,
                    alertType:'success',
                    alertText: 'User Created! Redirecting...',
                }
    }
    if(action.type === REGISTER_USER_ERROR){
        return { 
                    ...state,
                    isLoading: false,
                    showAlert:true,
                    alertType:'danger',
                    alertText: action.payload.msg,
                }
    }
    if(action.type === LOGIN_USER_BEGIN){    
        return { ...state, isLoading: true}         //... unpacks the value of the current state
    }
    if(action.type === LOGIN_USER_SUCCESS){
        return { 
                    ...state,
                    isLoading: false,
                    token:action.payload.token,
                    user:action.payload.user,
                    userLocation:action.payload.location,
                    jobLocation:action.payload.location,
                    showAlert:true,
                    alertType:'success',
                    alertText: 'Login Successful! Redirecting...',
                }
    }
    if(action.type === LOGIN_USER_ERROR){
        return { 
                    ...state,
                    isLoading: false,
                    showAlert:true,
                    alertType:'danger',
                    alertText: action.payload.msg,
                }
    }
    if(action.type === TOGGLE_SIDEBAR){
        return { 
                    ...state,
                    showSidebar: !state.showSidebar,
                }
   
            }


    if(action.type === LOGOUT_USER){
        return { 
                    ...initialState,
                    user: null,
                    token: null,
                    jobLocation: '',
                    userLocation: '',
                }
    
            }
    if(action.type === UPDATE_USER_BEGIN){    
        return { ...state, isLoading: true}         //... unpacks the value of the current state
    }
    if(action.type === UPDATE_USER_SUCCESS){
        return { 
                    ...state,
                    isLoading: false,
                    token:action.payload.token,
                    user:action.payload.user,
                    userLocation:action.payload.location,
                    jobLocation:action.payload.location,
                    showAlert: true,
                    alertType:'success',
                    alertText: 'User Profile Updated!',
                }
    }
    if(action.type === UPDATE_USER_ERROR){
        return { 
                    ...state,
                    isLoading: false,
                    showAlert:true,
                    alertType:'danger',
                    alertText: action.payload.msg,
                }
    }
    if(action.type === HANDLE_CHANGE){
        return { 
                    ...state,
                    page: 1,
                    [action.payload.name]: action.payload.value
                }
    }
    if(action.type === HANDLE_CHANGE_ARRAY){


        return { 
                    ...state,
                    page: 1,
                    jobHistory: action.payload.value,
                }
    }
    if(action.type === CLEAR_VALUES){

    const initialState = {
        isEditing: false,
        editJobId: '',
        position: '',
        company: '',
        jobLocation: state.userLocation,
        jobType: 'full-time',
        status:'pending',
        status_no_underscore:'pending',
        jobHistory: [],
    }

        return { 
                    ...state,
                    ...initialState,                   
                }
    }

    if(action.type === CREATE_JOB_BEGIN) {
        return {...state, isLoading: true}
    }
    
    if(action.type === REFRESH_STATE) {
        return {...state}
    }

    if(action.type === CREATE_JOB_SUCCESS){
        return { 
                    ...state,
                    isLoading: false,
                    showAlert: true,
                    alertType:'success',
                    alertText: 'New Job Created'
                }
    }
    
    if(action.type === CREATE_JOB_ERROR){
        return { 
                    ...state,
                    isLoading: false,
                    showAlert: true,
                    alertType:'danger',
                    alertText: action.payload.msg,
                }
    }

    if(action.type === GET_JOBS_BEGIN){    
        return { ...state, isLoading: true, showAlert: false}         
    }

    if(action.type === GET_JOBS_SUCCESS){    
        return { ...state, isLoading: false, 
            jobs: action.payload.jobs,
            totalJobs: action.payload.totalJobs,
            numOfPages: action.payload.numOfPages,
         }         
    }
    if(action.type === SET_EDIT_JOB){    
        
        const job = state.jobs.find((job) => job._id === action.payload.id)
        const { _id, position, company, jobLocation, jobType, status, jobHistory} = job
        return { 
            ...state,
            isEditing: true,
            editJobId: _id,
            position,
            company,
            jobLocation,
            jobType,
            status,
            jobHistory,
         }         
    }
    if(action.type === DELETE_JOB_BEGIN){

        return {
            ...state,
            isLoading: true
        }
    }
    if (action.type === EDIT_JOB_BEGIN) {
        return {
          ...state,
          isLoading: true,
        }
      }
      if (action.type === EDIT_JOB_SUCCESS) {
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'success',
          alertText: 'Job Updated!',
        }
      }
      if (action.type === EDIT_JOB_ERROR) {
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'danger',
          alertText: action.payload.msg,
        }
      }
      if (action.type === SHOW_STATS_BEGIN) {
        return {
          ...state,
          isLoading: true,
          showAlert: false,
        }
      }
      if (action.type === SHOW_STATS_SUCCESS) {
        return {
          ...state,
          isLoading: false,
          stats: action.payload.stats,
          monthlyApplications: action.payload.monthlyApplications,
          MasterData_Sankey_Final: action.payload.MasterData_Sankey_Final
        }
      }
      if (action.type === CLEAR_FILTERS) {
        return {
          ...state,
          search:'',
          searchStatus:'all',
          searchType:'all',
          sort:'latest',         
        }
      }
      if (action.type === CHANGE_PAGE) {
        return {
            ...state,
            page: action.payload.page,
        }
     }
       if (action.type === CHANGE_JOBS_VIEW) {
        return {
            ...state,   
            jobsCardsView: !state.jobsCardsView,         
            }
      }
      if (action.type === TOGGLE_DARK_MODE) {
        return {
            ...state,   
            darkMode: !state.darkMode,         
            }
      }



    throw new Error (`no such action : ${action.type}`)

}

export default reducer