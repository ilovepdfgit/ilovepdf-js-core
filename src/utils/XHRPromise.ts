type Options = {
    headers?: Array< [ string, string ] >;
    transformResponse?: (response: any) => any;
};

export default class XHRPromise {

    public get<T>(url: string, options?: Options) {
        return XHRPromise.makeRequest<T>('GET', url, undefined, options);
    }

    public post<T>(url: string, data?: any, options?: Options) {
        return XHRPromise.makeRequest<T>('POST', url, JSON.stringify(data), options);
    }

    public put<T>(url: string, data?: any, options?: Options) {
        return XHRPromise.makeRequest<T>('PUT', url, JSON.stringify(data), options);
    }

    public delete<T>(url: string, options?: Options) {
        return XHRPromise.makeRequest<T>('DELETE', url, undefined, options);
    }

    private static makeRequest<T>(method: string, url: string, data?: any, options: Options = {}): Promise<T> {
        return new Promise<T>(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            XHRPromise.setHeaders(xhr, options);

            // Success handling.
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    // Transform response if it was configured.
                    const { transformResponse } = options;
                    const response = !!transformResponse ? transformResponse(this.response) : this.response;

                    resolve(response);
                }
                else {
                    reject({
                        status: this.status,
                        statusText: this.statusText
                    });
                }
            };

            // Error handling.
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: this.statusText
                });
            };

            // Send.
            xhr.send(data);
        })
        .catch(error => {
            throw error;
        });
    }

    private static setHeaders(xhr: XMLHttpRequest, options?: Options) {
        // Content-Type header for JSON response.
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

        // Authorization headers.
        if (!!options) {
            if (!!options.headers) {
                // Mandatory to not have errors.
                xhr.withCredentials = true;

                options.headers.forEach(([ key, value ]) => {
                    xhr.setRequestHeader(key, value);
                });

            }
        }

    }

}
