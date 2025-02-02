import { ApiFormat } from "../../apiReqFormat/ApiFormat";
import { Axiosi } from "../Axiosi";
import { Resource } from "../Resource";
import config from "../../../public/config.json";
export class Unsplash {
    client = new Axiosi();
    config;
    resources = [];
    BASE_URL;
    BASE_PARAMS;
    constructor(format) {
        const apiFormat = new ApiFormat(format);
        this.imageRes = this.getResource(apiFormat);
    }
    imageRes;
    getResource(apiFormat) {
        return new Resource(this, 'images', {
            name: 'imageReq',
            baseUrl: '/photos/random',
            params: {
                query: apiFormat.keyword,
                count: apiFormat.length
            }
        }, 'imageResp');
    }
    getBaseParams() {
        const apiBaseParams = config.api.Unsplash.config;
        return apiBaseParams;
    }
    async getBaseUrl() {
        try {
            const apiBaseUrl = config?.api.Unsplash.baseUrl;
            return apiBaseUrl;
        }
        catch (err) {
            console.log(err);
        }
    }
    getData(resp) {
        let respData = [];
        let mData;
        if (Array.isArray(resp)) {
            for (const data of resp) {
                mData = {
                    type: "images",
                    id: data.id,
                    status: '',
                    privacy: '',
                    tags: [],
                    description: data.description,
                    genre: '',
                    created: '',
                    license: '',
                    title: '',
                    publisher_id: "",
                    isbn: "",
                    lccl: "",
                    oclc: "",
                    format: "",
                    printType: '',
                    thumbnailSmall: data.urls?.regular,
                    authors: [{
                            name: data.user?.name,
                            pic: ''
                        }],
                    thumbnailLarge: data.urls?.full,
                };
                respData.push(mData);
            }
        }
        return respData;
    }
}
