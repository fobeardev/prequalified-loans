export function configureFakeApi() {
    let actualFetch = window.fetch;
    window.fetch = function (url: any, opts: any) {
        return new Promise((resolve: any, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

                // Loan Application
                if (url.endsWith('/loans/apply') && opts.method === 'POST') {
                    // get parameters from post request
                    let params = JSON.parse(opts.body);

                    // The form should handle errors before I cast this, 
                    // But traditionally I would do paranoid checks to ensure
                    if (
                        Number(params.autoPurchasePrice) < (Number(params.estimatedYearlyIncome) / 5) &&
                        params.estimatedCreditScore >= 600
                    ) {
                        let responseJson = {
                        };
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
                    } else {
                        // else return error
                        reject(`We're sorry, you are not qualified at this time. If you believe this to be an error or want more information regarding this matter, please call customer service at 800-555-1212`);
                    }

                    return;
                }

                // pass through any requests not handled above
                actualFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }
}