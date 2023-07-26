import { useQuery, gql } from "@apollo/client";
import { useAppProvider } from "../context/context";

interface IProduct {
  node: {
    id: string;
    title: string;
    description: string;
    totalInventory: number;
    status: string;
    featuredImage: {
      url: string;
    };
  };
}

const Products = () => {
  const { state } = useAppProvider();

  const GET_PRODUCTS = gql`
    query GetProducts {
      products(first: 20, query: "${state.query}", sortKey:TITLE, reverse: ${state.reverse}) {
        edges {
          node {
            id
            title
            totalInventory
            description
            featuredImage {
              url
            }
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.products.edges
          .filter(({ node }: IProduct) =>
            state.filterAvailableOnly ? node.totalInventory > 0 : true
          )
          .map(({ node }: IProduct) => (
            <div key={node.id} className="border rounded shadow-md p-4">
              {node.featuredImage && (
                <img
                  src={node.featuredImage.url}
                  alt={node.featuredImage.url}
                  className="w-full h-80 mb-4"
                />
              )}
              <h3 className="text-lg font-semibold mb-2">{node.title}</h3>
              <p className="text-gray-600 font-mono">
                Available Stock: {node.totalInventory}
              </p>
              <p className="text-gray-600 ">{node.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Products;
