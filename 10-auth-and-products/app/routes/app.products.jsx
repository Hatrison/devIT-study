import {
  Page,
  Layout,
  Text,
  Card,
  ResourceList,
  ResourceItem,
  Thumbnail,
  Pagination,
  TextField,
  Filters,
} from '@shopify/polaris';
import { authenticate } from '../shopify.server';
import { getCookies } from '../cookie/getCookies';
import { createGraphQLClient } from '@shopify/graphql-client';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useCallback, useMemo, useState } from 'react';

export const loader = async ({ request }) => {
  await authenticate(request);

  const { session } = await getCookies(request);
  const client = createGraphQLClient({
    url: `https://${process.env.SHOPIFY_STORE_NAME}/admin/api/2023-10/graphql.json`,
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': session,
    },
    retries: 1,
  });

  const { data } = await fetchProducts(client);

  return json({ data, client });
};

export default function ProductsPage() {
  const {
    data: { products },
  } = useLoaderData();

  const [queryValue, setQueryValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [sortValue, setSortValue] = useState('PRICE_HIGH_TO_LOW');

  const sortProducts = useCallback(
    products => {
      return [...products].sort((a, b) => {
        switch (sortValue) {
          case 'PRICE_LOW_TO_HIGH':
            return (
              a?.priceRangeV2?.minVariantPrice?.amount -
              b?.priceRangeV2?.minVariantPrice?.amount
            );
          case 'PRICE_HIGH_TO_LOW':
            return (
              b?.priceRangeV2?.minVariantPrice?.amount -
              a?.priceRangeV2?.minVariantPrice?.amount
            );
          default:
            return products;
        }
      });
    },
    [sortValue]
  );

  const preparedProducts = useMemo(() => {
    const filteredProducts = (products?.nodes || []).filter(item => {
      return item?.title?.toLowerCase()?.includes(queryValue?.toLowerCase());
    });

    return sortProducts(filteredProducts).slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [currentPage, itemsPerPage, products, queryValue, sortProducts]);

  const handleQueryValueRemove = useCallback(() => setQueryValue(''), []);
  const handleClearAll = useCallback(() => {
    handleQueryValueRemove();
  }, [handleQueryValueRemove]);

  const filters = [
    {
      key: 'title',
      label: 'Title',
      filter: (
        <TextField
          label="Title"
          value={queryValue}
          onChange={value => setQueryValue(value)}
          autoComplete="off"
          labelHidden
        />
      ),
    },
  ];

  const appliedFilters = [
    ...(queryValue && !isEmpty(queryValue)
      ? [
          {
            key: 'title',
            label: disambiguateLabel('title', queryValue),
            onRemove: handleQueryValueRemove,
          },
        ]
      : []),
  ];

  return (
    <Page>
      <ui-title-bar title="Products" />
      <Layout>
        <Layout.Section>
          <Card>
            <Filters
              queryValue={queryValue}
              filters={filters}
              appliedFilters={appliedFilters}
              onQueryChange={setQueryValue}
              onQueryClear={handleQueryValueRemove}
              onClearAll={handleClearAll}
            ></Filters>
            <ResourceList
              resourceName={{ singular: 'product', plural: 'products' }}
              items={preparedProducts}
              sortValue={sortValue}
              sortOptions={[
                { label: 'Lowest price', value: 'PRICE_LOW_TO_HIGH' },
                { label: 'Highest price', value: 'PRICE_HIGH_TO_LOW' },
              ]}
              onSortChange={selected => setSortValue(selected)}
              renderItem={item => {
                const {
                  id,
                  onlineStorePreviewUrl,
                  title,
                  featuredImage,
                  priceRangeV2: {
                    minVariantPrice: { amount, currencyCode },
                  },
                } = item;
                const media = (
                  <Thumbnail
                    source={featuredImage?.url || ''}
                    alt={featuredImage?.altText || ''}
                    size="large"
                  />
                );

                return (
                  <ResourceItem
                    id={id}
                    url={onlineStorePreviewUrl}
                    media={media}
                    accessibilityLabel={`View details for ${title}`}
                  >
                    <Text variant="bodyMd" fontWeight="bold" as="h3">
                      {title}
                    </Text>
                    <div>{`${amount} ${currencyCode}`}</div>
                  </ResourceItem>
                );
              }}
            />
            <Pagination
              hasPrevious={currentPage > 1}
              hasNext={
                currentPage * itemsPerPage <
                (products?.nodes.length || itemsPerPage)
              }
              onPrevious={() => setCurrentPage(prev => prev - 1)}
              onNext={() => setCurrentPage(prev => prev + 1)}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

const fetchProducts = async client => {
  return await client.request(
    `
    query {
      products(first: 10) {
        nodes {
          id
          title
          onlineStorePreviewUrl
          featuredImage {
            altText
            url
          }
          priceRangeV2 {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
    `
  );
};

function disambiguateLabel(key, value) {
  switch (key) {
    case 'title':
      return `Title: ${value}`;
    default:
      return value;
  }
}

function isEmpty(value) {
  if (Array.isArray(value)) {
    return value.length === 0;
  } else {
    return value === '' || value == null;
  }
}
