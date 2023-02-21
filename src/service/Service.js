/* eslint-disable class-methods-use-this */
const baseURL = 'https://blog.kata.academy/api/';
export default class Service {
    async makeRequest(url) {
        try {
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error('invalid responce', res.status);
            }
            const body = await res.json();
            return body;
        } catch (e) {
            throw new Error(e);
        }
    }

    getArticles = async (page) => {
        const url = `${baseURL}articles?offset=${(page - 1) * 20}`;
        const body = await this.makeRequest(url);
        return body;
    };
}
