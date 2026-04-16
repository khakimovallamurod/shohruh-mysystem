import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Row, Select } from "antd";
import React, { useMemo, useState } from "react";
import ExportTable from "../../../components/common/exportTable/ExportTable";
import MainNumberFormat from "../../../components/common/numberFormat/MainNumberFormat";
import Section from "../../../components/common/section/Section";
import MainDataTable from "../../../components/ui/dataTable/MainDataTable";
import {
  useGetAdminSupplierMgmtPaymentsQuery,
  useGetAdminSupplierMgmtQuery,
} from "../../../features/admin/supplierManagement/adminSupplierManagementApiSlice";
import useExportToExcel from "../../../hooks/exportTable/useExportToExcel";

function AdminSupplierPayments() {
  const [selectedDate, setSelectedDate] = useState({ start: "", end: "" });
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const { data: suppliersData, isLoading: suppliersLoading } = useGetAdminSupplierMgmtQuery();
  const { data, isLoading, isError, refetch } = useGetAdminSupplierMgmtPaymentsQuery(
    { supplierId: selectedSupplier || 0, ...selectedDate },
    { skip: !selectedSupplier }
  );

  const [onExportToExcel] = useExportToExcel();

  const supplierOptions = useMemo(() => {
    if (suppliersData?.success === true && Array.isArray(suppliersData?.data)) {
      return suppliersData.data.map((item) => ({
        id: item?.id,
        name: item?.name || item?.fio || "",
      }));
    }
    return [];
  }, [suppliersData]);

  const tableData = useMemo(() => {
    if (data?.success === true && Array.isArray(data?.data)) {
      return data.data
        .map((item) => ({
          id: item?.id,
          taminotchi: item?.taminotchi || "",
          taminotchi_id: item?.taminotchi_id,
          naqdsum: item?.naqdsum || 0,
          naqdusd: item?.naqdusd || 0,
          bank: item?.bank || 0,
          karta: item?.karta || 0,
          sana: item?.vaqt || "",
          izoh: item?.izoh || "",
        }))
        .filter((item) => !selectedSupplier || Number(item?.taminotchi_id) === Number(selectedSupplier));
    }
    return [];
  }, [data, selectedSupplier]);

  const columns = [
    { title: "ID", dataIndex: "id", width: 70, sortType: "number" },
    { title: "Ta'minotchi", dataIndex: "taminotchi", width: 180, sortType: "string" },
    {
      title: "Naqd so'm",
      dataIndex: "naqdsum",
      width: 140,
      sortType: "number",
      render: (v) => <MainNumberFormat value={v} />,
    },
    {
      title: "Naqd USD",
      dataIndex: "naqdusd",
      width: 130,
      sortType: "number",
      render: (v) => <MainNumberFormat value={v} />,
    },
    {
      title: "Bank",
      dataIndex: "bank",
      width: 130,
      sortType: "number",
      render: (v) => <MainNumberFormat value={v} />,
    },
    {
      title: "Karta",
      dataIndex: "karta",
      width: 130,
      sortType: "number",
      render: (v) => <MainNumberFormat value={v} />,
    },
    { title: "Sana", dataIndex: "sana", width: 120, sortType: "string" },
    { title: "Izoh", dataIndex: "izoh", width: 200 },
  ];

  const handleExportExcel = () => {
    onExportToExcel({ columns, data: tableData });
  };

  return (
    <Section>
      <Row gutter={[12, 12]} style={{ marginBottom: "1rem" }}>
        <Col xs={24} sm={12} lg={8}>
          <Select
            style={{ width: "100%" }}
            placeholder="Ta'minotchini tanlang"
            allowClear
            showSearch
            loading={suppliersLoading}
            onChange={(val) => setSelectedSupplier(val)}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {supplierOptions.map((s) => (
              <Select.Option value={s.id} key={s.id}>
                {s.name}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} sm={12} lg={4}>
          <Button
            type="primary"
            icon={<UploadOutlined />}
            onClick={handleExportExcel}
            block
          >
            Excel
          </Button>
        </Col>
      </Row>
      <MainDataTable
        columns={columns}
        isLoading={isLoading}
        isError={isError}
        data={tableData}
        showDatePicker={true}
        setDateValue={setSelectedDate}
        customHeader={
          <ExportTable columns={columns} fileName="Taminotchi_tolovlar" data={[...tableData]} />
        }
        refetch={refetch}
      />
    </Section>
  );
}

export default AdminSupplierPayments;
