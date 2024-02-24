// store.js
import { reactive } from 'vue'
import {dashboardStore} from "../dashboard/dashboardStore.js";


export const storeMain = reactive({
    //State
    connected: false,
    
    state: "search", //Search ||| Stats ||| Commits

    //Language
    chosenLanguage: "en", //['en','es','it','sv','ru','id','bg','zh-Hans']
    
    //Chosen fields
    owner: "",
    repoName: "",

    //Fields
    isLoading: false,
    errorMessage: "",
    successMessage: "",
    
    openDashboard(owner, repo){
        console.log("Store main, changing state to dashboard")
        this.state = "dashboard"
        this.owner = owner;
        this.repoName = repo;
    },
    openSearch(){
        console.log("Store main, changing state to search")
        this.state = "search";
    },

    success(message) {
        this.successMessage = message;
        setTimeout(() => {
            this.successMessage = null;
        }, 3000);
    },
    fail(message) {
        this.errorMessage = message;
        setTimeout(() => {
            this.errorMessage = null;
        }, 3000);
    },
});