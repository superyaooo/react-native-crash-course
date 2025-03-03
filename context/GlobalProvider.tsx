import { createContext,useContext,useState,useEffect,ReactNode, useMemo} from 'react';
import { getCurrentUser } from '../lib/appwrite';
import { Models } from 'react-native-appwrite';

interface GlobalContextType {
	isLoggedIn: boolean;
	setIsLoggedIn: (loggedIn: boolean) => void;
	user: Models.Document | null;
	setUser: (user: Models.Document | null) => void;
	isLoading: boolean;
}

// Create the context with an initial value (null or an empty object can be used)
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = (): GlobalContextType => {
	const context = useContext(GlobalContext);
	if (!context) {
		throw new Error('useGlobalContext must be used within a GlobalProvider');
	}
	return context;
}

// GlobalProvider component's props type
interface GlobalProviderProps {
	children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [user, setUser] = useState<Models.Document | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		getCurrentUser()
			.then((res) => {
				if (res) {
					setIsLoggedIn(true);
					setUser(res);
				} else {
					setIsLoggedIn(false);
					setUser(null);
				}
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	// Memoize context value to prevent unnecessary re-renders
	const contextValue = useMemo(() => ({
		isLoggedIn,
		setIsLoggedIn,
		user,
		setUser,
		isLoading,
	}), [isLoggedIn, user, isLoading]);

	return (
		<GlobalContext.Provider value={contextValue}>
			{children}
		</GlobalContext.Provider>
	);
};
