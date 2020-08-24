import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Card, CardContent, Typography } from '@material-ui/core';

type QualifiedProps = {
};

const DisqualifiedPage = (props: QualifiedProps) => {
    const location = useLocation();
    const state = location.state as {message: string};
    let message = state.message;

    if (!message) {
        const stored = localStorage.getItem('disqualified');

        if (stored) {
            const parsed = JSON.parse(stored);

            if (parsed) {
                message = parsed.message;
            }
        }

        // This should never hit, but lets put a default message in case
        if (!message) {
            message = "We're sorry, you did not qualify. If you believe this to be an error please call customer service."
        }
    }

    return (
        <React.Fragment>
            <Container fixed style={{marginTop: '4rem'}}>
                <Card elevation={3}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Eligibility Notification
                        </Typography>
                        <Typography style={{margin: '1rem'}}>
                            <PhoneNumberator message={message} />
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </React.Fragment>
    )
}

// Normally, I tend to follow the 1 component per file train of thought
const PhoneNumberator = ({message}: {message: string}) => {
    if (!message) {
        return <span></span>;
    }

    const formattedMessage = message.replace(
        /([+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6})/i,
        '<a href="tel:$1">$1</a>');

    // would maybe use a library to "dangerously set inner html" that
    // could protect and scrub bad input, but for quickness this is built into react
    return (
        <React.Fragment>
            <span dangerouslySetInnerHTML={{__html: formattedMessage}} />
        </React.Fragment>
    )
}

export default DisqualifiedPage;