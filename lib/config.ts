export const config = {
    port: process.env.PORT || 3100,
    url: (network: string) => {
        const userNetwork = network.split('-')[1] || network;
        return `http://api.adp.onetapi.pl/${userNetwork}/v1/`
    },
    databaseUrl: process.env.MONGODB_URI || 'mongodb+srv://twwai:KTp5wYwutrLHPLT@cluster0.ooees.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
};
