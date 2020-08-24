import React, { useState, useEffect } from 'react';
import { Grid, Container, Typography, Icon, Button } from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

type CreateAccountState = {
    username: string,
    password: string,
    confirmPassword: string
}

const CreateAccountPage = () => {
    const usernameRef = React.createRef<TextValidator>();
    const passwordRef = React.createRef<TextValidator>();
    const confirmPasswordRef = React.createRef<TextValidator>();

    const [fields, setFields] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    } as CreateAccountState);

    useEffect(() => {
        ValidatorForm.addValidationRule('isPassword', (value) => verifyPassword(value));
        ValidatorForm.addValidationRule('isEmailValid', (value) => verifyEmailAddress(value));
    });

    const handleFieldChange = (e: any) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        });
    }

    const handleBlur = (e: any) => {
        const { name, value } = e.target;
        if (name === 'username') {
            if (usernameRef.current) {
                // validate DOES exist on ref.current. 
                // Not sure why typescript doesn't see it.
                const current: any = usernameRef.current;
                current.validate(value);
            }
        } else if (name === 'password') {
            if (passwordRef.current) {
                const current: any = passwordRef.current;
                current.validate(value);
            }
        } else if (name === 'confirmPassword') {
            if (confirmPasswordRef.current) {
                const current: any = confirmPasswordRef.current;
                current.validate(value);
            }
        }
    };

    const handleSubmit = (e: any) => {
        alert("account created");
    };

    
    const nullOrEmpty = (value: string) => !value || value.trim() === '';

    const verifyPassword = (value: string): boolean => {
        if (nullOrEmpty(value)) {
            return false;
        }

        const trimmed = value.trim();
        const passwordExp = new RegExp(/^(?=.*[A-z])(?=.*\d)(?=.*[@$!%*#?&])[A-z\d@$!%*#?&]{8,}$/);

        return trimmed.length >= 8 && passwordExp.test(trimmed);
    };

    const verifyEmailAddress = (value: string): boolean => {
        if (nullOrEmpty(value)) {
            return false;
        }

        const trimmed = value.trim();
        // eslint-disable-next-line no-control-regex
        const emailExp = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);

        return emailExp.test(trimmed);
    }

    return (
        <Container>
            <ValidatorForm
                onSubmit={ handleSubmit }
                instantValidate={false}
            >
                <Grid
                    container
                    direction="column"      
                    justify="center"    
                    spacing={3}
                >
                    <Grid item xs={12}>
                        <Typography color="textSecondary" gutterBottom variant="subtitle1">Congratulations! You have been approved.</Typography>
                        <Typography variant="h3">Create an account.</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextValidator
                            ref={usernameRef}
                            required
                            validators={['required', 'isEmail']}
                            errorMessages={['This field is required.', 'Username must be a valid email.']}
                            name='username'
                            id='username' 
                            label='Username'                
                            value={fields.username} 
                            onChange={handleFieldChange}
                            onBlur={handleBlur}
                            style={{minWidth: '300px'}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextValidator
                            ref={passwordRef}
                            required
                            validators={['required', 'isPassword']}
                            errorMessages={['This field is required.', 'This field must be a valid password (see below).']}
                            name='password'
                            id='password' 
                            label='Password'
                            type="password"
                            value={fields.password} 
                            onChange={handleFieldChange}
                            onBlur={handleBlur}
                            style={{minWidth: '300px'}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextValidator
                            required
                            validators={['required', 'isPassword']}
                            errorMessages={['This field is required.', 'This field must be a valid password (see below).']}
                            name='confirmPassword'
                            id='confirmPassword' 
                            label='Confirm Password'
                            type="password"
                            value={fields.confirmPassword} 
                            onChange={handleFieldChange}
                            onBlur={handleBlur}
                            style={{minWidth: '300px'}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container direction="row" alignItems="center" justify="center" style={{marginBottom: 14}}>
                            <Icon style={{fontSize: 18}}>help_outline</Icon>&nbsp;
                            <Typography color="textSecondary" variant="caption">Usernames must be a valid Email.</Typography>
                        </Grid>
                        <Grid container direction="row" alignItems="center" justify="center">
                            <Icon style={{fontSize: 18}}>help_outline</Icon>&nbsp;
                            <Typography color="textSecondary" variant="caption">Passwords must have at least 8 characters, 1 number and 1 special character.</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit">Submit</Button>
                    </Grid>
                </Grid>
            </ValidatorForm>
        </Container>
    )
}

export default CreateAccountPage;