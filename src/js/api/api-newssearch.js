/*import axios from 'axios';


export default class SearchNews {
    constructor () {
        this.queryPage=1
        this.searchQuery= ""
    }

 async  searchNewsImg() {

  const API_URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json`;
  const API_KEY = 'ExFFGvT2fZBzTdDFtfXKysgryhCLXIkg';
  const response = await axios.get(`${API_URL}?q=${this.searchQuery}&api-key=${API_KEY}`);
  this.incrementPage()
    return response.data;
 }
  
resetPage(){
    this.queryPage=1;

}

incrementPage (){
    this.queryPage +=1 ;
}

get query (){
    return this.searchQuery;
}

set query(newQuery){
    return this.searchQuery = newQuery;
}
}


*/
