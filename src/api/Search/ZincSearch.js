import config from '../../../public/config.json';
import { Resource } from '../Resource';
import { Axiosi } from '../Axiosi';
export class zincSearch {
    client = new Axiosi();
    resources = [];
    url = config.api.ZincSearch.baseUrl;
    index = (type, items) => {
        return new Resource(this, "index", {
            name: "indexRes",
            baseUrl: this.url + "/_bulkv2",
            params: config.api.ZincSearch.config,
            data: {
                index: type,
                records: items
            }
        }, "indexResp");
    };
    search = (type, searchType, term, maxResult) => {
        return new Resource(this, "searchRes", {
            name: "indexRes",
            baseUrl: this.url + "/" + type + "/_search",
            params: config.api.ZincSearch.config,
            data: {
                search_type: searchType,
                query: {
                    term: term,
                    start_time: "2021-06-02T14:28:31.894Z",
                    end_time: "2021-12-02T15:28:31.894Z"
                },
                from: 0,
                max_results: maxResult,
                _source: []
            }
        }, "searchResp");
    };
    getBaseUrl() {
        try {
            const apiBaseUrl = config?.api.ZincSearch.baseUrl;
            return apiBaseUrl;
        }
        catch (err) {
            console.log(err);
        }
    }
    getBaseParams() {
        try {
            const apiBaseParams = config?.api.ZincSearch.config;
            return apiBaseParams;
        }
        catch (err) {
            console.log(err);
        }
    }
    getData(resData) {
        let respData = [];
        let mData;
        return resData.hits.hits;
    }
    SearchResult;
}
