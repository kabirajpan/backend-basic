import express from 'express';

const app = express();

app.get('/', (req,res) => {
    res.send('Server is ready')
});

/// get a list of 5 jokes

app.get('/api/jokes', (req, res) => {
    const jokes = [
        {
            id: 1,
            title: 'A joke',
            content: 'This is a joke',
        },
        {
            id: 2,
            title: 'joke 2',
            content: 'This is a joke 2',
        },
        {
            id: 3,
            title: 'joke 3',
            content: 'This is a joke 3',
        },
        {
            id: 4,
            title: 'joke 4',
            content: 'This is a joke 4',
        },
        {
            id: 5,
            title: 'joke 5',
            content: 'This is a joke 5',
        }
    ];
    res.send(jokes)
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
    
});
