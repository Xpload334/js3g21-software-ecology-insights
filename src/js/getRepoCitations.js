/*
Information produced using https://citeas.org/api

CiteAs is free and public, giving anyone programmatic access to the data.


See more about the project at https://citeas.org/about
 */

class GetRepoCitations{
    static async getCitations(htmlUrl="https://github.com/openai/openai-cookbook"){
        const apiUrl = `https://api.citeas.org/product/${htmlUrl}`
        
        try{
            const response = await fetch(apiUrl);
            if(response.ok){
                const jsonResponse = await response.json();
                return jsonResponse;
            }
            
            
        } catch(e){
            console.error(e);
        }
        
    }
}
export default GetRepoCitations;