class Query{
    static QUERY_CHARACTER_LIMIT = 256;
    
    user = "github";
    
    searchTags = [];
    // searchIn = "all" || "name" || "description" || "topics" || "readme";
    searchIn = "all";
    
    constructor(tags=[], searchType="all") {
        this.searchTags = tags;
        this.searchIn = searchType;
    }
    
    toString(){
        let tagsString = "";
        this.searchTags.forEach((tag) => {
            tagsString += tag;
            tagsString += " ";
        });
        
        let inString = "";
        if(this.searchIn !== "all"){
            inString = `in:${this.searchIn}`;
        }
        
        let finalString = 'q=' + encodeURIComponent(tagsString + `user:${this.user}` + inString)
        if(finalString.length > Query.QUERY_CHARACTER_LIMIT){
            console.error(`Query must be less than ${Query.QUERY_CHARACTER_LIMIT} characters`)
            return null;
        }
        
        return finalString;
    }
}