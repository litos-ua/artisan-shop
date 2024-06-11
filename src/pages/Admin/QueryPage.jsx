import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from 'react-query'

const queryClient = new QueryClient()

export const QueryPage = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Example />
        </QueryClientProvider>
    )
}

function Example() {
    const { isPending, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
            //https://api.github.com/repos/TanStack/query
            fetch('http://192.168.0.31/api/categories').then((res) =>
                res.json(),
            ),
    })
    console.log('data:', data);
    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    if (!data) return <div>No data available</div>;

    return (
        <div style={{ paddingLeft: '5vw' }}>
            <h1>Categories</h1>
            <ul>
                {data.categories.map((category) => (
                    <li key={category.id}>
                        {category.id}: {category.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

