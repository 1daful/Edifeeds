import { Resource } from "../Resource";
import { ApiFormat } from "../../apiReqFormat/ApiFormat";
import { Axiosi } from "../Axiosi";
export class MailjetFunc {
    client = new Axiosi();
    apiFormat = new ApiFormat();
    getBaseUrl() {
        throw new Error("Method not implemented.");
    }
    getBaseParams() {
        throw new Error("Method not implemented.");
    }
    getData(res) {
        const resi = [];
        resi.push(res);
        return resi;
    }
    resources = [];
    BASE_URL = '/.netlify/functions';
    BASE_PARAMS;
    getContactRes = new Resource(this, 'getContact', {
        name: 'getContactReq',
        baseUrl: '/get-contact',
        params: {
            id: 'id'
        }
    }, 'getContactResp');
    postContactRes = new Resource(this, 'postContact', {
        name: 'postContactReq',
        baseUrl: '/post-contact',
        params: {
            id: 'id'
        }
    }, 'postContactResp');
    setDataSource(data) {
        this.getContactRes.response.dataSource = data.data;
        this.postContactRes.response.dataSource = data.data;
    }
    setData(resp) {
        let mData;
        for (const data of resp.dataSource) {
            mData = {
                id: data.id,
                name: data.name,
                email: data.email
            };
            resp.dataList.push(mData);
        }
    }
    setResponse(data) {
        this.setDataSource(data);
        this.setData(this.getContactRes.response);
        this.setData(this.postContactRes.response);
    }
    data = {
        id: 'id',
        status: 'state',
        privacy: 'sharing',
        tags: 'tag_list',
        url: 'url',
        description: 'description',
        genre: 'genre',
        thumbnail: 'artwork_url',
        created: 'created_at',
        license: 'license',
        volumeInfo: {
            title: 'title',
            authors: 'authors',
        }
    };
}
