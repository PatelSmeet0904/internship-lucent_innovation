import { AlphaStack, Avatar, Page, Pagination } from "@shopify/polaris";
import React, { useEffect } from "react";
import {
  TextField,
  IndexTable,
  LegacyCard,
  Filters,
  Select,
  useIndexResourceState,
  Text,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/product/ProductListSlice";

const ProductList = () => {
  const { products } = useSelector((state) => state.products);
  const { loggedInShop } = useSelector((state) => state.shopLogin);

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  let pages;
  if (products.data) {
    pages = Math.ceil(products.count / 10);
  }

  const productsData = products?.data?.map((p) => {
    return {
      image: p?.product_images[0]?.src,
      id: +p.id,
      Title: p.title,
      Vendor: p.vendor,
      Product_Type: p.product_type,
      Status: p.status,
    };
  });

  const resourceName = {
    singular: "product",
    plural: "products",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(productsData);

  const [taggedWith, setTaggedWith] = useState("");
  const [queryValue, setQueryValue] = useState("");
  const [sortValue, setSortValue] = useState("today");

  useEffect(() => {
    dispatch(
      fetchProducts({
        currentPage,
        keyword: queryValue,
        token: loggedInShop.token,
      })
    );
  }, [currentPage, queryValue, dispatch, loggedInShop]);

  useEffect(() => {
    if (queryValue) {
      setCurrentPage(1);
    }
  }, [queryValue]);

  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    []
  );
  const handleTaggedWithRemove = useCallback(
    () => setTaggedWith(undefined),
    []
  );
  const handleQueryValueRemove = useCallback(
    () => setQueryValue(undefined),
    []
  );
  const handleClearAll = useCallback(() => {
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [handleQueryValueRemove, handleTaggedWithRemove]);
  const handleSortChange = useCallback((value) => setSortValue(value), []);

  const promotedBulkActions = [
    {
      content: "Edit products",
      onAction: () => console.log("Todo: implement bulk edit"),
    },
  ];
  const bulkActions = [
    {
      content: "Add tags",
      onAction: () => console.log("Todo: implement bulk add tags"),
    },
    {
      content: "Remove tags",
      onAction: () => console.log("Todo: implement bulk remove tags"),
    },
    {
      content: "Delete products",
      onAction: () => console.log("Todo: implement bulk delete"),
    },
  ];

  const filters = [
    {
      key: "taggedWith",
      label: "Tagged with",
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
  ];

  const appliedFilters =
    taggedWith && !isEmpty(taggedWith)
      ? [
          {
            key: "taggedWith",
            label: disambiguateLabel("taggedWith", taggedWith),
            onRemove: handleTaggedWithRemove,
          },
        ]
      : [];

  const sortOptions = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Last 7 days", value: "lastWeek" },
  ];

  const rowMarkup =
    productsData &&
    productsData?.map(({ image, id, Title, Vendor, Product_Type }, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Avatar
            name="Product Image"
            size="large"
            shape="square"
            source={image}
          />
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" numeric>
            {id}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text fontWeight="bold" as="span">
            {Title}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{Vendor}</IndexTable.Cell>
        <IndexTable.Cell>{Product_Type}</IndexTable.Cell>
      </IndexTable.Row>
    ));
  return (
    <Page title="Products">
      <LegacyCard>
        <div style={{ padding: "16px", display: "flex" }}>
          <div style={{ flex: 1 }}>
            <Filters
              queryValue={queryValue}
              filters={filters}
              appliedFilters={appliedFilters}
              onQueryChange={setQueryValue}
              onQueryClear={handleQueryValueRemove}
              onClearAll={handleClearAll}
            />
          </div>
          <div style={{ paddingLeft: "0.25rem" }}>
            <Select
              labelInline
              label="Sort by"
              options={sortOptions}
              value={sortValue}
              onChange={handleSortChange}
            />
          </div>
        </div>
        <IndexTable
          resourceName={resourceName}
          itemCount={productsData?.length}
          selectedItemsCount={
            allResourcesSelected ? "All" : selectedResources?.length
          }
          onSelectionChange={handleSelectionChange}
          hasMoreItems
          bulkActions={bulkActions}
          promotedBulkActions={promotedBulkActions}
          lastColumnSticky
          headings={[
            { title: "Image" },
            { title: "ID" },
            { title: "Title" },
            { title: "Vendor" },
            { title: "Product-Type" },
          ]}
        >
          {rowMarkup}
        </IndexTable>
      </LegacyCard>
      <br />
      <AlphaStack align="center" spacing="bottomMedium">
        <Pagination
          hasPrevious={currentPage > 1}
          onPrevious={() => {
            setCurrentPage((p) => p - 1);
          }}
          hasNext={currentPage < pages}
          onNext={() => {
            setCurrentPage((p) => p + 1);
          }}
        />
      </AlphaStack>
      <br />
      <br />
    </Page>
  );
  function disambiguateLabel(key, value) {
    switch (key) {
      case "taggedWith":
        return `Tagged with ${value}`;
      default:
        return value;
    }
  }

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === "" || value == null;
    }
  }
};

export default ProductList;
