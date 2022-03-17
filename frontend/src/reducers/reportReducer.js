import { REPORT_FAIL, REPORT_REQUEST, REPORT_SUCCESS } from "../constants/reportConstants"



export const getReportReducer = (state = {}, action) => {

    switch(action.type) {


           case REPORT_REQUEST:
               return {loading: true}

           case REPORT_SUCCESS:
               return {loading: false, reportInfo: action.payload}

           case REPORT_FAIL:
               return {loading: false, error: action.payload}  
                 

           default:
               return state;


    }

}