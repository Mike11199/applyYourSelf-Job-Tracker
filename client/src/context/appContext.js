import React, { useReducer, useContext, useEffect } from 'react'

import reducer from './reducer'
import axios from 'axios'

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
  HANDLE_CHANGE_ARRAY,
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
  REFRESH_STATE,
  TOGGLE_DARK_MODE
} from "./actions"
import { get } from 'mongoose'
import { IoCompassSharp } from 'react-icons/io5'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user:user ? JSON.parse(user) : null,         //ternary operator:  fancy single-line if/else statement
  token: token,
  userLocation: userLocation || '',
  showSidebar: true,
 
  isEditing: false,
  editJobId: '',
  position: '',
  company: '',
  jobLocation: userLocation || '',
  jobTypeOptions: ['full-time', 'part-time','remote', 'internship', 'hybrid'],
  jobType: 'full-time',
  statusOptions:['technical_interview', 'declined','pending','accepted','coding_assessment', 'phone_interview', 'behavioral_interview', 'rejected/archived'],
  status:'pending',

  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats:{},
  monthlyApplications: [],

  search:'',
  searchStatus:'all',
  searchType:'all',
  sort:'latest',
  sortOptions:['latest', 'oldest', 'a-z', 'z-a'],

  jobsCardsView: true,
  status_no_underscore:'pending',
  jobHistory: [],
  MasterData_Sankey_Final: [],
  darkMode: false,
}


const AppContext = React.createContext()

const AppProvider = ({ children }) => {
const [state, dispatch] = useReducer(reducer, initialState)   //https://reactjs.org/docs/hooks-reference.html  alternative to useState


// axios
const authFetch = axios.create({
  baseURL: '/api/v1',
})


// request interceptor
authFetch.interceptors.request.use(
  (config) => {
    config.headers.common['Authorization'] = `Bearer ${state.token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// response interceptor
authFetch.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    //console.log(error.response)
    if (error.response.status === 401) {
      logoutUser()
    }
    return Promise.reject(error)
  }
)


const displayAlert = () => {
    dispatch({type:DISPLAY_ALERT})    //arrow function that invokes func with object literal as parameters 
    clearAlert()
}

const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      })
    }, 3000)
  }


//add token and user info to local storage so user not kicked out
//curly braces inside the parameters of this arrow function is an example of object destructuring
const addUserToLocalStorage = ({user, token, location}) => {
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('token', token)
  localStorage.setItem('location', location)
}


const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  localStorage.removeItem('location')
}



const registerUser = async (currentUser) => {
  dispatch({ type: REGISTER_USER_BEGIN })
  try {
    const response = await axios.post('/api/v1/auth/register', currentUser)
    console.log(response)
    const {user,token,location} = response.data   //destructure the big response object returned from axios
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: {user, token, location},
    })

    addUserToLocalStorage({user,token,location})
  } catch (error) {
    console.log(error.response)
    dispatch({type:REGISTER_USER_ERROR, payload: {msg: error.response.data.msg },})
  }
  clearAlert()
}  

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN })
    try {
      const {data} = await axios.post('/api/v1/auth/login', currentUser)  //post request going to our backend
      
      const {user,token,location} = data   //destructure the big response object returned from axios
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: {user, token, location},
      })
  
      addUserToLocalStorage({user,token,location})  //for page refresh
    } catch (error) {
      
      dispatch({
         type:LOGIN_USER_ERROR,
         payload: {msg: error.response.data.msg },
        })
    }
    clearAlert()
  }

  const googleLogin = async (token2) => {
    

    const token_request = {token: token2}

    try {
      const {data} = await axios.post('/api/v1/auth/Google_login', token_request)  //post request going to our backend
      
      // console.log("Sent token to back end.")

      const {user,token,location} = data   //destructure the big response object returned from axios
      
      // console.log("the response from the back end")
      // console.log(data)
      
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: {user, token, location},
      })
  
      addUserToLocalStorage({user,token,location})  //for page refresh


    } catch (error) {
      
      // console.log("error")
      dispatch({
        type:LOGIN_USER_ERROR,
        payload: {msg: "Error!  Please register manually first." },
       })
    }
    clearAlert()
  }

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR})
  }

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER})
    removeUserFromLocalStorage()
  }

  const toggleDarkMode = () => {
    dispatch({ type: TOGGLE_DARK_MODE})    
  }

  const updateUser = async (currentUser) => {
    
    dispatch({ type:UPDATE_USER_BEGIN })
    
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser)
      const { user, location, token } = data

      dispatch({ 
        type:UPDATE_USER_SUCCESS, 
        payload:{user, location, token} })

      addUserToLocalStorage({user, location, token})

    } catch (error) {
      if(error.response.status !==401 ){
        
        dispatch({ 
          type:UPDATE_USER_ERROR, 
          payload:{msg: error.response.data.msg} })
      }
    }
    clearAlert()
  }

  const handleChange = ({name,value}) =>{
    dispatch({type: HANDLE_CHANGE, payload:{name,value}})
  }

  const handleChangeArray = (name,value) =>{
    // console.log(value)
    dispatch({type: HANDLE_CHANGE_ARRAY, payload:{name,value}})
  }


  const clearValues = () =>{
    dispatch({type: CLEAR_VALUES })
  }

  const refreshState = () =>{
    dispatch({type: REFRESH_STATE })
  }


const createJob = async () => {

  dispatch({ type: CREATE_JOB_BEGIN })
  try {
    const { position, company, jobLocation, jobType, status, jobHistory } = state
    await authFetch.post('/jobs', {position, company, jobLocation, jobType, status, jobHistory })
    dispatch({ type: CREATE_JOB_SUCCESS })
    dispatch({ type: CLEAR_VALUES })

  } catch (error) {    
    if(error.response.status === 401) return
    dispatch({ type: CREATE_JOB_ERROR, payload:{msg: error.response.data.msg }, })
  }
  clearAlert()
}

const getJobs = async () => {
  
  const { page, search, searchStatus, searchType, sort, jobsCardsView } = state



  let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`

  if (jobsCardsView) {
    url = url + `&limit=${15}`
  }


  if (search) {
    url = url + `&search=${search}`
  }

  dispatch({ type: GET_JOBS_BEGIN })
  
  try {
    const { data } = await authFetch(url)
    const { jobs, totalJobs, numOfPages } = data
    dispatch({ 
      type: GET_JOBS_SUCCESS, 
      payload: {
        jobs,
        totalJobs,
        numOfPages,         
      },
    }) 
  } catch (error) {
    //console.log(error.response)
    logoutUser()
  }
  clearAlert()
}


//grab the id of the job and edit all the values in the state
const setEditJob = (id) => {
  dispatch({ type: SET_EDIT_JOB, payload:{ id }, })
}

const editJob = async () => {
  dispatch({ type: EDIT_JOB_BEGIN })
  try {
    const { position, company, jobLocation, jobType, status, jobHistory } = state

    await authFetch.patch(`/jobs/${state.editJobId}`, {
      company,
      position,
      jobLocation,
      jobType,
      status,
      jobHistory,
    })
    dispatch({ type: EDIT_JOB_SUCCESS })
    dispatch({ type: CLEAR_VALUES })

  } catch (error) {
    if (error.response.status === 401) return
    
    dispatch({
      type: EDIT_JOB_ERROR,
      payload: { msg: error.response.data.msg },
    })
  }
  clearAlert()
}


const deleteJob = async (jobId) => {
  dispatch({type: DELETE_JOB_BEGIN})
  try {
    await authFetch.delete(`/jobs/${jobId}`)
    getJobs()
  } catch (error) {
    console.log(error.response)
    logoutUser()
  }
}


const showStats = async () => {
  dispatch({ type: SHOW_STATS_BEGIN })
  try {
    const { data } = await authFetch('/jobs/stats')
    dispatch({
      type: SHOW_STATS_SUCCESS,
      payload: {
        stats: data.defaultStats,
        monthlyApplications: data.monthlyApplications,
        MasterData_Sankey_Final: data.MasterData_Sankey_Final,
      },
    })
  } catch (error) {
    logoutUser()
  }
  clearAlert()
}


const clearFilters = () => {
  dispatch({type: CLEAR_FILTERS})
}

const changePage = (page) => {
  dispatch({type: CHANGE_PAGE, payload: {page}})
}


const changeJobView = () =>{
  dispatch({type: CHANGE_JOBS_VIEW})
}


  return (
    <AppContext.Provider value={{
      ...state,
      displayAlert,
      registerUser,
      loginUser,
      toggleSidebar,
      logoutUser,
      updateUser,
      handleChange, 
      clearValues,
      createJob,
      getJobs,
      setEditJob,
      deleteJob,
      editJob,
      showStats,
      clearFilters,
      changePage,
      changeJobView,
      googleLogin,
      handleChangeArray,
      refreshState,
      toggleDarkMode
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider }