import React, { useState } from 'react';
import { Grid, Button, InputAdornment, Container } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { LoanApplicationService, LoanApplicationDto } from '../services/loanApplicationService';
import { useHistory } from "react-router-dom";
import Routes from '../constants/routes';

type LandingProps = {};
type LandingState = {
    autoPurchasePrice: string,
    autoMake: string,
    autoModel: string,
    estimatedYearlyIncome: string,
    estimatedCreditScore: string
};

const LandingPage = (props: LandingProps) => {
    const history = useHistory();
    
    const [fields, setFields] = useState({
        autoPurchasePrice: '',
        autoMake: '',
        autoModel: '',
        estimatedYearlyIncome: '',
        estimatedCreditScore: ''
    } as LandingState);

    const handleFieldChange = (e: any) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e: any) => {
        // Typically here I'd double check validations. The react-material-ui-form-validator 
        // should have handled this though so for the sake of time I've skipped it here.
        const body: LoanApplicationDto = {
            autoPurchasePrice: Number(fields.autoPurchasePrice),
            autoMake: fields.autoMake,
            autoModel: fields.autoModel,
            estimatedYearlyIncome: Number(fields.estimatedYearlyIncome),
            estimatedCreditScore: Number(fields.estimatedCreditScore)
        };

        LoanApplicationService.apply(body)
            .then((result) => {
                alert(result);
            })
            .catch((error) => {
                history.push(Routes.DISQUALIFIED, { message: error })
            });
    }

    return (
        <Container>
            <ValidatorForm
                onSubmit={ handleSubmit }
            >
                <Grid
                    container
                    direction="column"      
                    justify="center"    
                    spacing={3}
                >
                    <Grid item xs={12}>
                        <h2>Loan Application Form</h2>
                    </Grid>
                    <Grid item xs={12}>
                        <TextValidator
                            required
                            validators={['required','matchRegexp:^[0-9]+(.[0-9]{1,2})?$']}
                            errorMessages={['This field is required.', 'This field must be a valid US dollar amount.']}
                            name='autoPurchasePrice'
                            id='autoPurchasePrice' 
                            label='Auto Purchase Price'                
                            type="number"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            value={fields.autoPurchasePrice} 
                            onChange={handleFieldChange}
                            style={{minWidth: '300px'}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextValidator
                            required
                            validators={['required']}
                            errorMessages={['This field is required.']}
                            name='autoMake'
                            id='autoMake' 
                            label='Auto Make'
                            value={fields.autoMake} 
                            onChange={handleFieldChange}
                            style={{minWidth: '300px'}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextValidator
                            required
                            validators={['required']}
                            errorMessages={['This field is required.']}
                            name='autoModel'
                            id='autoModel' 
                            label='Auto Model'
                            value={fields.autoModel} 
                            onChange={handleFieldChange}
                            style={{minWidth: '300px'}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextValidator
                            required
                            validators={['required','matchRegexp:^[0-9]+(.[0-9]{1,2})?$']}
                            errorMessages={['This field is required.', 'This field must be a valid US dollar amount.']}
                            name='estimatedYearlyIncome'
                            id='estimatedYearlyIncome' 
                            label='Estimated Yearly Income'
                            type="number"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            value={fields.estimatedYearlyIncome} 
                            onChange={handleFieldChange}
                            style={{minWidth: '300px'}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextValidator
                            required
                            validators={['required','minNumber:300', 'maxNumber:850']}
                            errorMessages={['This field is required.', 'Minumum credit score is 300.', 'Maximum credit score is 850.']}
                            name='estimatedCreditScore'
                            id='estimatedCreditScore' 
                            label='Estimated Credit Score'
                            type="number"
                            value={fields.estimatedCreditScore} 
                            onChange={handleFieldChange}
                            style={{minWidth: '300px'}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{fontSize: '0.7rem'}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
                            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
                            mollit anim id est laborum.
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">Submit</Button>
                    </Grid>
                </Grid>
            </ValidatorForm>
        </Container>
    )
};

export default LandingPage;