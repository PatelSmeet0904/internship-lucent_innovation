import { AlphaStack, Page, Pagination } from "@shopify/polaris";
import React, { useEffect } from "react";
import {
  IndexTable,
  LegacyCard,
  Filters,
  useIndexResourceState,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../features/customer/CustomerListSlice";
import { DeleteMajor, EditMajor } from "@shopify/polaris-icons";

const CustomerList = () => {
  const { customers } = useSelector((state) => state.customers);
  const { loggedInShop } = useSelector((state) => state.shopLogin);

  const dispatch = useDispatch();
  const customersData = customers?.data?.map((c) => {
    return {
      id: +c.id,
      fname: c.fname,
      lname: c.lname,
      email: c.email,
      phone: c.phone,
    };
  });

  const [currentPage, setCurrentPage] = useState(1);
  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(customersData);
  const [queryValue, setQueryValue] = useState("");

  let pages;
  if (customers.data) {
    pages = Math.ceil(customers.count / 10);
  }

  useEffect(() => {
    dispatch(
      fetchCustomers({
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

  const resourceName = {
    singular: "customer",
    plural: "customers",
  };

  const handleQueryValueRemove = useCallback(
    () => setQueryValue(undefined),
    []
  );

  const promotedBulkActions = [
    {
      content: "Edit customers",
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
      content: "Delete customers",
      onAction: () => console.log("Todo: implement bulk delete"),
    },
  ];

  const filters = [];
  console.log(filters);
  const rowMarkup =
    customersData &&
    customersData?.map(({ id, fname, lname, email, phone }, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>{fname}</IndexTable.Cell>
        <IndexTable.Cell>{lname}</IndexTable.Cell>
        <IndexTable.Cell>{email}</IndexTable.Cell>
        <IndexTable.Cell>{phone}</IndexTable.Cell>
      </IndexTable.Row>
    ));

  return (
    <Page title="Customers">
      <LegacyCard>
        <div style={{ padding: "16px" }}>
          <div style={{ flex: 1 }}>
            <Filters
              queryValue={queryValue}
              filters={filters}
              onQueryChange={setQueryValue}
              onQueryClear={handleQueryValueRemove}
            />
          </div>
        </div>
        <IndexTable
          resourceName={resourceName}
          itemCount={customersData?.length}
          selectedItemsCount={
            allResourcesSelected ? "All" : selectedResources?.length
          }
          onSelectionChange={handleSelectionChange}
          hasMoreItems
          bulkActions={bulkActions}
          promotedBulkActions={promotedBulkActions}
          lastColumnSticky
          headings={[
            { title: "First Name" },
            { title: "Last Name" },
            { title: "Email" },
            { title: "Phone" },
          ]}
        >
          {rowMarkup}
        </IndexTable>
      </LegacyCard>
      <br />
      <AlphaStack align="center">
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
    </Page>
  );
};

export default CustomerList;
