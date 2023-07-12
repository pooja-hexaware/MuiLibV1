import axios from "axios";


class DatagridService {

    fetchDataWithParams(url: string, queryParams: URLSearchParams) {
        return axios.get(`${url}?${queryParams.toString()}`);
    }

    fetchData(url: string) {
        return axios.get(url);
    }

    postData(url:string, body:any){
        return axios.post(url,body)
    }

    putData(url:string, body:any){
        return axios.post(url,body)
    }
    
    deleteData(url:string){
        return axios.delete(url)

    }
}

export default new DatagridService();
