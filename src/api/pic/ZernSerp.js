import { ApiFormat } from "../../apiReqFormat/ApiFormat";
import { Axiosi } from "../Axiosi";
import { Resource } from "../Resource";
import config from "../../../public/config.json";
export class ZerpSerp {
    constructor(apiFormat) {
        this.apiFormat = apiFormat;
    }
    client = new Axiosi();
    resources = [];
    apiFormat = new ApiFormat();
    async getBaseUrl() {
        try {
            const config = await this.client.load('../config.json');
            const apiBaseUrl = config?.data.api.ZerpSerp.baseUrl;
            return apiBaseUrl;
        }
        catch (err) {
            console.log(err);
        }
    }
    async getBaseParams() {
        try {
            const apiBaseParams = config?.api.zenserp.config.baseParams;
            return apiBaseParams;
        }
        catch (err) {
            console.log(err);
        }
    }
    getData(resData) {
        let respData = [];
        let mData;
        for (const data of resData.items) {
            mData = {
                type: "images",
                id: data.id,
                status: '',
                privacy: '',
                tags: [],
                description: "",
                genre: "",
                thumbnailSmall: data.thumbnail,
                thumbnailLarge: data.sourceUrl,
                created: '',
                license: '',
                title: data.title,
                authors: data.source,
                printType: ""
            };
            respData.push(mData);
        }
        return respData;
    }
    searchRes = new Resource(this, "images", {
        name: "searchRes",
        baseUrl: "/search",
        params: {
            q: this.apiFormat.keyword,
            tbm: this.apiFormat.format
        }
    }, "searchResp");
}
