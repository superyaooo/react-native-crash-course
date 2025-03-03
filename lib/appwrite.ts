import { Account, Avatars, Client, Databases, ID, Models, Query } from 'react-native-appwrite';

export const appwriteConfig = {
	endpoint: 'https://cloud.appwrite.io/v1',
	platform: 'com.my.firstapp',
	projectId: '67c4ca87001fc90c0ecf',
	databaseId: '67c4cbe4001dac6c6544',
	userCollectionId: '67c4cc2f003a21bd1f3f',
	videoCollectionId: '67c4cc570020fd8452ba',
	storageId: '67c4cddc00047569dedf',
};

const client = new Client();
client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);
    
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export interface EmailPasswordProps {
	email: string;
	password: string;
}
export interface CreateUserProps extends EmailPasswordProps {
    username: string;
}

export const createUser = async ({ email, password, username } : CreateUserProps): Promise<Models.Document> => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );

        if (!newAccount) throw Error('Account creation failed');
        
        const avatarUrl = avatars.getInitials(username);

        await signIn({ email, password });

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(), {
            accountId: newAccount.$id,
            email,
            username,
            avatar: avatarUrl
        }
        );
        return newUser;
    } catch (error: any) {
        console.log('Error creating user: ', error);
        throw new Error(error?.message || 'Error occurred during user creation');
    }
}

export async function signIn({ email, password } : EmailPasswordProps): Promise<Models.Session> {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getCurrentUser(): Promise<Models.Document | void> {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );

        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
}