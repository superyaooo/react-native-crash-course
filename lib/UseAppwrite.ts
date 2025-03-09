import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Models } from 'react-native-appwrite';

type FetchFunction = () => Promise<Models.Document[]>;

interface UseAppwriteResult {
  data: Models.Document[];
  isLoading: boolean;

  refetch: () => Promise<void>;
}

const useAppwrite = (fn: FetchFunction): UseAppwriteResult => {
  const [data, setData] = useState<Models.Document[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	
  const fetchData = async (): Promise<void> => {
      setIsLoading(true);

      try {
        const response = await fn();
        setData(response);
      } catch (error: any) {
        Alert.alert('Error', error.message);
      } finally {
        setIsLoading(false);
      }
  };
  
	useEffect(() => {
		fetchData();
	}, [fn]);

  const refetch = async (): Promise<void> => {
    await fetchData();
  };

  return { data, isLoading, refetch };
}

export default useAppwrite;