import {
  AlphaStack,
  Button,
  DataTable,
  Filters,
  Icon,
  LegacyCard,
  Modal,
  Page,
  Pagination,
  Spinner,
} from "@shopify/polaris";
import { DeleteMajor, EditMajor } from "@shopify/polaris-icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader";
import { fetchCustomers } from "../../features/customer/CustomerListSlice";
import { deleteCustomer } from "../../features/customer/DeleteCustomerSlice";
import { showToast } from "../../features/toast/ToastSlice";

const CustomerList = () => {
  const { customers, loading } = useSelector((state) => state.customers);
  const { loggedInShop } = useSelector((state) => state.shopLogin);
  const { deleteCustomerStatus } = useSelector((state) => state.customerDelete);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeModal, setActiveModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(-1);

  const [currentPage, setCurrentPage] = useState(1);
  const [queryValue, setQueryValue] = useState(undefined);
  const [filters, setFilters] = useState([]);

  const rows = customers?.data?.map((c) => {
    return [
      c.fname,
      c.lname,
      c.email,
      c.phone,
      <Button onClick={() => editHandler(c.id)} primary>
        <Icon source={EditMajor} color="base" />
      </Button>,
      <Button
        onClick={() => {
          setActiveModal(true);
          setConfirmDelete(c.id);
        }}
        destructive
      >
        <Icon source={DeleteMajor} color="base" />
      </Button>,
    ];
  });

  let pages;
  if (customers.data) {
    pages = Math.ceil(customers.count / 10);
  }

  useEffect(() => {
    if (loggedInShop.token || !deleteCustomerStatus) {
      dispatch(
        fetchCustomers({
          currentPage,
          keyword: queryValue,
          token: loggedInShop.token,
        })
      );
    }
    if (!deleteCustomerStatus) {
      setActiveModal(false);
    }
  }, [currentPage, queryValue, dispatch, loggedInShop, deleteCustomerStatus]);

  useEffect(() => {
    if (queryValue) {
      setCurrentPage(1);
    }
  }, [queryValue]);

  const handleSearchChange = (value) => {
    setQueryValue(value);
  };

  const editHandler = (id) => {
    console.log(id);
    navigate(`/admin/customer/${id}`);
  };

  const deleteHandler = () => {
    const id = confirmDelete;
    dispatch(deleteCustomer({ id, token: loggedInShop.token }));
    dispatch(
      showToast({ message: "Customer Deleted Successfully!!!", error: false })
    );

    setConfirmDelete(-1);
  };
  console.log(deleteCustomerStatus);

  return (
    <Page
      title="Customers"
      primaryAction={{
        content: "Create Customer",
        onAction: () => navigate(`/admin/customer`),
      }}
    >
      {/* {loading && !deleteCustomerStatus ? (
        <div style={{ width: "100%", height: "100vh", textAlign: "center" }}>
          <Loader />
        </div>
      ) : ( */}
      <>
        <LegacyCard>
          <LegacyCard.Section>
            <Filters
              queryValue={queryValue}
              filters={filters}
              onQueryChange={handleSearchChange}
              onQueryClear={() => setQueryValue("")}
            />
          </LegacyCard.Section>
          {rows && (
            <DataTable
              columnContentTypes={["text", "text", "text", "text"]}
              headings={["First Name", "Last Name", "Email", "Phone", "", ""]}
              rows={rows}
              footerContent={`Showing ${
                rows.length + (currentPage - 1) * 10
              } of ${customers.count} results`}
            />
          )}
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
        <br />
        <br />
        <Modal
          open={activeModal}
          onClose={() => setActiveModal(false)}
          title="Delete Customer"
          primaryAction={{
            content: deleteCustomerStatus ? (
              <Spinner accessibilityLabel="loading..." size="small" />
            ) : (
              "Delete"
            ),
            onAction: () => deleteHandler(),
          }}
          secondaryActions={[
            {
              content: "Close",
              onAction: () => setActiveModal(false),
            },
          ]}
        >
          <Modal.Section>
            <AlphaStack>
              <p>Are you sure you want to delete customer?</p>
            </AlphaStack>
          </Modal.Section>
        </Modal>
      </>
      {/* )} */}
    </Page>
  );
};

export default CustomerList;
