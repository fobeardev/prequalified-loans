export type LoanApplicationDto =  {
    autoPurchasePrice: number,
    autoMake: string,
    autoModel: string,
    estimatedYearlyIncome: number,
    estimatedCreditScore: number
};

export class LoanApplicationService {
    /**
     * apply
     * Requests a loan for an automobile
     * @param {LoanApplicationDto} application
     */
    static apply(application: LoanApplicationDto): Promise<any> {
        return fetch('/loans/apply', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(application)
        });
    }
}